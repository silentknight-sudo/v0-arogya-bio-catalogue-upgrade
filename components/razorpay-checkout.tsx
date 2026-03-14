"use client"

import { useState } from "react"
import { createCheckoutSession, verifyPayment } from "@/app/actions/razorpay"
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react"

interface RazorpayCheckoutProps {
  cartItems: any[]
  onSuccess?: (orderId: string) => void
  onError?: (error: string) => void
}

declare global {
  interface Window {
    Razorpay: any
  }
}

export function RazorpayCheckout({ cartItems, onSuccess, onError }: RazorpayCheckoutProps) {
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<"idle" | "processing" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  const handleCheckout = async () => {
    setLoading(true)
    setStatus("processing")

    try {
      // Step 1: Create Razorpay order
      console.log("[v0] Creating Razorpay order...")
      const sessionData = await createCheckoutSession(cartItems)

      // Step 2: Load Razorpay script
      console.log("[v0] Loading Razorpay script...")
      const script = document.createElement("script")
      script.src = "https://checkout.razorpay.com/v1/checkout.js"
      script.async = true

      script.onload = () => {
        console.log("[v0] Razorpay script loaded")

        const options = {
          key: sessionData.keyId,
          amount: sessionData.amount,
          currency: sessionData.currency,
          order_id: sessionData.orderId,
          name: "ArogyaBio",
          description: "Premium Ayurvedic Wellness Products",
          image: "/arogya-bio-logo.png",
          handler: async (response: any) => {
            console.log("[v0] Payment handler called with response:", response)

            try {
              // Step 3: Verify payment on server
              console.log("[v0] Verifying payment...")
              const verifyResult = await verifyPayment(
                response.razorpay_order_id,
                response.razorpay_payment_id,
                response.razorpay_signature
              )

              console.log("[v0] Payment verified, order ID:", verifyResult.orderId)
              setStatus("success")
              setMessage("Payment successful! Your order has been created.")

              // Redirect to order confirmation
              setTimeout(() => {
                if (onSuccess) {
                  onSuccess(verifyResult.orderId)
                } else {
                  window.location.href = `/profile/orders/${verifyResult.orderId}`
                }
              }, 2000)
            } catch (error: any) {
              console.error("[v0] Payment verification error:", error)
              setStatus("error")
              setMessage(`Payment verification failed: ${error.message}`)
              if (onError) {
                onError(error.message)
              }
              setLoading(false)
            }
          },
          prefill: {
            name: "",
            email: "",
            contact: "",
          },
          theme: {
            color: "#16a34a", // Green color from your brand
          },
          modal: {
            ondismiss: () => {
              console.log("[v0] Payment modal dismissed")
              setLoading(false)
              setStatus("idle")
              setMessage("Payment cancelled")
            },
          },
        }

        const rzp = new window.Razorpay(options)
        rzp.on("payment.failed", (response: any) => {
          console.error("[v0] Payment failed:", response.error)
          setStatus("error")
          setMessage(`Payment failed: ${response.error.description}`)
          if (onError) {
            onError(response.error.description)
          }
          setLoading(false)
        })

        rzp.open()
      }

      script.onerror = () => {
        console.error("[v0] Failed to load Razorpay script")
        setStatus("error")
        setMessage("Failed to load payment gateway")
        if (onError) {
          onError("Failed to load payment gateway")
        }
        setLoading(false)
      }

      document.body.appendChild(script)
    } catch (error: any) {
      console.error("[v0] Checkout error:", error)
      setStatus("error")
      setMessage(`Checkout failed: ${error.message}`)
      if (onError) {
        onError(error.message)
      }
      setLoading(false)
    }
  }

  const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <div className="w-full space-y-4">
      {/* Status Messages */}
      {status === "success" && (
        <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-300 rounded-lg">
          <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
          <div>
            <p className="font-semibold text-green-900">{message}</p>
          </div>
        </div>
      )}

      {status === "error" && (
        <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-300 rounded-lg">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
          <div>
            <p className="font-semibold text-red-900">{message}</p>
          </div>
        </div>
      )}

      {/* Order Summary */}
      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
        <div className="space-y-2 mb-4">
          {cartItems.map((item, idx) => (
            <div key={idx} className="flex justify-between text-sm">
              <span className="text-gray-600">
                {item.name} x {item.quantity}
              </span>
              <span className="font-semibold text-gray-900">
                ₹{(item.price * item.quantity).toFixed(2)}
              </span>
            </div>
          ))}
        </div>
        <div className="border-t border-gray-300 pt-3">
          <div className="flex justify-between">
            <span className="font-bold text-gray-900">Total:</span>
            <span className="font-bold text-lg text-green-600">₹{totalAmount.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Checkout Button */}
      <button
        onClick={handleCheckout}
        disabled={loading || cartItems.length === 0 || status === "success"}
        className="w-full py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold rounded-lg hover:from-green-700 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Processing...
          </>
        ) : (
          <>Pay ₹{totalAmount.toFixed(2)} with Razorpay</>
        )}
      </button>

      <p className="text-xs text-gray-500 text-center">
        Powered by Razorpay - All transactions are secure and encrypted
      </p>
    </div>
  )
}
