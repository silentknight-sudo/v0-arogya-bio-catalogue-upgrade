-- Create CMS settings table for persistent theme and configuration storage
CREATE TABLE IF NOT EXISTS public.cms_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  key VARCHAR(255) UNIQUE NOT NULL,
  value JSONB,
  section VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  -- Constraints
  CONSTRAINT cms_settings_key_check CHECK (key != '')
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_cms_settings_key ON public.cms_settings(key);
CREATE INDEX IF NOT EXISTS idx_cms_settings_section ON public.cms_settings(section);

-- Enable RLS
ALTER TABLE public.cms_settings ENABLE ROW LEVEL SECURITY;

-- Policy for reading CMS settings (public read)
DROP POLICY IF EXISTS cms_settings_read_policy ON public.cms_settings;
CREATE POLICY cms_settings_read_policy ON public.cms_settings
  FOR SELECT
  USING (true);

-- Policy for updating CMS settings (admin only)
DROP POLICY IF EXISTS cms_settings_update_policy ON public.cms_settings;
CREATE POLICY cms_settings_update_policy ON public.cms_settings
  FOR UPDATE
  USING (auth.jwt() ->> 'role' = 'admin');

-- Policy for inserting CMS settings (admin only)
DROP POLICY IF EXISTS cms_settings_insert_policy ON public.cms_settings;
CREATE POLICY cms_settings_insert_policy ON public.cms_settings
  FOR INSERT
  WITH CHECK (auth.jwt() ->> 'role' = 'admin');

-- Policy for deleting CMS settings (admin only)
DROP POLICY IF EXISTS cms_settings_delete_policy ON public.cms_settings;
CREATE POLICY cms_settings_delete_policy ON public.cms_settings
  FOR DELETE
  USING (auth.jwt() ->> 'role' = 'admin');
