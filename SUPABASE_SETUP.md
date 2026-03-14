# Supabase Setup Guide

## 🔧 How to Configure Supabase Environment Variables

Your project requires two environment variables from Supabase to function properly:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Step 1: Get Your Supabase Credentials

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Click on **Settings** in the left sidebar
4. Click **API** in the submenu
5. Copy these two values:
   - **Project URL** → This is your `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** → This is your `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Step 2: Add Environment Variables to Vercel

Since this is a Vercel project, add your variables there:

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add two new environment variables:

\`\`\`
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
\`\`\`

4. Make sure both are available for **Production** and **Preview** environments
5. Click **Save**

### Step 3: Redeploy Your Project

After adding environment variables:
1. Go to **Deployments** in your Vercel project
2. Find the most recent deployment
3. Click the three dots (...) → **Redeploy**
4. Confirm the redeployment

### Step 4: Verify It Works

1. Once redeployment completes, visit your project
2. Try accessing the `/shop` page
3. You should see products from your Supabase database displayed by category

## ✅ Verification Checklist

- [ ] Copied `NEXT_PUBLIC_SUPABASE_URL` from Supabase API settings
- [ ] Copied `NEXT_PUBLIC_SUPABASE_ANON_KEY` from Supabase API settings
- [ ] Added both variables to Vercel environment variables
- [ ] Set them for both Production and Preview environments
- [ ] Redeployed the project in Vercel
- [ ] Visited `/shop` and saw products loading

## 🆘 Troubleshooting

### Still seeing "Supabase credentials required" error?

1. **Check variable names**: Make sure they start with `NEXT_PUBLIC_` (they're exposed to the browser)
2. **Redeploy**: Sometimes Vercel doesn't pick up new env vars until redeployment
3. **Check values**: Ensure you copied the exact values from Supabase without extra spaces
4. **Wait**: Redeploy can take 2-3 minutes to complete

### Products not showing?

1. Check that your Supabase database has product tables created (run migration scripts)
2. Verify that the `products` table has data
3. Check browser console for any error messages

## 📚 More Information

- [Supabase Documentation](https://supabase.com/docs)
- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)
- [Vercel Environment Variables](https://vercel.com/docs/environment-variables)
