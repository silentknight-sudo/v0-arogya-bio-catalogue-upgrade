-- Create shipments table for Ekart integration
CREATE TABLE IF NOT EXISTS shipments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  ekart_shipment_id TEXT UNIQUE,
  ekart_order_id TEXT UNIQUE,
  tracking_number TEXT UNIQUE,
  
  -- Shipment details
  status TEXT NOT NULL DEFAULT 'pending', -- pending, created, picked_up, in_transit, delivered, cancelled, failed
  current_location TEXT,
  estimated_delivery DATE,
  actual_delivery_date DATE,
  
  -- Pickup details
  pickup_scheduled_at TIMESTAMP,
  picked_up_at TIMESTAMP,
  
  -- Shipping cost
  shipping_cost DECIMAL(10, 2),
  weight_kg DECIMAL(8, 3),
  dimensions_length DECIMAL(8, 2),
  dimensions_width DECIMAL(8, 2),
  dimensions_height DECIMAL(8, 2),
  
  -- Warehouse info
  warehouse_id TEXT,
  
  -- Recipient info
  recipient_name TEXT NOT NULL,
  recipient_phone TEXT NOT NULL,
  recipient_email TEXT,
  recipient_address TEXT NOT NULL,
  recipient_city TEXT NOT NULL,
  recipient_state TEXT NOT NULL,
  recipient_pincode TEXT NOT NULL,
  
  -- Return shipment
  is_return_shipment BOOLEAN DEFAULT FALSE,
  return_reason TEXT,
  return_initiated_at TIMESTAMP,
  
  -- Ekart response data
  label_url TEXT,
  manifest_url TEXT,
  raw_response JSONB,
  
  -- Metadata
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  created_by UUID REFERENCES profiles(id),
  notes TEXT
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_shipments_order_id ON shipments(order_id);
CREATE INDEX IF NOT EXISTS idx_shipments_status ON shipments(status);
CREATE INDEX IF NOT EXISTS idx_shipments_tracking_number ON shipments(tracking_number);
CREATE INDEX IF NOT EXISTS idx_shipments_ekart_shipment_id ON shipments(ekart_shipment_id);
CREATE INDEX IF NOT EXISTS idx_shipments_created_at ON shipments(created_at);

-- Create audit log table for shipment operations
CREATE TABLE IF NOT EXISTS shipment_audit_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  shipment_id UUID NOT NULL REFERENCES shipments(id) ON DELETE CASCADE,
  action TEXT NOT NULL, -- created, updated, cancelled, label_generated, pickup_scheduled
  old_values JSONB,
  new_values JSONB,
  performed_by UUID NOT NULL REFERENCES profiles(id),
  ip_address TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_shipment_audit_shipment_id ON shipment_audit_log(shipment_id);
CREATE INDEX IF NOT EXISTS idx_shipment_audit_created_at ON shipment_audit_log(created_at);

-- Enable Row Level Security
ALTER TABLE shipments ENABLE ROW LEVEL SECURITY;
ALTER TABLE shipment_audit_log ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Only admins can view and manage shipments
CREATE POLICY admin_shipments_access ON shipments
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

CREATE POLICY admin_audit_log_access ON shipment_audit_log
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );
