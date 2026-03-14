-- Admin roles and users table
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('admin', 'sub_admin')),
  is_active BOOLEAN DEFAULT TRUE,
  permissions JSONB DEFAULT '{}',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- CMS Settings table for website customization
CREATE TABLE IF NOT EXISTS cms_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT UNIQUE NOT NULL,
  value JSONB NOT NULL,
  section TEXT,
  updated_at TIMESTAMP DEFAULT NOW(),
  updated_by UUID REFERENCES admin_users(id)
);

-- Homepage banners
CREATE TABLE IF NOT EXISTS homepage_banners (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT,
  description TEXT,
  image_url TEXT,
  button_text TEXT,
  button_url TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  sort_order INTEGER,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  updated_by UUID REFERENCES admin_users(id)
);

-- Product images
CREATE TABLE IF NOT EXISTS product_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  alt_text TEXT,
  is_primary BOOLEAN DEFAULT FALSE,
  sort_order INTEGER,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Order tracking and delivery
CREATE TABLE IF NOT EXISTS order_tracking (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  tracking_id TEXT UNIQUE,
  status TEXT DEFAULT 'pending',
  delivery_date DATE,
  notes TEXT,
  updated_at TIMESTAMP DEFAULT NOW(),
  updated_by UUID REFERENCES admin_users(id)
);

-- Chat messages for customer support
CREATE TABLE IF NOT EXISTS chat_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  message TEXT NOT NULL,
  is_from_admin BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Admin activity logs
CREATE TABLE IF NOT EXISTS admin_activity_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_id UUID REFERENCES admin_users(id),
  action TEXT,
  entity_type TEXT,
  entity_id UUID,
  changes JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE cms_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE homepage_banners ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_tracking ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_activity_logs ENABLE ROW LEVEL SECURITY;

-- RLS Policies for admin_users
CREATE POLICY "admin_users_select" ON admin_users
  FOR SELECT USING (TRUE);

CREATE POLICY "admin_users_update_own" ON admin_users
  FOR UPDATE USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- RLS Policies for cms_settings (public read, admin write)
CREATE POLICY "cms_settings_select_public" ON cms_settings
  FOR SELECT USING (TRUE);

CREATE POLICY "cms_settings_insert_admin" ON cms_settings
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid() AND is_active = TRUE)
  );

CREATE POLICY "cms_settings_update_admin" ON cms_settings
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid() AND is_active = TRUE)
  );

CREATE POLICY "cms_settings_delete_admin" ON cms_settings
  FOR DELETE USING (
    EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid() AND is_active = TRUE)
  );

-- RLS Policies for homepage_banners (public read, admin write)
CREATE POLICY "banners_select_public" ON homepage_banners
  FOR SELECT USING (TRUE);

CREATE POLICY "banners_insert_admin" ON homepage_banners
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid() AND is_active = TRUE)
  );

CREATE POLICY "banners_update_admin" ON homepage_banners
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid() AND is_active = TRUE)
  );

CREATE POLICY "banners_delete_admin" ON homepage_banners
  FOR DELETE USING (
    EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid() AND is_active = TRUE)
  );

-- RLS Policies for product_images (public read, admin write)
CREATE POLICY "product_images_select_public" ON product_images
  FOR SELECT USING (TRUE);

CREATE POLICY "product_images_insert_admin" ON product_images
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid() AND is_active = TRUE)
  );

CREATE POLICY "product_images_update_admin" ON product_images
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid() AND is_active = TRUE)
  );

CREATE POLICY "product_images_delete_admin" ON product_images
  FOR DELETE USING (
    EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid() AND is_active = TRUE)
  );

-- RLS Policies for order_tracking (users see own, admin sees all)
CREATE POLICY "order_tracking_select_own" ON order_tracking
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM orders WHERE orders.id = order_tracking.order_id AND orders.user_id = auth.uid())
    OR EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid() AND is_active = TRUE)
  );

CREATE POLICY "order_tracking_insert_admin" ON order_tracking
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid() AND is_active = TRUE)
  );

CREATE POLICY "order_tracking_update_admin" ON order_tracking
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid() AND is_active = TRUE)
  );

-- RLS Policies for chat_messages (users see own, admin sees all)
CREATE POLICY "chat_select_own" ON chat_messages
  FOR SELECT USING (
    user_id = auth.uid()
    OR EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid() AND is_active = TRUE)
  );

CREATE POLICY "chat_insert_own" ON chat_messages
  FOR INSERT WITH CHECK (user_id = auth.uid());

-- RLS Policies for admin_activity_logs (admin only)
CREATE POLICY "activity_logs_select_admin" ON admin_activity_logs
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid() AND is_active = TRUE)
  );

CREATE POLICY "activity_logs_insert_admin" ON admin_activity_logs
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid() AND is_active = TRUE)
  );
