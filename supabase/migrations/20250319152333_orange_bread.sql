/*
  # Drop Tables Migration
  
  This migration drops all tables in reverse order of their dependencies
  to avoid foreign key constraint issues.
*/

-- Drop triggers first
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Drop functions
DROP FUNCTION IF EXISTS handle_new_user();

-- Drop tables in reverse dependency order
DROP TABLE IF EXISTS product_access;
DROP TABLE IF EXISTS profiles;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS teams;