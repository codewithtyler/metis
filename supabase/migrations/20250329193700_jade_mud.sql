/*
  # Personal Team Support Migration
  
  This migration ensures every user has a team by:
  1. Making sure RLS is enabled on all tables
  2. Creating security policies (if they don't exist)
  3. Adding personal team creation to the user signup flow
*/

-- Enable RLS on all tables if not already enabled
DO $$ 
BEGIN
    -- Enable RLS on teams if not already enabled
    IF NOT EXISTS (
        SELECT 1 FROM pg_tables 
        WHERE schemaname = 'public' AND tablename = 'teams' AND rowsecurity = true
    ) THEN
        ALTER TABLE teams ENABLE ROW LEVEL SECURITY;
    END IF;

    -- Enable RLS on products if not already enabled
    IF NOT EXISTS (
        SELECT 1 FROM pg_tables 
        WHERE schemaname = 'public' AND tablename = 'products' AND rowsecurity = true
    ) THEN
        ALTER TABLE products ENABLE ROW LEVEL SECURITY;
    END IF;

    -- Enable RLS on profiles if not already enabled
    IF NOT EXISTS (
        SELECT 1 FROM pg_tables 
        WHERE schemaname = 'public' AND tablename = 'profiles' AND rowsecurity = true
    ) THEN
        ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
    END IF;

    -- Enable RLS on product_access if not already enabled
    IF NOT EXISTS (
        SELECT 1 FROM pg_tables 
        WHERE schemaname = 'public' AND tablename = 'product_access' AND rowsecurity = true
    ) THEN
        ALTER TABLE product_access ENABLE ROW LEVEL SECURITY;
    END IF;
END $$;

-- Create RLS policies if they don't exist
DO $$ 
BEGIN
    -- Teams policies
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE schemaname = 'public' AND tablename = 'teams' AND policyname = 'Users can view their own team'
    ) THEN
        CREATE POLICY "Users can view their own team"
        ON teams
        FOR SELECT
        TO authenticated
        USING (id IN (
            SELECT team_id FROM profiles WHERE id = auth.uid()
        ));
    END IF;

    -- Products policies
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE schemaname = 'public' AND tablename = 'products' AND policyname = 'Users can view public products'
    ) THEN
        CREATE POLICY "Users can view public products"
        ON products
        FOR SELECT
        TO authenticated
        USING (access_type = 'public' OR team_id IN (
            SELECT team_id FROM profiles WHERE id = auth.uid()
        ));
    END IF;

    -- Profiles policies
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE schemaname = 'public' AND tablename = 'profiles' AND policyname = 'Users can view their own profile'
    ) THEN
        CREATE POLICY "Users can view their own profile"
        ON profiles
        FOR SELECT
        TO authenticated
        USING (id = auth.uid());
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE schemaname = 'public' AND tablename = 'profiles' AND policyname = 'Users can update their own profile'
    ) THEN
        CREATE POLICY "Users can update their own profile"
        ON profiles
        FOR UPDATE
        TO authenticated
        USING (id = auth.uid());
    END IF;

    -- Product access policies
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE schemaname = 'public' AND tablename = 'product_access' AND policyname = 'Users can view their own product access'
    ) THEN
        CREATE POLICY "Users can view their own product access"
        ON product_access
        FOR SELECT
        TO authenticated
        USING (user_id = auth.uid());
    END IF;
END $$;

-- Create or replace function to handle user creation with personal team support
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger AS $$
DECLARE
  personal_team_id uuid;
  user_name text;
  user_email text;
  user_domain text;
BEGIN
  -- Extract user info
  user_email := NEW.email;
  user_name := COALESCE(NEW.raw_user_meta_data->>'name', split_part(user_email, '@', 1));
  user_domain := split_part(user_email, '@', 2);
  
  -- Check if we need to create a personal team
  IF NEW.raw_user_meta_data->>'teamId' IS NULL THEN
    -- Create a personal team for the user
    INSERT INTO teams (name, domain)
    VALUES (
      user_name || '''s Team',  -- Create a team named after the user
      user_domain                -- Use their email domain
    )
    RETURNING id INTO personal_team_id;
  END IF;
  
  -- Insert the profile with appropriate team ID
  INSERT INTO profiles (id, email, name, role, team_id)
  VALUES (
    NEW.id,
    user_email,
    user_name,
    COALESCE(NEW.raw_user_meta_data->>'role', 'customer'),
    COALESCE(NEW.raw_user_meta_data->>'teamId', personal_team_id)
  );
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop the trigger if it exists and recreate it
DO $$ 
BEGIN
    -- Drop the trigger if it exists
    DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
    
    -- Create the trigger
    CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION handle_new_user();
END $$;