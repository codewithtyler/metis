import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, ProductAccess } from '../types';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase'; 

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string, rememberMe?: boolean, productSlug?: string) => Promise<void>;
  signup: (email: string, password: string, name: string, role?: string, metadata?: any) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Constants for token management
const REFRESH_INTERVAL = 12 * 60 * 60 * 1000; // 12 hours
const TOKEN_EXPIRY = 21 * 24 * 60 * 60 * 1000; // 21 days

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const shouldRefreshSession = () => {
    const lastRefresh = localStorage.getItem('supabase.auth.lastRefresh');
    if (!lastRefresh) return true;
    const lastRefreshTime = parseInt(lastRefresh, 10);
    const now = Date.now();

    // Check if the token is about to expire
    const tokenExpiry = localStorage.getItem('supabase.auth.expiry');
    if (!tokenExpiry) return true;
    
    const expiryTime = parseInt(tokenExpiry, 10);
    
    // Force refresh if token is expired or about to expire
    if (expiryTime - now < REFRESH_INTERVAL) return true;
    
    // Check if the last refresh was more than REFRESH_INTERVAL ago
    if (now - lastRefreshTime > REFRESH_INTERVAL) return true;

    return false;
  };

  useEffect(() => {
    const initializeAuth = async () => {
      // Check for existing session
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session && !shouldRefreshSession()) {
        await handleSession(session);
      } else {
        // Try to refresh the session
        const { data: { session: refreshedSession } } = await supabase.auth.refreshSession();
        if (refreshedSession) {
          await handleSession(refreshedSession);
        } else {
          // Clear stored auth data if refresh fails
          handleSession(null);
        }
      }
      
      setLoading(false);
    };

    initializeAuth();

    // Set up periodic token refresh
    const refreshInterval = setInterval(async () => {
      const { data: { session } } = await supabase.auth.refreshSession();
      if (session) {
        await handleSession(session);
      }
    }, REFRESH_INTERVAL);

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      await handleSession(session);
    });

    return () => {
      clearInterval(refreshInterval);
      subscription.unsubscribe();
    };
  }, []);

  const fetchUserProfile = async (userId: string) => {
    try {
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (profileError) {
        console.error('Error fetching user profile:', profileError);
        return null;
      }

      // Get user's product access
      const { data: productAccess, error: accessError } = await supabase
        .from('product_access')
        .select('product_id')
        .eq('user_id', userId);

      if (accessError) {
        console.error('Error fetching product access:', accessError);
      }

      const productIds = productAccess ? productAccess.map(item => item.product_id) : [];

      return {
        ...profileData,
        productIds
      };
    } catch (error) {
      console.error('Error in fetchUserProfile:', error);
      return null;
    }
  };

  const handleSession = async (session: any) => {
    if (session?.user) {
      try {
        const now = Date.now();
        const expiry = now + TOKEN_EXPIRY;

        // Fetch user's profile from profiles table
        const profileData = await fetchUserProfile(session.user.id);

        if (profileData) {
          const userData = {
            id: session.user.id,
            email: session.user.email!,
            name: profileData.name || session.user.user_metadata?.name || '',
            role: profileData.role || 'customer',
            teamId: profileData.team_id,
            productIds: profileData.productIds || [],
          };
          
          setUser(userData);
          
          // Store session in localStorage
          localStorage.setItem('supabase.auth.token', session.access_token);
          localStorage.setItem('supabase.auth.user', JSON.stringify(userData));
          localStorage.setItem('supabase.auth.lastRefresh', now.toString());
          localStorage.setItem('supabase.auth.expiry', expiry.toString());
        } else {
          console.error('Failed to fetch user profile');
          setUser(null);
          localStorage.removeItem('supabase.auth.token');
          localStorage.removeItem('supabase.auth.user');
          localStorage.removeItem('supabase.auth.lastRefresh');
          localStorage.removeItem('supabase.auth.expiry');
        }
      } catch (error) {
        console.error('Error handling session:', error);
        setUser(null);
      }
    } else {
      setUser(null);
      localStorage.removeItem('supabase.auth.token');
      localStorage.removeItem('supabase.auth.user');
      localStorage.removeItem('supabase.auth.lastRefresh');
      localStorage.removeItem('supabase.auth.expiry');
    }
  };

  const login = async (email: string, password: string, rememberMe?: boolean, productSlug?: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      if (productSlug) {
        // Fetch product details and validate access
        const { data: product } = await supabase
          .from('products')
          .select('*')
          .eq('slug', productSlug)
          .single();

        if (!product) {
          throw new Error('Invalid product');
        }

        // Check domain restriction for private products
        if (product.access_type === 'private') {
          const userDomain = email.split('@')[1];
          if (!product.allowed_domains?.includes(userDomain)) {
            throw new Error('Access denied: Your email domain is not authorized for this product');
          }
        }

        // Grant product access if needed
        const { data: existingAccess } = await supabase
          .from('product_access')
          .select('*')
          .eq('product_id', product.id)
          .eq('user_id', data.session?.user.id)
          .single();

        if (!existingAccess) {
          await supabase.from('product_access').insert({
            product_id: product.id,
            user_id: data.session?.user.id,
            access_type: 'user',
          });
        }
      }

      // Store session data
      if (data.session) {
        await handleSession(data.session);
        if (rememberMe) {
          localStorage.setItem('remembered_email', email);
        }
      }
    } catch (error) {
      throw error;
    }
  };

  const signup = async (email: string, password: string, name: string, role: string = 'customer', metadata: any = {}) => {
    try {
      // Ensure name and role are in metadata
      const userMetadata = {
        name,
        role,
        ...metadata
      };

      // Sign up the user
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: userMetadata,
        },
      });

      if (error) throw error;

      // Note: The profile creation is handled by the Supabase trigger function
      // defined in the migrations, which will create a profile with the role
      // Once created, the profile will be fetched when the session is handled

      return data;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    supabase.auth.signOut();
    handleSession(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}