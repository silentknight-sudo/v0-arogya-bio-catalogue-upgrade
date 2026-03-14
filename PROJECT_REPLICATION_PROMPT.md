# v0 PROJECT REPLICATION PROMPT: Complete E-Commerce Platform

## PROJECT OVERVIEW
Build a complete, production-ready e-commerce platform with ALL features from ArogyaBio but with a NEW theme and modern design. This is NOT for Ayurveda/wellness - choose your own industry (fashion, electronics, home, beauty, food, tech, etc.).

---

## CORE TECH STACK
- Next.js 16 with App Router
- Supabase (PostgreSQL) with Row-Level Security
- Tailwind CSS v4 with custom design tokens
- shadcn/ui components
- Phone-based OTP (Twilio) + Email/Password
- Razorpay payment processor
- Ekart delivery integration API
- Vercel deployment with CI/CD

---

## 13 COMPLETE FEATURES

### 1. AUTHENTICATION
Phone OTP (Twilio SMS), Email/Password, Auto-profile creation, Multiple addresses, Wishlist, Account settings, Session management.

### 2. PRODUCT CATALOG
Product listing with search/filters, Categories, Multiple images, SKU/stock management, 5-star ratings/reviews, Related products, Wishlist, Bulk import.

### 3. SHOPPING CART
Add/remove products, Quantity management, Real-time count, Calculate taxes, Save for later, Cart persistence.

### 4. PAYMENT (RAZORPAY)
Checkout modal, UPI/Cards/Wallets, Signature verification, Invoice generation, Payment receipts, Automatic order creation.

### 5. ORDER MANAGEMENT
Order history, Real-time tracking, Estimated delivery, Return/cancel options, Download labels, Order statistics.

### 6. DELIVERY (EKART)
Auto-create shipments, Generate labels, Real-time tracking, Calculate costs, Schedule pickups, Manage returns, Track returns.

### 7. USER PROFILE
Personal details management, Multiple addresses, Wishlist, Order history, Account preferences, Data export/delete.

### 8. ADMIN DASHBOARD
Dashboard metrics, Product CRUD, Order management, Shipment management, User management, Coupons, Chat support, CMS, Audit logs.

### 9. FOOTER PAGES
FAQ, Shipping info, Returns policy, Privacy, Terms, Sitemap, About, Blog, Contact.

### 10. HEADER & NAVIGATION
Responsive header, Search bar, Cart icon, User menu, Mobile menu, Nav links, Breadcrumbs.

### 11. COUPON SYSTEM
Create/manage coupons, Discount (% or fixed), Usage limits, Expiry dates, Category-specific, Apply in cart, Usage tracking.

### 12. BLOG SYSTEM
Blog posts with categories, Rich text editor, Featured images, Comments, Related posts, Search/filter, Archive.

### 13. NOTIFICATIONS
Email (order, payment, shipment), In-app notifications, Chat support, Promotional emails.

---

## REQUIRED DATABASE TABLES

users, profiles, addresses, products, product_images, categories, cart_items, orders, order_items, shipments, coupons, reviews, wishlist, phone_otp, blog_posts, chat_messages, support_tickets, audit_logs

---

## ENVIRONMENT VARIABLES

NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY, NEXT_PUBLIC_RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET, TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER, EKART_API_BASE, EKART_MERCHANT_ID, EKART_API_KEY, EKART_WAREHOUSE_ID

---

## DESIGN REQUIREMENTS

- NEW theme (NOT Ayurveda/wellness)
- Mobile-first responsive
- Modern, clean aesthetic
- 3-5 colors max
- 2 fonts max
- Semantic HTML + ARIA labels
- Smooth animations
- Loading/empty states

---

## SECURITY & BEST PRACTICES

- HTTP-only cookies
- Bcrypt password hashing
- Row-level security (RLS)
- Input validation
- HMAC signature verification
- Audit logs
- Rate limiting
- SQL injection prevention

---

## SUCCESS CRITERIA

✓ All 13 features implemented
✓ Phone OTP working
✓ Razorpay payments working
✓ Ekart tracking working
✓ Admin dashboard functional
✓ Mobile responsive
✓ NEW design theme
✓ Security implemented
✓ Performance optimized
✓ Production ready
✓ Deployed to Vercel
