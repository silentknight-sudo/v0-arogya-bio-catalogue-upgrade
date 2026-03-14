# Multi-Provider Authentication Setup Guide

This guide explains how to configure Google, Facebook, and OTP authentication for your Arogyabio application.

## Available Authentication Methods

Your application now supports the following authentication methods:

1. **Email & Password** - Traditional email signup with password
2. **Phone OTP** - One-Time Password via phone number
3. **Email OTP** - One-Time Password via email
4. **Google OAuth** - Sign in/up with Google account
5. **Facebook OAuth** - Sign in/up with Facebook account

## Prerequisites

- Supabase project set up and configured
- Environment variables: `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Database Tables Required

The application uses these Supabase tables:

```sql
-- User profiles
create table profiles (
  id uuid primary key references auth.users,
  first_name varchar,
  last_name varchar,
  phone varchar,
  created_at timestamp default now()
);

-- Phone OTP storage
create table phone_otp (
  id uuid primary key default uuid_generate_v4(),
  phone varchar not null,
  otp_code varchar(6) not null,
  is_verified boolean default false,
  expires_at timestamp default (now() + interval '10 minutes'),
  created_at timestamp default now()
);

-- Email OTP storage
create table email_otp (
  id uuid primary key default uuid_generate_v4(),
  email varchar not null,
  otp_code varchar(6) not null,
  is_verified boolean default false,
  expires_at timestamp default (now() + interval '10 minutes'),
  created_at timestamp default now()
);
```

## Configuration Steps

### 1. Google OAuth Configuration

**Step 1: Create Google OAuth Credentials**
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API
4. Go to Credentials → Create OAuth 2.0 Client ID
5. Choose "Web application"
6. Add authorized redirect URIs:
   - `https://YOUR_SUPABASE_URL/auth/v1/callback?provider=google`
   - `http://localhost:3000/auth/callback` (for local development)
7. Copy the Client ID and Client Secret

**Step 2: Configure in Supabase**
1. Go to Supabase Dashboard → Authentication → Providers
2. Click "Google"
3. Enable the provider
4. Paste your Google Client ID and Client Secret
5. Save

**Step 3: Update Environment Variables (if needed)**
```env
NEXT_PUBLIC_APP_URL=https://yourdomain.com
```

### 2. Facebook OAuth Configuration

**Step 1: Create Facebook App**
1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Create a new app
3. Select "Consumer" as app type
4. Go to Settings → Basic and copy App ID and App Secret
5. Go to Settings → Basic → Add Platform → Website
6. Add your site URL
7. Go to Facebook Login → Settings
8. Add Valid Redirect URIs:
   - `https://YOUR_SUPABASE_URL/auth/v1/callback?provider=facebook`
   - `http://localhost:3000/auth/callback` (for local development)

**Step 2: Configure in Supabase**
1. Go to Supabase Dashboard → Authentication → Providers
2. Click "Facebook"
3. Enable the provider
4. Paste your Facebook App ID and App Secret
5. Save

### 3. Email OTP Configuration

The Email OTP feature is ready to use. For production:

1. Set up an email service (SendGrid, Mailgun, etc.)
2. Update `/app/actions/auth.ts` `generateEmailOTP` function to send actual emails
3. Replace console.log with your email service API call

Example with SendGrid:
```typescript
// In generateEmailOTP function
import sgMail from '@sendgrid/mail'
sgMail.setApiKey(process.env.SENDGRID_API_KEY!)

await sgMail.send({
  to: email,
  from: 'noreply@arogyabio.com',
  subject: 'Your OTP Code',
  text: `Your OTP is: ${otp}`,
})
```

### 4. Phone OTP Configuration

The Phone OTP feature is ready to use. For production:

1. Set up an SMS service (Twilio, AWS SNS, etc.)
2. Update `/app/actions/phone-otp.ts` `generatePhoneOTP` function to send actual SMS
3. Replace console.log with your SMS service API call

Example with Twilio:
```typescript
// In generatePhoneOTP function
import twilio from 'twilio'

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)

await client.messages.create({
  body: `Your OTP is: ${otp}`,
  from: process.env.TWILIO_PHONE_NUMBER,
  to: phone,
})
```

## Frontend Pages

### Login Page
- **Route**: `/auth/login`
- **Features**: Email/Password, Phone OTP, Email OTP, Google, Facebook
- **Methods**:
  - Email login with password
  - Phone OTP verification
  - Email OTP verification
  - Google OAuth redirect
  - Facebook OAuth redirect

### Signup Page
- **Route**: `/auth/sign-up`
- **Features**: Email signup with password, Google signup, Facebook signup
- **Methods**:
  - Email/password registration
  - Google OAuth signup
  - Facebook OAuth signup

### Email Verification Page
- **Route**: `/auth/email-verify`
- **Features**: Email OTP verification and profile completion

### Callback Page
- **Route**: `/auth/callback`
- **Features**: Handles OAuth provider redirects

## Testing

### Local Development
1. All OTP codes are logged to browser console (check DevTools)
2. Copy the OTP from console and paste in the verification field

### Email/Phone in Production
1. Update the respective functions in `/app/actions/auth.ts` and `/app/actions/phone-otp.ts`
2. Integrate your email/SMS service provider
3. Test with real email/phone numbers

## Authentication Flow Diagrams

### Email/Password Flow
1. User enters email and password
2. Supabase authenticates and creates session
3. User profile created in `profiles` table
4. Redirect to home page

### Email OTP Flow
1. User enters email
2. Generate 6-digit OTP and store in `email_otp` table
3. User receives OTP (via email in production)
4. Verify OTP against stored code
5. Create user account with profile
6. Redirect to home page

### Google/Facebook OAuth Flow
1. User clicks "Sign in with Google/Facebook"
2. Redirect to OAuth provider
3. User authenticates with provider
4. Provider redirects back to `/auth/callback`
5. Callback page creates profile if needed
6. Redirect to home page

## Environment Variables

Add these to your `.env.local` or Vercel environment:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_APP_URL=http://localhost:3000  # or your production domain

# Optional - for email/SMS services
SENDGRID_API_KEY=your_sendgrid_key
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_token
TWILIO_PHONE_NUMBER=+1234567890
```

## Troubleshooting

### Google OAuth Not Working
- Check that redirect URIs match exactly in both Google Console and Supabase
- Ensure Google+ API is enabled in Google Cloud Console
- Verify Client ID and Secret are correctly copied

### Facebook OAuth Not Working
- Verify app is not in development mode (or whitelist your domain)
- Check Facebook app settings for correct redirect URIs
- Ensure email is requested in Facebook Login scopes

### OTP Not Received
- In development, check browser console for OTP
- In production, verify email/SMS service is configured
- Check that email/phone fields match exactly
- Verify OTP hasn't expired (10 minutes by default)

## Security Best Practices

1. Never expose your API keys or secrets
2. Always use HTTPS in production
3. Set strong password requirements
4. Implement rate limiting on OTP generation
5. Use Row Level Security (RLS) on database tables
6. Keep session timeouts reasonable
7. Validate all user inputs on both client and server

## Support

For issues or questions:
- Check Supabase documentation: https://supabase.com/docs/guides/auth
- Review error logs in browser console
- Check Supabase project logs in Dashboard
