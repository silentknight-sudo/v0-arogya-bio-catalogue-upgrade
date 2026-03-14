# Google OAuth Complete Setup Guide for Arogyabio

## ✅ You're Almost Done! Here's What's Left

Your application is configured and ready. Google OAuth is enabled in Supabase. Now you just need to make sure the redirect URLs are correctly configured.

---

## Step 1: Verify Supabase Configuration

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Select your Arogyabio project
3. Go to **Authentication** → **Providers** → **Google**
4. You should see:
   - ✅ Google is **Enabled**
   - Your **Client ID** is filled in
   - Your **Client Secret** is filled in

If you see all of the above, **Google OAuth is configured!**

---

## Step 2: Add Redirect URLs to Supabase

This is the critical part that makes Google OAuth work:

1. In Supabase Dashboard, go to **Authentication** → **URL Configuration**
2. Scroll to **Redirect URLs** section
3. Add these URLs (click **+ Add URL**):
   ```
   https://www.arogyabio.com/auth/callback
   ```

4. If you also test locally, add:
   ```
   http://localhost:3000/auth/callback
   ```

5. Click **Save**

---

## Step 3: Verify Google Cloud Console

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project
3. Go to **APIs & Services** → **Credentials**
4. Find your OAuth 2.0 Client ID
5. Click on it to edit
6. Under **Authorized redirect URIs**, verify you have:
   ```
   https://your-supabase-url.supabase.co/auth/v1/callback?provider=google
   ```
   
   **Note**: This is the Google redirect URL (different from the app redirect URL). 
   Your Supabase URL looks like: `https://xxxxxxx.supabase.co`

---

## Step 4: Test Google Login

### Option A: Test on Production (https://www.arogyabio.com)
1. Go to `https://www.arogyabio.com/auth/login`
2. Click the **Social** tab
3. Click **Sign in with Google**
4. You should be redirected to Google login
5. After logging in with your Google account, you should be redirected back to your app

### Option B: Test Locally (http://localhost:3000)
1. Run your app locally: `npm run dev`
2. Go to `http://localhost:3000/auth/login`
3. Click the **Social** tab
4. Click **Sign in with Google**
5. After logging in, should redirect to home page

---

## What Your Users Will See

1. **Login Page**: `/auth/login` → Social tab shows "Sign in with Google"
2. **Click Button** → Redirected to Google login page
3. **User Logs In** → Redirected back to your app
4. **Automatic Profile Creation** → User profile automatically created
5. **Welcome Home** → User redirected to home page

---

## Also Works for Signup!

The same flow works for `/auth/sign-up`:

1. Go to `https://www.arogyabio.com/auth/sign-up`
2. Click the **Social Login** tab
3. Click **Sign up with Google**
4. Users can create accounts directly via Google

---

## Troubleshooting

### Issue: "Unsupported provider"
**Solution**: Check that Google is **Enabled** in Supabase Authentication → Providers → Google

### Issue: Infinite redirect loop
**Solution**: 
- Check that redirect URLs match exactly in Supabase
- Make sure you're not adding `http://` to production URLs
- Use `https://www.arogyabio.com` (not `http://`)

### Issue: "Invalid redirect_uri"
**Solution**:
- In Google Cloud Console, add the Supabase callback URL:
  ```
  https://your-supabase-url.supabase.co/auth/v1/callback?provider=google
  ```
- In Supabase, add your app callback URL:
  ```
  https://www.arogyabio.com/auth/callback
  ```

### Issue: New users can't create profiles
**Solution**: Check that your `profiles` table exists:
```sql
-- Run in Supabase SQL Editor
SELECT * FROM profiles LIMIT 1;
```

If table doesn't exist, create it:
```sql
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  first_name VARCHAR,
  last_name VARCHAR,
  phone VARCHAR,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Allow users to insert their own profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can insert their own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);
```

---

## What's Already Implemented ✅

| Feature | Status | Location |
|---------|--------|----------|
| Google OAuth Login | ✅ Ready | `/auth/login` → Social tab |
| Google OAuth Signup | ✅ Ready | `/auth/sign-up` → Social Login tab |
| OAuth Callback Handler | ✅ Ready | `/auth/callback` |
| Profile Auto-Creation | ✅ Ready | Automatic on first Google login |
| Environment Variables | ✅ Ready | `NEXT_PUBLIC_APP_URL` set to your domain |
| Error Handling | ✅ Ready | User-friendly error messages |

---

## Testing Checklist

- [ ] Go to `/auth/login` and see Google button
- [ ] Click Google button (you should go to Google login page)
- [ ] Log in with your Google account
- [ ] You should be redirected back to your app home page
- [ ] Check Supabase → Authentication → Users and see your account
- [ ] Go to `/auth/sign-up` and verify Google signup works
- [ ] Create a new account via Google signup
- [ ] Verify both new profile and original user both work

---

## Deployment Checklist

Before deploying to production:

- [ ] `NEXT_PUBLIC_APP_URL` is set to `https://www.arogyabio.com`
- [ ] Redirect URL added to Supabase: `https://www.arogyabio.com/auth/callback`
- [ ] Redirect URL added to Google Console: `https://your-supabase-url.supabase.co/auth/v1/callback?provider=google`
- [ ] Test on production domain works
- [ ] Users can login and signup via Google

---

## Need Help?

If Google login still isn't working:

1. Open browser DevTools (F12)
2. Go to `/auth/login` → Social tab
3. Click "Sign in with Google"
4. Check the **Console** tab for any error messages
5. Share those error messages for troubleshooting

---

## Summary

Your Google OAuth is configured! All you need to do is:

1. ✅ **Verify** Google is enabled in Supabase (Already done)
2. ✅ **Set** `NEXT_PUBLIC_APP_URL` to your domain (Just done!)
3. ✅ **Add** redirect URLs to Supabase
4. ✅ **Test** Google login on your domain
5. ✅ **Deploy** and enjoy!

**Your app is ready for Google OAuth!** 🚀
