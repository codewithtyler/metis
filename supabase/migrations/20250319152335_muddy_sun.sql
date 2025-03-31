/*
  # Create Tables Migration
  
  This migration creates all necessary tables with their constraints
  but without RLS policies.
*/

-- Create teams table
CREATE TABLE IF NOT EXISTS teams (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  domain text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create products table
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

-- Create product access table
CREATE TABLE IF NOT EXISTS product_access (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id uuid REFERENCES products(id) ON DELETE CASCADE,
  access_type text NOT NULL DEFAULT 'user',
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, product_id)
);