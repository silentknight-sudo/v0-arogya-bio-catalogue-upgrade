# Authentication Flow Diagrams

## 1. Email & Password Flow

```
┌─────────────────────────────────────────────────────────────────┐
│ Email & Password Authentication Flow                             │
└─────────────────────────────────────────────────────────────────┘

  SIGNUP                                    LOGIN
  ─────                                     ─────
  
  User fills form                           User enters credentials
  ↓                                         ↓
  signUpUser(email, password, ...)          signInUser(email, password)
  ↓                                         ↓
  Supabase creates auth user                Supabase verifies credentials
  ↓                                         ↓
  Create profile record                     Session created
  ↓                                         ↓
  Redirect to /auth/login                   Redirect to home
  ✅ User created                           ✅ User logged in

Route: /auth/sign-up                       Route: /auth/login
Method: signUpUser()                       Method: signInUser()
Table: profiles, auth.users                Table: auth.users
```

---

## 2. Phone OTP Flow

```
┌─────────────────────────────────────────────────────────────────┐
│ Phone OTP Authentication Flow                                    │
└─────────────────────────────────────────────────────────────────┘

  User enters phone number
  ↓
  generatePhoneOTP(phone)
  ↓
  ├─ Generate random 6-digit code
  ├─ Store in phone_otp table
  └─ Send via SMS (or show in console for dev)
  ↓
  User receives OTP
  ↓
  verifyPhoneOTP(phone, otp)
  ↓
  ├─ Check if OTP matches
  ├─ Check if not expired (10 min TTL)
  └─ Mark as verified
  ↓
  Check if user exists
  ├─ YES → createOrSignInPhoneUser() → Sign in existing user
  └─ NO → Show profile form
  ↓
  User completes profile (name, phone, optional email)
  ↓
  createOrSignInPhoneUser(phone, firstName, lastName)
  ↓
  ├─ Create Supabase auth user
  ├─ Create profile record
  └─ Session created
  ↓
  Redirect to home
  ✅ User authenticated

Route: /auth/login (Phone tab) → /auth/phone-verify
Table: phone_otp, profiles, auth.users
Session: 10 minutes (OTP expiry)
```

---

## 3. Email OTP Flow

```
┌─────────────────────────────────────────────────────────────────┐
│ Email OTP Authentication Flow                                    │
└─────────────────────────────────────────────────────────────────┘

  User enters email
  ↓
  generateEmailOTP(email)
  ↓
  ├─ Generate random 6-digit code
  ├─ Store in email_otp table
  └─ Send via email (or show in console for dev)
  ↓
  User receives OTP
  ↓
  verifyEmailOTP(email, otp)
  ↓
  ├─ Check if OTP matches
  ├─ Check if not expired (10 min TTL)
  ├─ Check if user exists (auth.users)
  └─ Mark as verified
  ↓
  Is new user?
  ├─ YES → Show profile form
  └─ NO → Sign in directly (redirect to home)
  ↓
  User completes profile (name, optional phone)
  ↓
  createEmailOTPUser(email, firstName, lastName, phone)
  ↓
  ├─ Create Supabase auth user
  ├─ Create profile record
  └─ Session created
  ↓
  Redirect to home
  ✅ User authenticated

Route: /auth/login (Email tab → Email OTP link) → /auth/email-verify
Table: email_otp, profiles, auth.users
Session: 10 minutes (OTP expiry)
```

---

## 4. Google OAuth Flow

```
┌─────────────────────────────────────────────────────────────────┐
│ Google OAuth Authentication Flow                                 │
└─────────────────────────────────────────────────────────────────┘

  User clicks "Sign in with Google"
  ↓
  signInWithGoogle()
  ↓
  Get OAuth redirect URL from Supabase
  ↓
  window.location.href = redirect_url
  ↓
  └─ Redirect to Google OAuth consent screen
    └─ User logs in with Google (if not already)
    └─ User grants permissions (email, profile)
    └─ Google redirects back to:
       https://your-domain.com/auth/callback?code=...&state=...
  ↓
  /auth/callback page loads
  ↓
  Get session from supabase.auth.getSession()
  ↓
  ├─ Supabase automatically exchanges code for session
  ├─ User data: id, email, first_name, last_name (from Google)
  └─ Session stored in cookies
  ↓
  Check if profile exists
  ├─ YES → Already created
  └─ NO → Auto-create profile from Google data
  ↓
  Redirect to home
  ✅ User logged in

Route: /auth/login (Social tab) → google.com → /auth/callback → /
Table: profiles, auth.users (auto-managed by Supabase)
Provider: Google Cloud OAuth
Redirect URL: https://your-domain.com/auth/callback?provider=google
```

