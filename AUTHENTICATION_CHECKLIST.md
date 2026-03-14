# Authentication Quick Start Checklist

## Your Multi-Provider Authentication System is Ready! ✅

All code has been implemented. Follow this checklist to enable each authentication method.

---

## 1. ✅ Email & Password Authentication
**Status**: READY - No configuration needed
- **Login Page**: `/auth/login` → Email tab
- **Signup Page**: `/auth/sign-up` → Email tab
- **Users can**: Register with email/password and login

---

## 2. ⏳ Phone OTP Authentication
**Status**: READY - Optional SMS service setup
- **Login Page**: `/auth/login` → Phone tab
- **Phone Verification**: `/auth/phone-verify`
- **Development Mode**: OTP shows in browser console
- **Production Setup**: 
  - [ ] Add Twilio, AWS SNS, or similar SMS service
  - [ ] Update `/app/actions/phone-otp.ts` line 11-15 with your SMS API
  - [ ] Set environment variables for SMS service

---

## 3. ⏳ Email OTP Authentication
**Status**: READY - Optional email service setup
- **Login Page**: `/auth/login` → Email tab → "Use Email OTP instead"
- **Email Verification**: `/auth/email-verify`
- **Development Mode**: OTP shows in browser console
- **Production Setup**:
  - [ ] Add SendGrid, Mailgun, or similar email service
  - [ ] Update `/app/actions/auth.ts` line 204-215 with your email API
  - [ ] Set environment variables for email service

---

## 4. 🔴 Google OAuth - SETUP REQUIRED
**Status**: Ready to configure

