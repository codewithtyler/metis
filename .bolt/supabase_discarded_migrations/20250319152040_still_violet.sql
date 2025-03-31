/*
  # Authentication and User Management Schema

  1. New Tables
    - `teams`
      - Stores team information
      - Includes team name and domain
    - `products`
      - Stores product information
      - Required before product_access table
    - `profiles`
      - Extends auth.users with additional user information
      - Stores user role, name, and team association
    - `product_access`
      - Manages user access to products
      - Links users to products with access type

  2. Security
    - Enable RLS on all tables
    - Add policies for secure access
*/

-- Create teams table
CREATE TABLE IF NOT EXISTS teams (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  domain text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE teams ENABLE ROW LEVEL SECURITY;

-- Create products table first (since it's referenced by product_access)
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  team_id uuid REFERENCES teams(id),
  access_type text NOT NULL DEFAULT 'public',
  default_template_id text,
  allowed_domains text[],
  slug text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Create profiles table that extends auth.users
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name text,
  email text,
  role text NOT NULL DEFAULT 'customer',
  team_id uuid REFERENCES teams(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Create product access table (now products table exists)
CREATE TABLE IF NOT EXISTS product_access (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id uuid REFERENCES products(id) ON DELETE CASCADE,
  access_type text NOT NULL DEFAULT 'user',
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, product_id)
);

ALTER TABLE product_access ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Teams policies
CREATE POLICY "Users can view their own team"
  ON teams
  FOR SELECT
  TO authenticated
  USING (id IN (
    SELECT team_id FROM profiles WHERE id = auth.uid()
  ));

-- Products policies
CREATE POLICY "Users can view public products"
  ON products
  FOR SELECT
  TO authenticated
  USING (access_type = 'public' OR team_id IN (
    SELECT team_id FROM profiles WHERE id = auth.uid()
  ));

-- Profiles policies
CREATE POLICY "Users can view their own profile"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (id = auth.uid());

CREATE POLICY "Users can update their own profile"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (id = auth.uid());

-- Product access policies
CREATE POLICY "Users can view their own product access"
  ON product_access
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

-- Create function to handle user creation
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO profiles (id, email, name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'role', 'customer')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user creation
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION handle_new_user();