-- Create phone_otp table for custom OTP authentication
CREATE TABLE IF NOT EXISTS public.phone_otp (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  phone TEXT NOT NULL,
  otp_code TEXT NOT NULL,
  is_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  expires_at TIMESTAMP DEFAULT NOW() + INTERVAL '10 minutes'
);

-- Add index for faster lookups
CREATE INDEX IF NOT EXISTS phone_otp_phone_idx ON public.phone_otp(phone);
CREATE INDEX IF NOT EXISTS phone_otp_expires_idx ON public.phone_otp(expires_at);

-- Allow anyone to read phone_otp for verification
ALTER TABLE public.phone_otp ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "phone_otp_insert_any" ON public.phone_otp;
DROP POLICY IF EXISTS "phone_otp_select_any" ON public.phone_otp;
DROP POLICY IF EXISTS "phone_otp_update_any" ON public.phone_otp;

CREATE POLICY "phone_otp_insert_any" ON public.phone_otp FOR INSERT WITH CHECK (true);
CREATE POLICY "phone_otp_select_any" ON public.phone_otp FOR SELECT USING (true);
CREATE POLICY "phone_otp_update_any" ON public.phone_otp FOR UPDATE USING (true);
