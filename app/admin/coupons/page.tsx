"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import AdminSidebar from "@/components/admin/sidebar"
import AdminHeader from "@/components/admin/header"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Edit2, Trash2, Plus, Copy, Check } from "lucide-react"

interface Coupon {
  id: string
  code: string
  description: string
  discount_type: "percentage" | "fixed"
  discount_value: number
  max_discount?: number
  min_order_value?: number
  applicable_type: string
  usage_limit?: number
  per_user_limit: number
  is_active: boolean
  expires_at: string
  created_at: string
}

interface FormData {
  code: string
  description: string
  discount_type: "percentage" | "fixed"
  discount_value: string
  max_discount: string
  min_order_value: string
  applicable_type: string
  applicable_products: string[]
  applicable_categories: string[]
  usage_limit: string
  per_user_limit: string
  is_active: boolean
  expires_at: string
}

export default function CouponsPage() {
  const [coupons, setCoupons] = useState<Coupon[]>([])
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [copiedCode, setCopiedCode] = useState<string | null>(null)
  const [formData, setFormData] = useState<FormData>({
    code: "",
    description: "",
    discount_type: "percentage",
    discount_value: "",
    max_discount: "",
    min_order_value: "",
    applicable_type: "all",
    applicable_products: [],
    applicable_categories: [],
    usage_limit: "",
    per_user_limit: "1",
    is_active: true,
    expires_at: "",
  })

  useEffect(() => {
    fetchCoupons()
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/admin/products", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      })

      if (response.ok) {
        const data = await response.json()
        setProducts(data.products || [])
      }
    } catch (err) {
      console.error("[v0] Error fetching products:", err)
    }
  }

  const fetchCoupons = async () => {
    try {
      setLoading(true)
      console.log("[v0] Fetching coupons...")

      const response = await fetch("/api/admin/coupons", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      })

      const data = await response.json()

      if (response.ok) {
        // Ensure all coupons have the product and category fields
        const normalizedCoupons = data.coupons.map((coupon: any) => ({
          ...coupon,
          applicable_products: coupon.applicable_products || [],
          applicable_categories: coupon.applicable_categories || [],
        }))
        console.log(`[v0] Fetched ${normalizedCoupons.length} coupons`)
        setCoupons(normalizedCoupons)
      } else {
        setError(data.error || "Failed to fetch coupons")
      }
    } catch (err) {
      console.error("[v0] Error fetching coupons:", err)
      setError("Failed to fetch coupons")
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setFormData({
      code: "",
      description: "",
      discount_type: "percentage",
      discount_value: "",
      max_discount: "",
      min_order_value: "",
      applicable_type: "all",
      applicable_products: [],
      applicable_categories: [],
      usage_limit: "",
      per_user_limit: "1",
      is_active: true,
      expires_at: "",
    })
    setEditingId(null)
  }

  const handleEdit = (coupon: Coupon) => {
    setFormData({
      code: coupon.code,
      description: coupon.description || "",
      discount_type: coupon.discount_type,
      discount_value: coupon.discount_value.toString(),
      max_discount: (coupon.max_discount || "").toString(),
      min_order_value: (coupon.min_order_value || "").toString(),
      applicable_type: coupon.applicable_type,
      applicable_products: coupon.applicable_products || [],
      applicable_categories: coupon.applicable_categories || [],
      usage_limit: (coupon.usage_limit || "").toString(),
      per_user_limit: coupon.per_user_limit.toString(),
      is_active: coupon.is_active,
      expires_at: coupon.expires_at.split("T")[0],
    })
    setEditingId(coupon.id)
    setShowForm(true)
  }

  const handleSubmit = async () => {
    if (!formData.code || !formData.discount_value) {
      setError("Please fill in all required fields")
      return
    }

    try {
      setError("")
      const payload = {
        ...(editingId && { id: editingId }),
        code: formData.code.toUpperCase(),
        description: formData.description,
        discount_type: formData.discount_type,
        discount_value: parseFloat(formData.discount_value),
        max_discount: formData.max_discount ? parseFloat(formData.max_discount) : null,
        min_order_value: formData.min_order_value ? parseFloat(formData.min_order_value) : null,
        applicable_type: formData.applicable_type,
        usage_limit: formData.usage_limit ? parseInt(formData.usage_limit) : null,
        per_user_limit: parseInt(formData.per_user_limit),
        is_active: formData.is_active,
        expires_at: formData.expires_at || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      }

      if (editingId) {
        console.log("[v0] Updating coupon via API...")
        const response = await fetch("/api/admin/coupons", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(payload),
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || "Failed to update coupon")
        }

        setSuccess("Coupon updated successfully!")
        console.log("[v0] Coupon updated")
      } else {
        console.log("[v0] Creating new coupon via API...")
        const response = await fetch("/api/admin/coupons", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(payload),
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || "Failed to create coupon")
        }

        setSuccess("Coupon created successfully!")
        console.log("[v0] Coupon created")
      }

      resetForm()
      setShowForm(false)
      await fetchCoupons()
    } catch (err) {
      console.error("[v0] Error:", err)
      setError(err instanceof Error ? err.message : "An error occurred")
    }
  }

  const handleDeleteCoupon = async (id: string) => {
    if (!confirm("Are you sure you want to delete this coupon?")) return

    try {
      console.log("[v0] Deleting coupon via API...")
      const response = await fetch(`/api/admin/coupons?id=${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      })

      if (!response.ok) {
        const errorData = await response.json()
        setError(errorData.error || "Failed to delete coupon")
        return
      }

      setSuccess("Coupon deleted successfully!")
      console.log("[v0] Coupon deleted")
      await fetchCoupons()
    } catch (err) {
      console.error("[v0] Error deleting coupon:", err)
      setError(err instanceof Error ? err.message : "Failed to delete coupon")
    }
  }

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(code)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  return (
    <div className="flex h-screen bg-background">
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader />
        <main className="flex-1 overflow-auto p-6">
          <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-foreground">Coupon Management</h1>
        {!error && <Button onClick={() => setShowForm(!showForm)} className="gap-2">
          <Plus className="w-4 h-4" />
          New Coupon
        </Button>}
      </div>

      {error && (
        <Card className="bg-yellow-50 border-yellow-200 p-6">
          <h3 className="text-lg font-semibold text-yellow-900 mb-3">Database Setup Required</h3>
          <p className="text-yellow-800 mb-4">{error}</p>
          <div className="bg-white rounded p-4 text-sm font-mono text-gray-800 overflow-auto max-h-96">
            <p className="mb-2 text-gray-600">Run this SQL in your Supabase SQL Editor:</p>
            <pre className="whitespace-pre-wrap">{`-- Create coupons table
CREATE TABLE public.coupons (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  code varchar(50) NOT NULL UNIQUE,
  description text,
  discount_type varchar(20) NOT NULL DEFAULT 'percentage',
  discount_value numeric(10,2) NOT NULL,
  max_discount numeric(10,2),
  min_order_value numeric(10,2),
  applicable_type varchar(20) NOT NULL DEFAULT 'all',
  usage_limit integer,
  per_user_limit integer DEFAULT 1,
  is_active boolean DEFAULT true,
  expires_at timestamp,
  created_at timestamp DEFAULT now(),
  updated_at timestamp DEFAULT now()
);

CREATE INDEX idx_coupons_code ON public.coupons(code);
CREATE INDEX idx_coupons_active ON public.coupons(is_active);

-- Create coupon_usage table
CREATE TABLE public.coupon_usage (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  coupon_id uuid NOT NULL REFERENCES public.coupons(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  order_id uuid REFERENCES public.orders(id) ON DELETE SET NULL,
  used_at timestamp DEFAULT now(),
  discount_amount numeric(10,2) NOT NULL
);

CREATE INDEX idx_coupon_usage_user ON public.coupon_usage(user_id);
CREATE INDEX idx_coupon_usage_coupon ON public.coupon_usage(coupon_id);`}</pre>
          </div>
          <Button onClick={() => location.reload()} className="mt-4">Refresh After Setup</Button>
        </Card>
      )}

      {success && (
        <Card className="bg-green-50 border-green-200 p-4">
          <p className="text-green-800 font-medium">{success}</p>
        </Card>
      )}
      {success && (
        <Card className="mb-6 p-4 border-green-200 bg-green-50">
          <p className="text-green-800">{success}</p>
        </Card>
      )}

      {/* Create Button */}
      {!showForm && (
        <Button
          onClick={() => {
            resetForm()
            setShowForm(true)
          }}
          className="mb-6 gap-2"
        >
          <Plus className="w-4 h-4" /> New Coupon
        </Button>
      )}

      {/* Form */}
      {showForm && (
        <Card className="mb-6 p-6">
          <h2 className="text-xl font-bold mb-4 text-foreground">
            {editingId ? "Edit Coupon" : "Create New Coupon"}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground mb-1 block">
                Coupon Code
              </label>
              <Input
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                placeholder="e.g., SUMMER20"
                disabled={!!editingId}
              />
            </div>

            <div>
              <label className="text-sm font-medium text-muted-foreground mb-1 block">
                Description
              </label>
              <Input
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Summer discount"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-muted-foreground mb-1 block">
                Discount Type
              </label>
              <select
                value={formData.discount_type}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    discount_type: e.target.value as "percentage" | "fixed",
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="percentage">Percentage (%)</option>
                <option value="fixed">Fixed Amount (₹)</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-muted-foreground mb-1 block">
                Discount Value
              </label>
              <Input
                type="number"
                value={formData.discount_value}
                onChange={(e) => setFormData({ ...formData, discount_value: e.target.value })}
                placeholder={formData.discount_type === "percentage" ? "20" : "500"}
              />
            </div>

            {formData.discount_type === "percentage" && (
              <div>
                <label className="text-sm font-medium text-muted-foreground mb-1 block">
                  Max Discount Cap (₹)
                </label>
                <Input
                  type="number"
                  value={formData.max_discount}
                  onChange={(e) => setFormData({ ...formData, max_discount: e.target.value })}
                  placeholder="1000"
                />
              </div>
            )}

            <div>
              <label className="text-sm font-medium text-muted-foreground mb-1 block">
                Minimum Order Value (₹)
              </label>
              <Input
                type="number"
                value={formData.min_order_value}
                onChange={(e) => setFormData({ ...formData, min_order_value: e.target.value })}
                placeholder="500"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-muted-foreground mb-1 block">
                Applicable To
              </label>
              <select
                value={formData.applicable_type}
                onChange={(e) => setFormData({ ...formData, applicable_type: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="all">All Products</option>
                <option value="specific_products">Specific Products</option>
                <option value="category">Specific Category</option>
              </select>
            </div>

            {/* Product Selection */}
            {formData.applicable_type === "specific_products" && (
              <div className="md:col-span-2">
                <label className="text-sm font-medium text-muted-foreground mb-2 block">
                  Select Products
                </label>
                <div className="border border-gray-300 rounded-md p-3 max-h-48 overflow-y-auto">
                  {products.length === 0 ? (
                    <p className="text-sm text-gray-500">No products available</p>
                  ) : (
                    <div className="space-y-2">
                      {products.map((product) => (
                        <label key={product.id} className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={formData.applicable_products.includes(product.id)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setFormData({
                                  ...formData,
                                  applicable_products: [...formData.applicable_products, product.id],
                                })
                              } else {
                                setFormData({
                                  ...formData,
                                  applicable_products: formData.applicable_products.filter(
                                    (id) => id !== product.id
                                  ),
                                })
                              }
                            }}
                          />
                          <span className="text-sm">{product.name}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Category Selection */}
            {formData.applicable_type === "category" && (
              <div className="md:col-span-2">
                <label className="text-sm font-medium text-muted-foreground mb-2 block">
                  Select Categories
                </label>
                <div className="border border-gray-300 rounded-md p-3 max-h-48 overflow-y-auto">
                  {Array.from(new Set(products.map((p) => p.category))).map((category) => (
                    <label key={category} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={formData.applicable_categories.includes(category)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFormData({
                              ...formData,
                              applicable_categories: [...formData.applicable_categories, category],
                            })
                          } else {
                            setFormData({
                              ...formData,
                              applicable_categories: formData.applicable_categories.filter(
                                (c) => c !== category
                              ),
                            })
                          }
                        }}
                      />
                      <span className="text-sm">{category}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            <div>
              <label className="text-sm font-medium text-muted-foreground mb-1 block">
                Usage Limit (leave empty for unlimited)
              </label>
              <Input
                type="number"
                value={formData.usage_limit}
                onChange={(e) => setFormData({ ...formData, usage_limit: e.target.value })}
                placeholder="100"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-muted-foreground mb-1 block">
                Per User Limit
              </label>
              <Input
                type="number"
                value={formData.per_user_limit}
                onChange={(e) => setFormData({ ...formData, per_user_limit: e.target.value })}
              />
            </div>

            <div>
              <label className="text-sm font-medium text-muted-foreground mb-1 block">
                Expiry Date
              </label>
              <Input
                type="date"
                value={formData.expires_at}
                onChange={(e) => setFormData({ ...formData, expires_at: e.target.value })}
              />
            </div>

            <div className="flex items-end">
              <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.is_active}
                  onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                />
                Active
              </label>
            </div>
          </div>

          <div className="flex gap-2 mt-6">
            <Button onClick={handleSubmit}>
              {editingId ? "Update" : "Create"} Coupon
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                resetForm()
                setShowForm(false)
              }}
            >
              Cancel
            </Button>
          </div>
        </Card>
      )}

      {/* Coupons List */}
      {loading ? (
        <Card className="p-6 text-center text-muted-foreground">Loading coupons...</Card>
      ) : coupons.length === 0 ? (
        <Card className="p-6 text-center text-muted-foreground">No coupons found</Card>
      ) : (
        <div className="space-y-3">
          {coupons.map((coupon) => (
            <Card key={coupon.id} className="p-4">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <p className="text-lg font-bold text-foreground">{coupon.code}</p>
                    <button
                      onClick={() => copyToClipboard(coupon.code)}
                      className="p-1 hover:bg-gray-100 rounded transition-colors"
                    >
                      {copiedCode === coupon.code ? (
                        <Check className="w-4 h-4 text-green-600" />
                      ) : (
                        <Copy className="w-4 h-4 text-gray-600" />
                      )}
                    </button>
                  </div>
                  {coupon.description && (
                    <p className="text-sm text-muted-foreground mb-2">{coupon.description}</p>
                  )}
                  <div className="flex flex-wrap gap-3 text-xs">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {coupon.discount_type === "percentage" ? `${coupon.discount_value}%` : `₹${coupon.discount_value}`}
                    </span>
                    {coupon.min_order_value && (
                      <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded">
                        Min: ₹{coupon.min_order_value}
                      </span>
                    )}
                    {coupon.usage_limit && (
                      <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded">
                        Limit: {coupon.usage_limit}
                      </span>
                    )}
                    <span
                      className={`px-2 py-1 rounded ${
                        coupon.is_active
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {coupon.is_active ? "Active" : "Inactive"}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(coupon)}
                    className="p-2 hover:bg-blue-100 rounded-lg transition-colors"
                  >
                    <Edit2 className="w-4 h-4 text-blue-600" />
                  </button>
                  <button
                    onClick={() => handleDeleteCoupon(coupon.id)}
                    className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
          </div>
        </main>
      </div>
    </div>
  )
}
