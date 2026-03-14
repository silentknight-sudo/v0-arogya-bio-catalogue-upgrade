# Ekart Delivery Integration Guide

## Overview

Complete Ekart delivery management system integrated into your ArogyaBio admin panel. Manage shipments, track orders, calculate costs, and handle returns all from one place.

## Step 1: Get Ekart Credentials

1. **Create Ekart Account**
   - Go to https://www.ekart.com
   - Sign up as a merchant
   - Complete KYC verification

2. **Get API Credentials**
   - Log in to Ekart Merchant Dashboard
   - Go to **Settings → API Keys**
   - Copy:
     - **Merchant ID**
     - **API Key**
     - **Warehouse ID**

## Step 2: Add Environment Variables

In your v0 project:
1. Click **Settings** (top right)
2. Go to **Vars** section
3. Add these environment variables:

```
EKART_API_BASE=https://api.ekart.com/api
EKART_MERCHANT_ID=your_merchant_id
EKART_API_KEY=your_api_key
EKART_WAREHOUSE_ID=your_warehouse_id
```

**Note:** Replace values with your actual Ekart credentials

## Step 3: Database Setup

The integration uses these tables (must be created manually in Supabase):

### Shipments Table
```sql
CREATE TABLE shipments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES orders(id),
  ekart_shipment_id TEXT UNIQUE,
  tracking_number TEXT UNIQUE,
  status TEXT DEFAULT 'pending',
  recipient_name TEXT NOT NULL,
  recipient_phone TEXT NOT NULL,
  recipient_address TEXT NOT NULL,
  recipient_city TEXT NOT NULL,
  recipient_state TEXT NOT NULL,
  recipient_pincode TEXT NOT NULL,
  weight_kg DECIMAL(8, 3),
  shipping_cost DECIMAL(10, 2),
  label_url TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

## Step 4: Features Available

### 1. Generate Shipping Labels
- Create shipments directly from admin panel
- Auto-generate tracking numbers
- Download printable labels
- Support for COD and Prepaid

### 2. Real-Time Tracking
- Track shipment status live
- View current location
- Estimated delivery dates
- Full delivery timeline

### 3. Calculate Shipping Costs
- Get rates based on pincode & weight
- Compare pricing options
- Budget estimates for orders

### 4. Schedule Pickups
- Request Ekart pickup from warehouse
- Schedule multiple pickups
- Confirm pickup timings

### 5. Manage Returns
- Create return shipments
- Track return status
- Generate reverse labels
- Handle refunds

## Step 5: Access Admin Panel

Once set up, access the shipments panel:

1. Go to your admin dashboard
2. Click **Shipments** (or navigate to `/admin/shipments`)
3. You'll see:
   - Live shipment stats
   - Active shipments table
   - Quick action buttons

## Integration Files

| File | Purpose |
|------|---------|
| `/lib/ekart.ts` | Ekart API client & utilities |
| `/app/actions/ekart-shipments.ts` | Server actions for shipment operations |
| `/app/admin/shipments/page.tsx` | Admin UI for shipment management |
| `/scripts/create-shipments-table.sql` | Database migration script |

## API Functions Available

### Create Shipment
```typescript
createShipment({
  orderId: "ORD-123",
  recipientName: "John Doe",
  recipientPhone: "+919876543210",
  recipientAddress: "123 Main St",
  recipientCity: "Delhi",
  recipientState: "Delhi",
  recipientPincode: "110001",
  weightKg: 0.5,
  productDescription: "Ayurvedic Oil",
  orderValue: 499,
  paymentMode: "CASH" // or "PREPAID"
})
```

### Track Shipment
```typescript
getShipmentTracking("TRK-123456")
```

### Calculate Cost
```typescript
calculateShippingCost("110001", 0.5)
```

### Schedule Pickup
```typescript
schedulePickup("2026-03-15")
```

### Create Return
```typescript
createReturnShipment("shipment-123", "Damaged Product")
```

## Testing

### Test Mode
1. Use test Ekart credentials (available in Ekart dashboard)
2. Create test shipments
3. Track mock status updates
4. Verify label generation

### Live Mode
1. Switch to production Ekart credentials
2. Ensure warehouse is verified
3. Enable real shipments
4. Monitor first shipments closely

## Security

- API credentials stored in environment variables only
- Admin-only access to shipment features
- Audit logging of all operations
- No sensitive data in logs

## Troubleshooting

### "Ekart credentials not configured"
- Check environment variables are set
- Verify in Settings → Vars
- Restart the application

### "Invalid API Key"
- Verify credentials from Ekart dashboard
- Check for typos or extra spaces
- Generate new API key if needed

### Shipment creation fails
- Verify recipient pincode is valid
- Check weight format (use decimal, e.g., 0.5)
- Ensure warehouse ID is correct

## Support

For Ekart support:
- Email: merchant@ekart.com
- Phone: 1800-120-7979
- Dashboard: https://merchant.ekart.com/support

For integration support:
- Check logs in browser console
- Review error messages
- Contact your system administrator