### Quick Setup (5 minutes):
1. [ ] Go to [Google Cloud Console](https://console.cloud.google.com/)
2. [ ] Create new project (or use existing)
3. [ ] Enable "Google+ API"
4. [ ] Go to Credentials → Create OAuth 2.0 Client ID → Web application
5. [ ] Add Authorized Redirect URIs:
   - `https://your-supabase-url.supabase.co/auth/v1/callback?provider=google`
   - `http://localhost:3000/auth/callback` (local development)
6. [ ] Copy Client ID and Client Secret
7. [ ] Go to [Supabase Dashboard](https://app.supabase.com)
8. [ ] Authentication → Providers → Google
9. [ ] Enable and paste Client ID + Client Secret
10. [ ] Save

### Test It:
- [ ] Go to `/auth/login` → Social tab → "Sign in with Google"
- [ ] You should be redirected to Google login
- [ ] After login, should redirect to home page

---

## 5. 🔴 Facebook OAuth - SETUP REQUIRED
**Status**: Ready to configure

### Quick Setup (5 minutes):
1. [ ] Go to [Facebook Developers](https://developers.facebook.com/)
2. [ ] Create new app (type: Consumer)
3. [ ] Go to Settings → Basic
4. [ ] Copy App ID and App Secret
5. [ ] Go to Settings → Basic → Add Platform → Website
6. [ ] Add your domain
7. [ ] Go to Products → Facebook Login → Settings
8. [ ] Add Valid Redirect URIs:
   - `https://your-supabase-url.supabase.co/auth/v1/callback?provider=facebook`
   - `http://localhost:3000/auth/callback` (local development)
9. [ ] Go to [Supabase Dashboard](https://app.supabase.com)
10. [ ] Authentication → Providers → Facebook
11. [ ] Enable and paste App ID + App Secret
12. [ ] Save

### Test It:
- [ ] Go to `/auth/login` → Social tab → "Sign in with Facebook"
- [ ] You should be redirected to Facebook login
- [ ] After login, should redirect to home page

---

## Database Tables Check

All required tables should be created in Supabase:

```sql
-- Run these in Supabase SQL Editor if tables don't exist

-- Profiles table
create table if not exists profiles (
  id uuid primary key references auth.users(id),
  first_name varchar,
  last_name varchar,
  phone varchar,
  created_at timestamp default now()
);

-- Email OTP table
create table if not exists email_otp (
  id uuid primary key default uuid_generate_v4(),
  email varchar not null,
  otp_code varchar(6) not null,
  is_verified boolean default false,
  expires_at timestamp default (now() + interval '10 minutes'),
  created_at timestamp default now()
);

-- Phone OTP table
create table if not exists phone_otp (
  id uuid primary key default uuid_generate_v4(),
  phone varchar not null,
  otp_code varchar(6) not null,
  is_verified boolean default false,
  expires_at timestamp default (now() + interval '10 minutes'),
  created_at timestamp default now()
);
```

---

## Environment Variables

Add to `.env.local` or Vercel Environment Variables:

```env
# Required
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Optional but recommended
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## Authentication Pages Overview

| Page | Route | Purpose |
|------|-------|---------|
| **Login** | `/auth/login` | Email/Password, Phone OTP, Email OTP, Google, Facebook |
| **Signup** | `/auth/sign-up` | Email registration, Google signup, Facebook signup |
| **Email Verify** | `/auth/email-verify` | Email OTP verification and profile creation |
| **Phone Verify** | `/auth/phone-verify` | Phone OTP verification and profile creation |
| **OAuth Callback** | `/auth/callback` | Handles OAuth provider redirects |

---

## Development Testing Checklist

### Test Email & Password Auth:
- [ ] Go to `/auth/sign-up`
- [ ] Fill in form and submit
- [ ] Verify can login at `/auth/login`
- [ ] Verify redirected to home page
- [ ] Verify user profile created in Supabase

### Test Phone OTP:
- [ ] Go to `/auth/login` → Phone tab
- [ ] Enter phone number
- [ ] Check browser console for OTP
- [ ] Enter OTP and complete profile
- [ ] Verify redirected to home page

### Test Email OTP:
- [ ] Go to `/auth/login` → Email tab → "Use Email OTP instead"
- [ ] Enter email
- [ ] Check browser console for OTP
- [ ] Enter OTP and complete profile
- [ ] Verify redirected to home page

### Test Google OAuth:
- [ ] Configure Google OAuth (see section 4)
- [ ] Go to `/auth/login` → Social tab
- [ ] Click "Sign in with Google"
- [ ] Login with Google account
- [ ] Verify redirected to home page

### Test Facebook OAuth:
- [ ] Configure Facebook OAuth (see section 5)
- [ ] Go to `/auth/login` → Social tab
- [ ] Click "Sign in with Facebook"
- [ ] Login with Facebook account
- [ ] Verify redirected to home page

---

## Useful Command to Check Setup

Run in Supabase SQL Editor to verify tables exist:

```sql
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('profiles', 'email_otp', 'phone_otp');
```

---

## Troubleshooting

### OAuth Not Working?
- [ ] Check redirect URLs match exactly in provider settings
- [ ] Verify credentials are correctly entered in Supabase
- [ ] Check browser console for error messages
- [ ] Ensure provider is enabled in Supabase Dashboard

### OTP Not Showing?
- [ ] Check browser DevTools Console (F12)
- [ ] OTP should be logged for development
- [ ] Verify email/phone field is correct
- [ ] OTP expires after 10 minutes

### Profile Not Creating?
- [ ] Check `profiles` table exists in Supabase
- [ ] Verify RLS policies allow inserts (if using RLS)
- [ ] Check browser console for error details

---

## Next Steps

1. **Complete the checklist above** ✓
2. **Test each authentication method** ✓
3. **Set up email/SMS services for OTP** (production)
4. **Configure Google OAuth** (section 4)
5. **Configure Facebook OAuth** (section 5)
6. **Deploy to production** with environment variables

---

## Documentation Files

- **Setup Guide**: `/docs/AUTHENTICATION_SETUP.md`
- **API Reference**: `/docs/AUTH_API_REFERENCE.md`

---

## Questions?

Check the documentation files or review the code in:
- `/app/actions/auth.ts` - Main auth functions
- `/app/actions/phone-otp.ts` - Phone OTP functions
- `/app/auth/login/page.tsx` - Login UI
- `/app/auth/sign-up/page.tsx` - Signup UI

Your full multi-provider authentication system is ready to go! 🚀
