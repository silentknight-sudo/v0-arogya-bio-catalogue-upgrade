# Environment Variables Configuration

## Required Environment Variables

Add these to your `.env.local` (local development) or Vercel Environment Variables (production):

### Supabase Configuration (Required)

```env
# Your Supabase project URL
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co

# Your Supabase anonymous key
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Optional: Your app URL (used for OAuth redirects)
NEXT_PUBLIC_APP_URL=http://localhost:3000
# In production: NEXT_PUBLIC_APP_URL=https://yourdomain.com
```

**Where to find these:**
1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Select your project
3. Go to Settings → API
4. Copy "Project URL" and "anon public" key

---

## Optional: Email Service Configuration

Add these ONLY if you want to send real emails for Email OTP (production):

### SendGrid
```env
SENDGRID_API_KEY=SG.your_sendgrid_api_key_here
SENDGRID_FROM_EMAIL=noreply@yourdomain.com
```

To get SendGrid API key:
1. Create account at [SendGrid](https://sendgrid.com)
2. Go to Settings → API Keys
3. Create a new API key
4. Copy the key

Then update `/app/actions/auth.ts` in the `generateEmailOTP` function to use SendGrid.

### Mailgun
```env
MAILGUN_API_KEY=key-your_mailgun_key_here
MAILGUN_DOMAIN=mg.yourdomain.com
MAILGUN_FROM_EMAIL=noreply@yourdomain.com
```

To get Mailgun credentials:
1. Create account at [Mailgun](https://mailgun.com)
2. Go to Settings → API Security
3. Copy your API key and domain

Then update `/app/actions/auth.ts` in the `generateEmailOTP` function to use Mailgun.

---

## Optional: SMS Service Configuration

Add these ONLY if you want to send real SMS for Phone OTP (production):

### Twilio
```env
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_twilio_auth_token_here
TWILIO_PHONE_NUMBER=+1234567890
```

To get Twilio credentials:
1. Create account at [Twilio](https://www.twilio.com)
2. Go to Account → Account SID and Auth Token
3. Buy a phone number
4. Copy all credentials

Then update `/app/actions/phone-otp.ts` in the `generatePhoneOTP` function to use Twilio.

### AWS SNS
```env
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=AKIAIOSFODNN7EXAMPLE
AWS_SECRET_ACCESS_KEY=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
AWS_SNS_TOPIC_ARN=arn:aws:sns:us-east-1:123456789012:MySMSTopic
```

To get AWS credentials:
1. Create AWS account
2. Go to IAM → Users
3. Create a new user with SNS permissions
4. Generate access keys
5. Create SNS topic for SMS

Then update `/app/actions/phone-otp.ts` in the `generatePhoneOTP` function to use AWS SNS.

### Firebase (Cloud Messaging)
```env
FIREBASE_API_KEY=AIzaSyDxxxxxxxxxxxxxxxxxxxxxxxx
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_MESSAGING_SENDER_ID=123456789012
```

---

## Optional: OAuth Provider Credentials

These are configured in Supabase Dashboard, but here are the environment variables if needed:

### Google OAuth (Configure in Supabase, not as env var)
In Supabase Dashboard:
- Authentication → Providers → Google
- Add your Google OAuth credentials from Google Cloud Console

### Facebook OAuth (Configure in Supabase, not as env var)
In Supabase Dashboard:
- Authentication → Providers → Facebook
- Add your Facebook OAuth credentials from Facebook Developers

---

## Local Development Setup

### Step 1: Create `.env.local` file

In your project root directory, create `.env.local`:

```env
# Supabase (REQUIRED)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Optional: Email service for production testing
# SENDGRID_API_KEY=SG.xxxxx

# Optional: SMS service for production testing  
# TWILIO_ACCOUNT_SID=ACxxxxx
# TWILIO_AUTH_TOKEN=xxxxx
# TWILIO_PHONE_NUMBER=+1234567890
```

### Step 2: Run your app

```bash
npm run dev
```

Your app will use the environment variables from `.env.local`.

---

## Production Deployment (Vercel)

### Step 1: Add environment variables to Vercel

1. Go to [Vercel Dashboard](https://vercel.com)
2. Select your project
3. Go to Settings → Environment Variables
4. Add each variable:

```
NEXT_PUBLIC_SUPABASE_URL = https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
NEXT_PUBLIC_APP_URL = https://yourdomain.com

# Optional for production
SENDGRID_API_KEY = SG.xxxxx
TWILIO_ACCOUNT_SID = ACxxxxx
TWILIO_AUTH_TOKEN = xxxxx
TWILIO_PHONE_NUMBER = +1234567890
```

### Step 2: Configure Supabase

1. Go to Supabase Dashboard
2. Settings → Authentication
3. Add OAuth redirect URL:
   - `https://yourdomain.com/auth/callback`

### Step 3: Update OAuth providers

**For Google:**
- Google Cloud Console → Authorized redirect URIs:
  - Add `https://yourdomain.com/auth/callback`
  - Add `https://your-project.supabase.co/auth/v1/callback?provider=google`

**For Facebook:**
- Facebook Developers → Valid Redirect URIs:
  - Add `https://yourdomain.com/auth/callback`
  - Add `https://your-project.supabase.co/auth/v1/callback?provider=facebook`

### Step 4: Deploy

```bash
git push origin main
# Vercel auto-deploys with environment variables
```

---

## Environment Variable Categories

### 🔐 Security Level

| Variable | Public | Sensitive |
|----------|--------|-----------|
| NEXT_PUBLIC_SUPABASE_URL | ✅ Yes | ❌ No |
| NEXT_PUBLIC_SUPABASE_ANON_KEY | ✅ Yes | ❌ No |
| NEXT_PUBLIC_APP_URL | ✅ Yes | ❌ No |
| SENDGRID_API_KEY | ❌ No | ✅ Yes |
| TWILIO_ACCOUNT_SID | ❌ No | ✅ Yes |
| TWILIO_AUTH_TOKEN | ❌ No | ✅ Yes |
| AWS_ACCESS_KEY_ID | ❌ No | ✅ Yes |
| AWS_SECRET_ACCESS_KEY | ❌ No | ✅ Yes |

**Note**: Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser. Never put secrets there!

---

## Checking Environment Variables

### In your code:

```typescript
// Accessing in server-side code
console.log(process.env.NEXT_PUBLIC_SUPABASE_URL) // ✅ Works
console.log(process.env.SENDGRID_API_KEY) // ✅ Works

// Accessing in client-side code
console.log(process.env.NEXT_PUBLIC_SUPABASE_URL) // ✅ Works
console.log(process.env.SENDGRID_API_KEY) // ❌ Undefined (not available)
```

### Test variables are loaded:

```typescript
// In /app/actions/auth.ts
console.log("[v0] Supabase URL:", process.env.NEXT_PUBLIC_SUPABASE_URL)
console.log("[v0] SendGrid key exists:", !!process.env.SENDGRID_API_KEY)

// If undefined, variable is not set properly
```

---

## Troubleshooting

### "Supabase credentials are not set" error

**Solution**: Check your `.env.local` or Vercel Environment Variables
```bash
# Verify variables are set
echo $NEXT_PUBLIC_SUPABASE_URL
echo $NEXT_PUBLIC_SUPABASE_ANON_KEY
```

If empty, add them and restart dev server:
```bash
npm run dev
```

### OAuth not redirecting correctly

**Check**:
1. `NEXT_PUBLIC_APP_URL` is set to your domain
2. Redirect URI in OAuth provider matches exactly
3. Redirect URI in Supabase Dashboard matches exactly

Example formats:
- Local: `http://localhost:3000/auth/callback`
- Production: `https://yourdomain.com/auth/callback`

### Email OTP not sending

**Check**:
1. `SENDGRID_API_KEY` is set (if using SendGrid)
2. Function in `/app/actions/auth.ts` is configured for SendGrid
3. SendGrid API key has email sending permissions

### SMS OTP not sending

**Check**:
1. `TWILIO_ACCOUNT_SID` is set
2. `TWILIO_AUTH_TOKEN` is set
3. `TWILIO_PHONE_NUMBER` is set and has SMS capability
4. Function in `/app/actions/phone-otp.ts` is configured for Twilio
5. Phone number format is correct (e.g., +1234567890)

---

## Quick Reference

### Minimal Setup (Email & Password only)
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Development Setup (All features with dev mode)
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Production Setup (Full setup)
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
NEXT_PUBLIC_APP_URL=https://yourdomain.com
SENDGRID_API_KEY=SG.xxxxx
TWILIO_ACCOUNT_SID=ACxxxxx
TWILIO_AUTH_TOKEN=xxxxx
TWILIO_PHONE_NUMBER=+1234567890
```

---

Need help? Check:
- `/AUTHENTICATION_CHECKLIST.md` - Quick setup
- `/docs/AUTHENTICATION_SETUP.md` - Detailed guide
- Supabase Docs: https://supabase.com/docs
