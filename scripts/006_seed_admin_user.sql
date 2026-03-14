-- This script should be run AFTER the admin user arogya@admin.com is created in Supabase Auth
-- The auth user must be created first with password: arogya@pass
-- Then insert into admin_users with the correct UUID from auth.users

-- To manually create the admin user:
-- 1. Go to Supabase dashboard
-- 2. Go to Authentication > Users
-- 3. Click "Add user"
-- 4. Email: arogya@admin.com
-- 5. Password: arogya@pass
-- 6. Check "Auto confirm user"
-- 7. Copy the generated UUID and replace 'PUT_UUID_HERE' below

-- INSERT INTO admin_users (id, email, role, is_active, permissions) VALUES
--   ('PUT_UUID_HERE', 'arogya@admin.com', 'admin', true, '{"all": true}')
-- ON CONFLICT (id) DO NOTHING;

-- For now, insert with a placeholder UUID that will be updated later
-- The admin_users table will be populated through the setupAdmin action