---

## 5. Facebook OAuth Flow

```
┌─────────────────────────────────────────────────────────────────┐
│ Facebook OAuth Authentication Flow                               │
└─────────────────────────────────────────────────────────────────┘

  User clicks "Sign in with Facebook"
  ↓
  signInWithFacebook()
  ↓
  Get OAuth redirect URL from Supabase
  ↓
  window.location.href = redirect_url
  ↓
  └─ Redirect to Facebook OAuth consent screen
    └─ User logs in with Facebook (if not already)
    └─ User grants permissions (email, public_profile)
    └─ Facebook redirects back to:
       https://your-domain.com/auth/callback?code=...&state=...
  ↓
  /auth/callback page loads
  ↓
  Get session from supabase.auth.getSession()
  ↓
  ├─ Supabase automatically exchanges code for session
  ├─ User data: id, email (from Facebook)
  └─ Session stored in cookies
  ↓
  Check if profile exists
  ├─ YES → Already created
  └─ NO → Auto-create profile from Facebook data
  ↓
  Redirect to home
  ✅ User logged in

Route: /auth/login (Social tab) → facebook.com → /auth/callback → /
Table: profiles, auth.users (auto-managed by Supabase)
Provider: Facebook Developer App
Redirect URL: https://your-domain.com/auth/callback?provider=facebook
```

---

## 6. Session Management Flow

```
┌─────────────────────────────────────────────────────────────────┐
│ User Session Lifecycle                                           │
└─────────────────────────────────────────────────────────────────┘

  Authentication Successful
  ↓
  Supabase creates JWT token
  ↓
  Token stored in:
  ├─ HttpOnly cookie (secure, not accessible from JS)
  ├─ Session storage (for CSR components)
  └─ LocalStorage (for persistence across sessions)
  ↓
  Every API call includes token
  ├─ Authorization header: Bearer {token}
  └─ Supabase validates token
  ↓
  While logged in:
  ├─ getSession() returns current user
  ├─ User can access protected routes
  └─ Token auto-refreshes before expiry
  ↓
  User clicks sign out
  ↓
  signOutUser()
  ↓
  ├─ Token invalidated
  ├─ Cookies cleared
  └─ Session destroyed
  ↓
  Redirect to /auth/login
  ✅ User logged out

Token Expiry: ~24 hours (default)
Refresh: Automatic before expiry
Storage: HttpOnly cookie + session cache
```

---

## 7. Error Handling Flow

```
┌─────────────────────────────────────────────────────────────────┐
│ Error Handling & Recovery Flow                                   │
└─────────────────────────────────────────────────────────────────┘

  Authentication attempt
  ↓
  Try:
  ├─ Validate inputs
  ├─ Call Supabase API
  ├─ Handle response
  └─ Create session
  ↓
  Error occurs?
  ├─ YES → Catch error and log details
  │   ├─ Return { error: "User-friendly message" }
  │   ├─ Show error in UI
  │   └─ User can retry
  │
  └─ NO → Success, redirect to home

Common Errors:
├─ Invalid credentials → "Invalid email or password"
├─ User already exists → "Email already registered"
├─ OTP expired → "OTP expired, please request a new one"
├─ OTP invalid → "Invalid OTP, please try again"
├─ Network error → "Failed to connect, please try again"
└─ OAuth error → "Failed to sign in with [Provider]"

Error Flow: Catch → Log → User Message → Retry Option
```

---

## 8. Complete User Journey

