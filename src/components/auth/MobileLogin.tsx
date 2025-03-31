import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { HelpCircle, Mail, Lock, ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { APP_NAME } from '../../config/app';
import config from '../../../config.json';

export default function MobileLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const productSlug = searchParams.get('product');

  // Load remembered email on mount
  useEffect(() => {
    const rememberedEmail = localStorage.getItem('remembered_email');
    if (rememberedEmail) {
      setEmail(rememberedEmail);
      setRememberMe(true);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password, rememberMe, productSlug || undefined);
      navigate('/dashboard');
    } catch (err) {
      setError((err as Error).message || 'Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen bg-dark-900 flex items-center justify-center py-12 px-4 sm:px-6">
      <div className="w-full max-w-md space-y-8 bg-dark-800 rounded-xl shadow-xl p-8">
        <Link
          to="/"
          className="inline-flex items-center text-dark-300 hover:text-dark-100 transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to home
        </Link>

        <div>
          <div className="flex items-center gap-2">
            <HelpCircle className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold text-dark-100">{APP_NAME}</h1>
          </div>
          <h2 className="mt-6 text-2xl text-dark-100">
            Welcome back
          </h2>
          <p className="mt-2 text-sm text-dark-300">
            New to our platform?{' '}
            <Link to="/signup" className="text-dark-200 hover:text-dark-100 font-medium transition-colors duration-150">
              Create an account
            </Link>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-dark-200"
            >
              Email address
            </label>
            <div className="mt-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-dark-400" />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none block w-full pl-10 px-3 py-3 border border-dark-600 rounded-lg shadow-sm placeholder-dark-400 bg-dark-700 text-dark-100 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                placeholder="Enter your email"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="text-sm font-medium text-dark-200"
              >
                Password
              </label>
              <div className="text-sm">
                <a href="#" className="font-medium text-dark-200 hover:text-dark-100 transition-colors duration-150">
                  Forgot your password?
                </a>
              </div>
            </div>
            <div className="mt-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-dark-400" />
              </div>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-dark-400 hover:text-dark-300 transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none block w-full pl-10 px-3 py-3 border border-dark-600 rounded-lg shadow-sm placeholder-dark-400 bg-dark-700 text-dark-100 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                placeholder="Enter your password"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 text-primary focus:ring-primary border-dark-600 rounded bg-dark-700"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-dark-300">
                Remember me
              </label>
            </div>
          </div>

          {error && (
            <div className="text-error text-sm text-center">{error}</div>
          )}

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors duration-200"
            >
              Sign in
            </button>
          </div>

          <div className="text-sm text-dark-300 text-center">
            By signing in, you agree to our{' '}
            <Link to="/terms" className="text-dark-200 hover:text-dark-100 transition-colors duration-150">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link to="/privacy" className="text-dark-200 hover:text-dark-100 transition-colors duration-150">
              Privacy Policy
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}