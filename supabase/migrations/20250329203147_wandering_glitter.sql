/*
  # Update handle_new_user function

  This migration updates the handle_new_user function to:
  1. Properly handle the skipCompany flag
  2. Create a personal team for users without a company
  3. Ensure company information is processed correctly

  Additionally, it recreates the trigger to ensure it uses the latest function.
*/

-- Create or replace function to handle user creation with personal team support
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger AS $$
DECLARE
  personal_team_id uuid;
  company_team_id uuid;
  user_name text;
  user_email text;
  user_domain text;
  company_name text;
  company_domain text;
BEGIN
  -- Extract user info
  user_email := NEW.email;
  user_name := COALESCE(NEW.raw_user_meta_data->>'name', split_part(user_email, '@', 1));
  user_domain := split_part(user_email, '@', 2);
  
  -- Check if we need to create a team based on company info or a personal team
  IF NEW.raw_user_meta_data->>'skipCompany' = 'true' THEN
    -- Create a personal team for the user when skipping company info
    INSERT INTO teams (name, domain)
    VALUES (
      user_name || '''s Team',  -- Create a team named after the user
      user_domain                -- Use their email domain
    )
    RETURNING id INTO personal_team_id;
    
    -- Insert profile with personal team
    INSERT INTO profiles (id, email, name, role, team_id)
    VALUES (
      NEW.id,
      user_email,
      user_name,
      COALESCE(NEW.raw_user_meta_data->>'role', 'customer'),
      personal_team_id
    );
  ELSE
    -- Handle company information if provided
    company_name := NEW.raw_user_meta_data->>'companyName';
    company_domain := COALESCE(NEW.raw_user_meta_data->>'companyDomain', user_domain);
    
    IF company_name IS NOT NULL THEN
      -- Create a company team
      INSERT INTO teams (name, domain)
      VALUES (
        company_name,
        company_domain
      )
      RETURNING id INTO company_team_id;
      
      -- Insert profile with company team
      INSERT INTO profiles (id, email, name, role, team_id)
      VALUES (
        NEW.id,
        user_email,
        user_name,
        COALESCE(NEW.raw_user_meta_data->>'role', 'customer'),
        company_team_id
      );
    ELSE
      -- Fallback to personal team if no company info provided
      INSERT INTO teams (name, domain)
      VALUES (
        user_name || '''s Team',
        user_domain
      )
      RETURNING id INTO personal_team_id;
      
      -- Insert profile with personal team
      INSERT INTO profiles (id, email, name, role, team_id)
      VALUES (
        NEW.id,
        user_email,
        user_name,
        COALESCE(NEW.raw_user_meta_data->>'role', 'customer'),
        personal_team_id
      );
    END IF;
  END IF;
  
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