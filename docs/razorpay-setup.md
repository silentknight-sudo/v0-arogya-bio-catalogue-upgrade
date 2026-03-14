# Razorpay Integration Setup Guide

## Complete Step-by-Step Instructions

### **Phase 1: Razorpay Account Setup** ✅

#### Step 1.1: Create Razorpay Account
1. Visit https://razorpay.com
2. Click **"Sign Up"** in the top right corner
3. Enter your email and create a password
4. Verify your email address
5. Fill in business details:
   - **Business Name**: ArogyaBio
   - **Business Type**: E-commerce / Health & Wellness
   - **Phone Number**: Your contact number
   - **Address**: Your business address
6. Submit for verification (typically 2-4 hours)

#### Step 1.2: Retrieve API Keys
1. Log in to your Razorpay Dashboard
2. Navigate to **Settings** → **API Keys**
3. You'll see two keys:
   - **Key ID** (Publishable, starts with `rzp_test_`)
   - **Key Secret** (Private, keep secure!)
4. Copy both keys and save them safely

### **Phase 2: Environment Configuration** ✅

#### Step 2.1: Add Keys to Vercel
1. Open your v0 project
2. Click **Settings** (top right corner)
3. Go to **Vars** tab
4. Add these environment variables:

```
NEXT_PUBLIC_RAZORPAY_KEY_ID = your_key_id_here
RAZORPAY_KEY_SECRET = your_key_secret_here
```

**Important**: 
- `NEXT_PUBLIC_RAZORPAY_KEY_ID` is public (accessible in browser)
- `RAZORPAY_KEY_SECRET` is private (server-side only)

#### Step 2.2: Verify Environment Variables
- The variables will be automatically available in your Next.js app
- Check in your terminal: they should be accessible via `process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID`

### **Phase 3: Integration Components** ✅

We've created 3 main files:

#### 1. `/lib/razorpay.ts` - Razorpay Configuration
- Handles API communication with Razorpay
- Creates orders
- Verifies payment signatures
- Ensures security through signature verification

#### 2. `/app/actions/razorpay.ts` - Server Actions
- `createCheckoutSession()`: Creates Razorpay order
- `verifyPayment()`: Verifies payment and saves order to database
- Handles cart → order conversion
- Clears cart after successful payment

#### 3. `/components/razorpay-checkout.tsx` - Checkout UI
- Beautiful payment interface
- Loads Razorpay script dynamically
- Shows order summary
- Handles success/error states

### **Phase 4: Integration with Your Cart** (Next Steps)

#### Step 4.1: Find Your Cart Page
- Locate `/app/cart/page.tsx` or similar

#### Step 4.2: Import and Use the Component
```tsx
import { RazorpayCheckout } from "@/components/razorpay-checkout"

export default function CartPage() {
  const [cartItems, setCartItems] = useState([])

  return (
    <div>
      {/* Your cart items display */}
      
      {/* Add checkout component */}
      <RazorpayCheckout 
        cartItems={cartItems}
        onSuccess={(orderId) => {
          // Redirect or show success message
          window.location.href = `/profile/orders/${orderId}`
        }}
        onError={(error) => {
          console.error("Payment error:", error)
        }}
      />
    </div>
  )
}
```

### **Phase 5: Database Schema Updates**

Ensure these tables exist in Supabase (they should already exist):

```sql
-- Orders table
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL,
  total_amount DECIMAL NOT NULL,
  status VARCHAR DEFAULT 'pending',
  razorpay_order_id VARCHAR,
  razorpay_payment_id VARCHAR,
  created_at TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY (user_id) REFERENCES auth.users(id)
);

-- Order Items table
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID NOT NULL,
  product_id UUID NOT NULL,
  quantity INTEGER NOT NULL,
  price_at_purchase DECIMAL NOT NULL,
  FOREIGN KEY (order_id) REFERENCES orders(id),
  FOREIGN KEY (product_id) REFERENCES products(id)
);
```

### **Phase 6: Testing**

#### Test in Development:
1. Use Razorpay test keys (your current keys)
2. Test card: **4111 1111 1111 1111**
3. Any future expiry date
4. Any 3-digit CVV
5. Any OTP will work

#### Go Live:
1. Complete Razorpay KYC verification
2. Switch to Live keys in Razorpay Dashboard
3. Update environment variables to use live keys
4. Deploy to production

### **Phase 7: Payment Flow Overview**

```
1. User adds items to cart
   ↓
2. Clicks "Pay with Razorpay"
   ↓
3. `createCheckoutSession()` creates order in Razorpay
   ↓
4. Razorpay payment modal appears
   ↓
5. User completes payment
   ↓
6. `verifyPayment()` verifies signature on server
   ↓
7. Order saved to database
   ↓
8. Cart cleared
   ↓
9. User redirected to order confirmation
```

## Security Checklist

✅ **Signature Verification**: All payments are verified using HMAC-SHA256  
✅ **Server-Side Verification**: Payment validation happens on the server, not client  
✅ **Encrypted Keys**: Secret key is environment variable (never exposed)  
✅ **Database Recording**: Razorpay IDs stored for reconciliation  
✅ **User Authentication**: Payments require logged-in user  

## Troubleshooting

| Issue | Solution |
|-------|----------|
| "Razorpay keys not configured" | Check environment variables in Vercel settings |
| Payment modal doesn't open | Verify NEXT_PUBLIC_RAZORPAY_KEY_ID is set correctly |
| "Invalid signature" error | Ensure RAZORPAY_KEY_SECRET matches your account |
| Cart not clearing | Check database permissions for cart_items table |
| Orders not saving | Verify orders and order_items tables exist |

## Next Steps

1. ✅ Create Razorpay account
2. ✅ Add API keys to environment
3. ⏳ Integrate with cart page
4. ⏳ Test with test card
5. ⏳ Go live with live keys
6. ⏳ Monitor transactions in Razorpay Dashboard