```
┌─────────────────────────────────────────────────────────────────┐
│ Complete User Authentication Journey                             │
└─────────────────────────────────────────────────────────────────┘

  FIRST TIME USER
  ═══════════════
  
  Visit website
  ↓
  Click "Sign Up"
  ↓
  Choose method:
  ├─ Email & Password → Fill form → Submit → Verify email
  ├─ Phone OTP → Enter phone → Verify OTP → Complete profile
  ├─ Email OTP → Enter email → Verify OTP → Complete profile
  ├─ Google → Click button → Google login → Auto-create profile
  └─ Facebook → Click button → Facebook login → Auto-create profile
  ↓
  Account created
  ↓
  Redirect to /auth/login
  ↓
  User logged in
  ↓
  Redirect to home
  ✅ REGISTERED & LOGGED IN
  

  RETURNING USER
  ══════════════
  
  Visit website
  ↓
  Check session
  ├─ Has valid token? → Redirect to home
  └─ No token? → Redirect to /auth/login
  ↓
  Click "Log In"
  ↓
  Choose method:
  ├─ Email & Password → Enter credentials → Submit
  ├─ Phone OTP → Enter phone → Verify OTP
  ├─ Email OTP → Enter email → Verify OTP
  ├─ Google → Click button → Google login
  └─ Facebook → Click button → Facebook login
  ↓
  Session created
  ↓
  Redirect to home
  ✅ LOGGED IN
  

  LOGGED IN USER
  ══════════════
  
  Access /
  ↓
  Check session
  ├─ Valid? → Show home page content
  └─ Invalid? → Redirect to /auth/login
  ↓
  User browsing
  ↓
  Decide to logout
  ↓
  Click "Logout"
  ↓
  signOutUser()
  ↓
  Session destroyed
  ↓
  Redirect to /auth/login
  ✅ LOGGED OUT
```

---

## 9. Database Table Relationships

```
┌─────────────────────────────────────────────────────────────────┐
│ Database Schema & Relationships                                  │
└─────────────────────────────────────────────────────────────────┘

  auth.users (Managed by Supabase)
  ├── id (UUID) - PK
  ├── email
  ├── phone
  ├── encrypted_password (if using email/password)
  ├── user_metadata (OAuth provider data)
  ├── created_at
  └── updated_at
        ↓
        │ (1 to 1 relationship via id)
        ↓
  profiles (Your table)
  ├── id (UUID) - PK, FK → auth.users(id)
  ├── first_name
  ├── last_name
  ├── phone
  ├── created_at
  └── updated_at


  phone_otp (Temporary, auto-cleaned after 10 min)
  ├── id (UUID) - PK
  ├── phone
  ├── otp_code (6 digits)
  ├── is_verified (boolean)
  ├── expires_at (10 min TTL)
  └── created_at


  email_otp (Temporary, auto-cleaned after 10 min)
  ├── id (UUID) - PK
  ├── email
  ├── otp_code (6 digits)
  ├── is_verified (boolean)
  ├── expires_at (10 min TTL)
  └── created_at

Note: OTP tables are cleaned up via TTL, old records auto-deleted
```

---

## 10. Configuration Requirements

```
┌─────────────────────────────────────────────────────────────────┐
│ What Needs Setup for Each Auth Method                           │
└─────────────────────────────────────────────────────────────────┘

  EMAIL & PASSWORD
  ────────────────
  Setup Required: None (uses Supabase Auth directly)
  Tables: auth.users, profiles
  Status: ✅ Ready to use
  Config: No external setup needed


  PHONE OTP
  ─────────
  Setup Required: Optional (for production SMS)
  Tables: phone_otp
  Status: ✅ Works in dev (shows OTP in console)
  Config: Add SMS service in /app/actions/phone-otp.ts
  Services: Twilio, AWS SNS, Firebase, etc.


  EMAIL OTP
  ─────────
  Setup Required: Optional (for production email)
  Tables: email_otp
  Status: ✅ Works in dev (shows OTP in console)
  Config: Add email service in /app/actions/auth.ts
  Services: SendGrid, Mailgun, Gmail API, etc.


  GOOGLE OAUTH
  ────────────
  Setup Required: Yes (5 minutes)
  1. Create OAuth app in Google Cloud Console
  2. Get Client ID and Secret
  3. Add to Supabase Dashboard
  4. Set redirect URIs
  Status: ⏳ Needs configuration
  Cost: Free


  FACEBOOK OAUTH
  ──────────────
  Setup Required: Yes (5 minutes)
  1. Create app in Facebook Developers
  2. Get App ID and Secret
  3. Add to Supabase Dashboard
  4. Set redirect URIs
  Status: ⏳ Needs configuration
  Cost: Free


  SUPABASE SETUP
  ──────────────
  Required: Yes (initial setup only)
  1. Create Supabase project
  2. Get URL and ANON_KEY
  3. Add env variables
  4. Enable auth providers
  Status: ✅ Pre-configured
```

---

These diagrams show how all authentication methods work in your system!
