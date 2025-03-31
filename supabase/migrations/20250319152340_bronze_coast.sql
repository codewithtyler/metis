/*
  # Security Policies Migration
  
  This migration:
  1. Enables RLS on all tables
  2. Creates security policies
  3. Sets up triggers and functions
*/

-- Enable RLS on all tables
ALTER TABLE teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_access ENABLE ROW LEVEL SECURITY;

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