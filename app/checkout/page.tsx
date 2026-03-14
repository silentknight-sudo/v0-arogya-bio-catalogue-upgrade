"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { CheckCircle2, MapPin, CreditCard, Package } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

interface CartItem {
  product_id: string
  quantity: number
  products: { name: string; price: number }
}

export default function CheckoutPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [orderId, setOrderId] = useState("")
  const [couponCode, setCouponCode] = useState("")
  const [appliedCoupon, setAppliedCoupon] = useState<any>(null)
  const [couponError, setCouponError] = useState("")
  const [couponLoading, setCouponLoading] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    paymentMethod: "card",
  })

  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser()
        if (!user) {
          router.push("/auth/login")
          return
        }

        setIsAuthenticated(true)

        // Check if there's a guest cart and sync it
        const guestCart = JSON.parse(localStorage.getItem("guestCart") || "[]")
        if (guestCart.length > 0) {
          console.log("[v0] Syncing guest cart to user account:", guestCart.length, "items")
          // Sync guest cart items to user
          for (const item of guestCart) {
            const { data: existingItem } = await supabase
              .from("cart_items")
              .select("id, quantity")
              .eq("user_id", user.id)
              .eq("product_id", item.product_id)
              .maybeSingle()

            if (existingItem) {
              await supabase
                .from("cart_items")
                .update({ quantity: existingItem.quantity + item.quantity })
                .eq("id", existingItem.id)
            } else {
              await supabase.from("cart_items").insert({
                user_id: user.id,
                product_id: item.product_id,
                quantity: item.quantity,
              })
            }
          }
          // Clear guest cart after syncing
          localStorage.removeItem("guestCart")
        }

        const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

        if (profile) {
          setFormData((prev) => ({
            ...prev,
            firstName: profile.first_name || "",
            lastName: profile.last_name || "",
            email: user.email || "",
            phone: profile.phone || "",
            address: profile.address || "",
            city: profile.city || "",
            state: profile.state || "",
            pincode: profile.pincode || "",
          }))
        }

        const { data: cartData } = await supabase
          .from("cart_items")
          .select(
            `
            product_id,
            quantity,
            products:product_id (
              name,
              price
            )
          `,
          )
          .eq("user_id", user.id)

        if (cartData) {
          setCartItems(cartData)
        }
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) {
      setCouponError("Please enter a coupon code")
      return
    }

    try {
      setCouponLoading(true)
      setCouponError("")
      
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        setCouponError("Please login first")
        return
      }

      console.log("[v0] Validating coupon:", couponCode)

      const response = await fetch("/api/coupons/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code: couponCode,
          user_id: user.id,
          order_total: subtotal + shipping + tax,
          items: cartItems,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        console.log("[v0] Coupon validation failed:", data.error)
        setCouponError(data.error || "Invalid coupon code")
        return
      }

      console.log("[v0] Coupon applied successfully:", data.coupon_id)
      setAppliedCoupon(data)
      setCouponCode("")
      setCouponError("")
    } catch (error) {
      console.error("[v0] Error applying coupon:", error)
      setCouponError("Failed to apply coupon. Please try again.")
    } finally {
      setCouponLoading(false)
    }
  }

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null)
    setCouponCode("")
    setCouponError("")
  }

  const handleNextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1)
  }

  const handlePrevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  const handlePlaceOrder = async () => {
    try {
      setLoading(true)
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) throw new Error("User not authenticated")

      const subtotal = cartItems.reduce((sum, item) => sum + item.products.price * item.quantity, 0)
      const shipping = subtotal > 2000 ? 0 : 150
      const tax = Math.round(subtotal * 0.18)
      const discountAmount = appliedCoupon ? appliedCoupon.discount_amount : 0
      const totalAmount = subtotal + shipping + tax - discountAmount

      console.log("[v0] Creating order for user:", user.id, "with discount:", discountAmount)

      const { data: orderData, error: orderError } = await supabase
        .from("orders")
        .insert({
          user_id: user.id,
          total_amount: totalAmount,
          status: "pending",
          shipping_address: `${formData.address}, ${formData.city}, ${formData.state} ${formData.pincode}`,
          payment_method: formData.paymentMethod,
          coupon_id: appliedCoupon ? appliedCoupon.coupon_id : null,
          discount_amount: discountAmount,
        })
        .select()
        .single()

      if (orderError) {
        console.log("[v0] Order creation error:", orderError)
        throw orderError
      }

      console.log("[v0] Order created:", orderData.id)

      const orderItems = cartItems.map((item) => ({
        order_id: orderData.id,
        product_id: item.product_id,
        quantity: item.quantity,
        price_at_purchase: item.products.price,
      }))

      const { error: itemsError } = await supabase.from("order_items").insert(orderItems)

      if (itemsError) {
        console.log("[v0] Order items error:", itemsError)
        throw itemsError
      }

      console.log("[v0] Order items created")

      // Record coupon usage if applied
      if (appliedCoupon) {
        const { error: usageError } = await supabase.from("coupon_usage").insert({
          coupon_id: appliedCoupon.coupon_id,
          user_id: user.id,
          order_id: orderData.id,
          discount_amount: discountAmount,
        })

        if (usageError) {
          console.error("[v0] Error recording coupon usage:", usageError)
        } else {
          console.log("[v0] Coupon usage recorded")
        }
      }

      await supabase.from("cart_items").delete().eq("user_id", user.id)

      await supabase
        .from("profiles")
        .update({
          first_name: formData.firstName,
          last_name: formData.lastName,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode,
        })
        .eq("id", user.id)

      console.log("[v0] Order placed successfully")
      setOrderId(orderData.id)
      setOrderPlaced(true)
      setCurrentStep(4)
    } catch (error: any) {
      console.error("[v0] Error placing order:", error)
      console.log("[v0] Error message:", error.message)
      console.log("[v0] Error details:", error)
      alert(`Error placing order: ${error.message || "Please try again."}`)
    } finally {
      setLoading(false)
    }
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.products.price * item.quantity, 0)
  const shipping = subtotal > 2000 ? 0 : 150
  const tax = Math.round(subtotal * 0.18)
  const discount = appliedCoupon ? appliedCoupon.discount_amount : 0
  const total = subtotal + shipping + tax - discount

  if (loading) {
    return (
      <main className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-12 text-center">Loading...</div>
        <Footer />
      </main>
    )
  }

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-12 text-center">Please login to checkout.</div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          {/* Progress Steps */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-8">
              {[
                { num: 1, label: "Shipping", icon: MapPin },
                { num: 2, label: "Payment", icon: CreditCard },
                { num: 3, label: "Review", icon: Package },
                { num: 4, label: "Confirmation", icon: CheckCircle2 },
              ].map((step) => {
                const StepIcon = step.icon
                return (
                  <div
                    key={step.num}
                    className="flex flex-col items-center"
                    style={{ flex: 1, marginRight: step.num === 4 ? 0 : "auto" }}
                  >
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-colors ${
                        currentStep >= step.num
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-muted-foreground"
                      }`}
                    >
                      <StepIcon className="w-6 h-6" />
                    </div>
                    <span
                      className={`text-sm font-semibold ${currentStep >= step.num ? "text-primary" : "text-muted-foreground"}`}
                    >
                      {step.label}
                    </span>
                  </div>
                )
              })}
            </div>
            <div className="h-1 bg-border rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-300"
                style={{ width: `${(currentStep / 4) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Step 1: Shipping Address */}
              {currentStep === 1 && (
                <div className="bg-white rounded-lg shadow-sm p-8">
                  <h2 className="text-2xl font-bold text-foreground mb-6">Shipping Address</h2>

                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                      <input
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>

                    <input
                      type="email"
                      name="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />

                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />

                    <input
                      type="text"
                      name="address"
                      placeholder="Street Address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />

                    <div className="grid grid-cols-3 gap-4">
                      <input
                        type="text"
                        name="city"
                        placeholder="City"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                      <input
                        type="text"
                        name="state"
                        placeholder="State"
                        value={formData.state}
                        onChange={handleInputChange}
                        className="px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                      <input
                        type="text"
                        name="pincode"
                        placeholder="Pincode"
                        value={formData.pincode}
                        onChange={handleInputChange}
                        className="px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Payment Method */}
              {currentStep === 2 && (
                <div className="bg-white rounded-lg shadow-sm p-8">
                  <h2 className="text-2xl font-bold text-foreground mb-6">Select Payment Method</h2>

                  <div className="space-y-4">
                    {[
                      { id: "card", name: "Credit/Debit Card", desc: "Visa, Mastercard, RuPay" },
                      { id: "upi", name: "UPI", desc: "Google Pay, PhonePe, PayTM" },
                      { id: "netbanking", name: "Net Banking", desc: "All major banks" },
                      { id: "cod", name: "Cash on Delivery", desc: "Pay when you receive" },
                    ].map((method) => (
                      <label
                        key={method.id}
                        className="flex items-start gap-4 p-4 border border-border rounded-lg cursor-pointer hover:bg-secondary/20 transition-colors"
                      >
                        <input
                          type="radio"
                          name="paymentMethod"
                          value={method.id}
                          checked={formData.paymentMethod === method.id}
                          onChange={handleInputChange}
                          className="mt-1"
                        />
                        <div>
                          <p className="font-semibold text-foreground">{method.name}</p>
                          <p className="text-sm text-muted-foreground">{method.desc}</p>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 3: Review Order */}
              {currentStep === 3 && (
                <div className="bg-white rounded-lg shadow-sm p-8">
                  <h2 className="text-2xl font-bold text-foreground mb-6">Review Your Order</h2>

                  <div className="space-y-6">
                    <div className="pb-6 border-b border-border">
                      <h3 className="font-semibold text-foreground mb-4">Shipping Address</h3>
                      <p className="text-muted-foreground">
                        {formData.firstName} {formData.lastName}
                        <br />
                        {formData.address}
                        <br />
                        {formData.city}, {formData.state} {formData.pincode}
                        <br />
                        {formData.email}
                        <br />
                        {formData.phone}
                      </p>
                    </div>

                    <div>
                      <h3 className="font-semibold text-foreground mb-4">Order Items</h3>
                      <div className="space-y-3">
                        {cartItems.map((item, idx) => (
                          <div key={idx} className="flex justify-between text-muted-foreground">
                            <span>
                              {item.products.name} x{item.quantity}
                            </span>
                            <span>₹{item.products.price * item.quantity}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Confirmation */}
              {currentStep === 4 && orderPlaced && (
                <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-8 h-8 text-green-600" />
                  </div>
                  <h2 className="text-3xl font-bold text-foreground mb-2">Order Confirmed!</h2>
                  <p className="text-muted-foreground text-lg mb-6">
                    Thank you for your order. Your order ID is{" "}
                    <span className="font-bold text-primary"># {orderId.slice(0, 8).toUpperCase()}</span>
                  </p>
                  <div className="bg-secondary/30 p-6 rounded-lg mb-8">
                    <p className="text-sm text-muted-foreground">
                      A confirmation email has been sent to {formData.email}. Your order will be delivered in 2-3
                      business days.
                    </p>
                  </div>
                  <Button
                    onClick={() => router.push("/")}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-lg"
                  >
                    Continue Shopping
                  </Button>
                </div>
              )}

              {/* Navigation Buttons */}
              {currentStep < 4 && (
                <div className="mt-8 flex gap-4">
                  <Button
                    onClick={handlePrevStep}
                    disabled={currentStep === 1}
                    variant="outline"
                    className="flex-1 border-border hover:bg-secondary disabled:opacity-50 disabled:cursor-not-allowed bg-transparent"
                  >
                    Previous
                  </Button>
                  <Button
                    onClick={currentStep === 3 ? handlePlaceOrder : handleNextStep}
                    className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg"
                    disabled={loading}
                  >
                    {loading ? "Processing..." : currentStep === 3 ? "Place Order" : "Next"}
                  </Button>
                </div>
              )}
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
                <h3 className="font-bold text-foreground mb-4">Order Summary</h3>

                <div className="space-y-3 mb-6 pb-6 border-b border-border">
                  {cartItems.map((item, idx) => (
                    <div key={idx} className="flex justify-between text-muted-foreground text-sm">
                      <span>
                        {item.products.name} x{item.quantity}
                      </span>
                      <span>₹{item.products.price * item.quantity}</span>
                    </div>
                  ))}
                </div>

                <div className="space-y-2 mb-6 pb-6 border-b border-border text-sm">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal</span>
                    <span>₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Shipping</span>
                    <span className={shipping === 0 ? "text-green-600 font-semibold" : ""}>
                      {shipping === 0 ? "FREE" : `₹${shipping}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Tax (18%)</span>
                    <span>₹{tax}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600 font-semibold">
                      <span>Discount</span>
                      <span>-₹{discount.toFixed(2)}</span>
                    </div>
                  )}
                </div>

                {/* Coupon Section */}
                {!appliedCoupon ? (
                  <div className="mb-6 pb-6 border-b border-border">
                    <label className="text-xs font-semibold text-muted-foreground mb-2 block">
                      HAVE A COUPON CODE?
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => {
                          setCouponCode(e.target.value)
                          setCouponError("")
                        }}
                        placeholder="Enter code"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
                      />
                      <Button
                        onClick={handleApplyCoupon}
                        disabled={couponLoading || !couponCode.trim()}
                        size="sm"
                        className="bg-primary text-primary-foreground"
                      >
                        {couponLoading ? "..." : "Apply"}
                      </Button>
                    </div>
                    {couponError && (
                      <p className="text-red-600 text-xs mt-2">{couponError}</p>
                    )}
                  </div>
                ) : (
                  <div className="mb-6 pb-6 border-b border-border">
                    <div className="bg-green-50 border border-green-200 rounded-md p-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-semibold text-green-800">
                          Coupon Applied: {appliedCoupon.message}
                        </span>
                        <button
                          onClick={handleRemoveCoupon}
                          className="text-xs text-green-600 hover:text-green-800 underline"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex justify-between text-lg font-bold text-foreground mb-4">
                  <span>Total</span>
                  <span className="text-primary">₹{total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
