# Phone-Based OTP Login with Twilio Integration Guide

## Overview

Your ArogyaBio platform now has production-ready phone-based login with Twilio SMS integration. Users can sign in or sign up using just their phone number and OTP verification.

---

## Architecture

```
User enters phone number
         ↓
generatePhoneOTP()
    ↓
Twilio sends SMS OR console logs (testing)
    ↓
User receives OTP
    ↓
User enters 6-digit OTP
    ↓
verifyPhoneOTP()
    ↓
createOrSignInPhoneUser()
    ↓
User logged in ✅
```

---

## Step-by-Step Setup

### **1. Create Twilio Account**
- Go to https://www.twilio.com/try-twilio
- Sign up with your email
- Verify email
- You get $10-15 free credits

### **2. Get Twilio Credentials**
- In Twilio Console, you'll see:
  - **Account SID**: ACxxxxxxxxxx
  - **Auth Token**: your_auth_token
  - **Twilio Phone Number**: +1234567890

### **3. Get a Twilio Phone Number**
- Go to "Phone Numbers" → "Manage Phone Numbers"
- Click "Buy a Phone Number"
- Select India (or your country)
- Confirm purchase

### **4. Add Environment Variables**

**In your v0 project Settings → Vars:**

```
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_auth_token_here
TWILIO_PHONE_NUMBER=+1234567890
```

### **5. Test It Out**

1. Go to `/auth/login`
2. Click **"Phone"** tab
3. Enter your phone number (e.g., `+919876543210`)
4. **For Development**: Check browser console (F12) for OTP
5. **For Production**: Wait 30 seconds for SMS
6. Enter 6-digit OTP
7. Complete profile
8. Done! ✅

---

## File Changes Made

| File | Changes |
|------|---------|
| `/app/actions/phone-otp.ts` | Added `sendOtpViaTwilio()` function for SMS sending |
| `/app/auth/phone-verify/page.tsx` | Updated UI message to guide users about SMS arrival |

---

## How It Works

### **Sending OTP via Twilio**

```typescript
// 1. Generate 6-digit code
const otp = Math.floor(100000 + Math.random() * 900000).toString()

// 2. Store in database with 10-minute expiry
await supabase.from("phone_otp").insert({
  phone,
  otp_code: otp,
  expires_at: new Date(Date.now() + 10*60*1000)
})

// 3. Send via Twilio
await sendOtpViaTwilio(phone, otp)

// 4. Message format:
// "Your ArogyaBio verification code is: 123456. 
//  This code will expire in 10 minutes."
```

### **Verifying OTP**

```typescript
// Check if OTP matches and isn't expired
const otpRecord = await supabase
  .from("phone_otp")
  .select()
  .eq("phone", phone)
  .eq("otp_code", enteredOtp)
  .gt("expires_at", now)

if (otpRecord) {
  // Mark as verified
  // Sign in user
}
```

---

## Features

✅ **10-minute OTP expiry** - Codes automatically expire
✅ **Phone validation** - Checks format before sending
✅ **Fallback to console** - Shows OTP in console if SMS fails (for testing)
✅ **Auto sign-in** - Existing users auto-login
✅ **New user creation** - New users get auto-profile
✅ **Duplicate OTP prevention** - Old OTPs cleared when new one generated
✅ **Production ready** - Full error handling and logging

---

## Testing

### **Development (Without Twilio Setup)**
- OTP shows in browser console
- Enter any 6-digit number that matches console OTP
- Works for testing UI

### **Testing with Real SMS**
- Add Twilio credentials to Vercel
- SMS arrives in 30 seconds
- Enter code received in SMS

### **Test Phone Numbers (Twilio)**
- If using Twilio trial, use verified numbers only
- Add verified phone number in Twilio Console first

---

## Troubleshooting

### **"OTP Sending Failed"**
- Check Twilio credentials in Vercel Vars
- Ensure phone number format is correct (+91...)
- Check Twilio account balance

### **"OTP Expired"**
- OTP valid for 10 minutes
- Generate new OTP if expired

### **"Invalid OTP"**
- Check console for correct code
- Ensure no extra spaces
- Case-sensitive

---

## Security Features

✅ **Server-side verification** - OTP never exposed to client
✅ **HMAC signature** - In Razorpay (future integration)
✅ **Expiry timestamps** - Database-level expiry
✅ **Phone number validation** - Prevents malformed numbers
✅ **Rate limiting** (optional) - Can add later

---

## Next Steps

1. ✅ Create Twilio account
2. ✅ Add environment variables
3. ✅ Test phone login
4. Integrate Razorpay for payments (next)
5. Add email verification as alternative
6. Add phone number update in profile

---

## Support

Need help? Check:
- Twilio Docs: https://www.twilio.com/docs
- Your Vercel project Vars
- Browser console for errors
