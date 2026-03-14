-- Fix RLS policies to allow service role to create profiles during signup
-- Remove the old policy that was too restrictive
DROP POLICY IF EXISTS "profiles_insert_own" ON public.profiles;

-- Create policies that allow both user and service role to insert
CREATE POLICY "profiles_insert_own" ON public.profiles FOR INSERT WITH CHECK (
  auth.uid() = id OR auth.jwt() -> 'role' = '"service_role"'
);

CREATE POLICY "profiles_insert_service" ON public.profiles FOR INSERT 
WITH CHECK (auth.jwt() -> 'role' = '"service_role"');
