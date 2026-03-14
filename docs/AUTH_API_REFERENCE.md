// API Summary - Authentication Actions
// Location: /app/actions/auth.ts

/**
 * EMAIL & PASSWORD AUTHENTICATION
 */

// Sign up with email and password
export async function signUpUser(
  email: string, 
  password: string, 
  firstName: string, 
  lastName: string, 
  phone: string
): Promise<{
  success?: boolean
  error?: string
  userId?: string
  email?: string
}>

// Sign in with email and password
export async function signInUser(
  email: string, 
  password: string
): Promise<{
  success?: boolean
  error?: string
  user?: any
}>

// Sign out the current user
export async function signOutUser(): Promise<{
  success?: boolean
  error?: string
}>


/**
 * GOOGLE OAUTH AUTHENTICATION
 */

// Initiate Google sign in/up flow
export async function signInWithGoogle(): Promise<{
  success?: boolean
  error?: string
  url?: string  // Redirect URL to Google OAuth
}>


/**
 * FACEBOOK OAUTH AUTHENTICATION
 */

// Initiate Facebook sign in/up flow
export async function signInWithFacebook(): Promise<{
  success?: boolean
  error?: string
  url?: string  // Redirect URL to Facebook OAuth
}>


/**
 * EMAIL OTP AUTHENTICATION
 */

// Generate and send OTP to email
export async function generateEmailOTP(
  email: string
): Promise<{
  success?: boolean
  error?: string
  otp?: string  // For development/testing only
}>

// Verify email OTP and check if user exists
export async function verifyEmailOTP(
  email: string, 
  otpCode: string
): Promise<{
  success?: boolean
  error?: string
  email?: string
  isNewUser?: boolean
}>

// Create user account after email OTP verification
export async function createEmailOTPUser(
  email: string, 
  firstName: string, 
  lastName: string, 
  phone: string
): Promise<{
  success?: boolean
  error?: string
  userId?: string
  isNewUser?: boolean
}>


/**
 * PHONE OTP AUTHENTICATION
 * Location: /app/actions/phone-otp.ts
 */

// Generate and send OTP to phone
export async function generatePhoneOTP(
  phone: string
): Promise<{
  success?: boolean
  error?: string
  otp?: string  // For development/testing only
}>

// Verify phone OTP
export async function verifyPhoneOTP(
  phone: string, 
  otpCode: string
): Promise<{
  success?: boolean
  error?: string
  phone?: string
}>

// Create or sign in user with phone OTP
export async function createOrSignInPhoneUser(
  phone: string, 
  firstName: string, 
  lastName: string
): Promise<{
  success?: boolean
  error?: string
  userId?: string
  isNewUser?: boolean
}>


/**
 * USAGE EXAMPLES
 */

// Example 1: Email & Password Sign Up
import { signUpUser } from '@/app/actions/auth'

const result = await signUpUser(
  'user@example.com',
  'SecurePassword123',
  'John',
  'Doe',
  '9876543210'
)

if (result.success) {
  console.log('User created:', result.userId)
} else {
  console.error('Signup failed:', result.error)
}


// Example 2: Email & Password Sign In
import { signInUser } from '@/app/actions/auth'

const result = await signInUser('user@example.com', 'SecurePassword123')

if (result.success) {
  console.log('User logged in:', result.user.email)
} else {
  console.error('Login failed:', result.error)
}


// Example 3: Google OAuth
import { signInWithGoogle } from '@/app/actions/auth'

const result = await signInWithGoogle()

if (result.success && result.url) {
  window.location.href = result.url  // Redirect to Google
}


// Example 4: Email OTP Flow
import { generateEmailOTP, verifyEmailOTP, createEmailOTPUser } from '@/app/actions/auth'

// Step 1: Generate OTP
const generateResult = await generateEmailOTP('user@example.com')
if (generateResult.success) {
  console.log('OTP sent! (Dev mode OTP:', generateResult.otp, ')')
}

// Step 2: User receives OTP and enters it
const verifyResult = await verifyEmailOTP('user@example.com', userEnteredOtp)
if (verifyResult.success) {
  if (verifyResult.isNewUser) {
    // Step 3: Create profile for new user
    const createResult = await createEmailOTPUser(
      'user@example.com',
      'John',
      'Doe',
      '9876543210'
    )
  }
}


// Example 5: Phone OTP Flow
import { generatePhoneOTP, verifyPhoneOTP, createOrSignInPhoneUser } from '@/app/actions/phone-otp'

// Step 1: Generate OTP
const generateResult = await generatePhoneOTP('+919876543210')
if (generateResult.success) {
  console.log('OTP sent! (Dev mode OTP:', generateResult.otp, ')')
}

// Step 2: Verify OTP
const verifyResult = await verifyPhoneOTP('+919876543210', userEnteredOtp)
if (verifyResult.success) {
  // Step 3: Create or sign in user
  const userResult = await createOrSignInPhoneUser(
    '+919876543210',
    'John',
    'Doe'
  )
}


/**
 * AUTHENTICATION STATES & FLOWS
 */

// After successful authentication, user has:
// 1. Session token stored in Supabase auth
// 2. Profile record in profiles table
// 3. Redirected to home page

// To get current user in components:
import { createClient } from '@/lib/supabase/client'

const supabase = createClient()
const { data: { session } } = await supabase.auth.getSession()
const currentUser = session?.user


// To sign out:
import { signOutUser } from '@/app/actions/auth'
await signOutUser()


/**
 * AVAILABLE ROUTES
 */

// Login page - multiple authentication methods
GET /auth/login

// Signup page - email registration and OAuth
GET /auth/sign-up

// Email OTP verification
GET /auth/email-verify?email=user@example.com

// Phone OTP verification
GET /auth/phone-verify?phone=+919876543210

// OAuth callback handler
GET /auth/callback
