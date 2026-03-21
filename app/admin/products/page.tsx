"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import AdminSidebar from "@/components/admin/sidebar"
import AdminHeader from "@/components/admin/header"
import { Plus, Edit2, Trash2, AlertCircle } from "lucide-react"

interface Product {
  id: string
  name: string
  category: string
  price: number
  stock_quantity: number
  description: string
  benefits: string[]
  usage: string
  image_url?: string
}

interface FormData {
  id?: string
  name: string
  category: string
  price: string
  sale_price: string
  mrp: string
  description: string
  benefits: string
  usage: string
  stock_quantity: string
  image_url: string
  image_file?: File
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [imagePreview, setImagePreview] = useState<string>("")
  const [formData, setFormData] = useState<FormData>({
    name: "",
    category: "",
    price: "",
    sale_price: "",
    mrp: "",
    description: "",
    benefits: "",
    usage: "",
    stock_quantity: "",
    image_url: "",
  })

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      console.log("[v0] Fetching products from server API...")

      const response = await fetch("/api/admin/products", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      })

      console.log("[v0] Products API response status:", response.status)

      if (!response.ok) {
        let errorMessage = "Failed to fetch products"
        // Read the body only once, as a text first
        const bodyText = await response.text()
        console.error("[v0] API response body:", bodyText.substring(0, 200))
        
        try {
          // Try to parse as JSON
          const errorData = JSON.parse(bodyText)
          console.error("[v0] API error response:", errorData)
          errorMessage = errorData.details || errorData.error || errorMessage
        } catch {
          // If not JSON, use the raw text
          errorMessage = `API Error ${response.status}: ${bodyText.substring(0, 100)}`
        }
        throw new Error(errorMessage)
      }

      const data = await response.json()
      console.log("[v0] Fetched", data.products.length, "products")
      setProducts(data.products)
      setError("")
    } catch (err) {
      console.error("[v0] Error fetching products:", err)
      setError(err instanceof Error ? err.message : "Failed to fetch products")
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setFormData({
      name: "",
      category: "",
      price: "",
      sale_price: "",
      mrp: "",
      description: "",
      benefits: "",
      usage: "",
      stock_quantity: "",
      image_url: "",
    })
    setEditingId(null)
    setImagePreview("")
  }

  const handleImageFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Validate file type
      if (!["image/jpeg", "image/png"].includes(file.type)) {
        setError("Please upload only JPEG or PNG images")
        return
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError("Image size must be less than 5MB")
        return
      }

      // Create preview
      const reader = new FileReader()
      reader.onload = (event) => {
        setImagePreview(event.target?.result as string)
      }
      reader.readAsDataURL(file)

      setFormData({ ...formData, image_file: file })
      setError("")
    }
  }

  const handleGoogleDriveLink = (url: string) => {
    // Convert Google Drive share link to direct image URL
    if (url.includes("drive.google.com")) {
      const fileId = url.match(/\/d\/([a-zA-Z0-9-_]+)/)?.[1]
      if (fileId) {
        const directUrl = `https://drive.google.com/uc?export=view&id=${fileId}`
        setFormData({ ...formData, image_url: directUrl })
        setImagePreview(directUrl)
        return
      }
    }
    setFormData({ ...formData, image_url: url })
    setImagePreview(url)
  }

  const handleEdit = (product: Product) => {
    setFormData({
      id: product.id,
      name: product.name,
      category: product.category,
      price: product.price.toString(),
      sale_price: (product as any).sale_price?.toString() || "",
      mrp: (product as any).mrp?.toString() || "",
      description: product.description,
      benefits: product.benefits.join(", "),
      usage: product.usage,
      stock_quantity: product.stock_quantity.toString(),
      image_url: product.image_url || "",
    })
    if (product.image_url) {
      setImagePreview(product.image_url)
    }
    setEditingId(product.id)
    setShowForm(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    if (!formData.name || !formData.category || !formData.price || !formData.stock_quantity) {
      setError("Please fill in all required fields")
      return
    }

    const benefitsArray = formData.benefits.split(",").map((b) => b.trim()).filter((b) => b.length > 0)

    try {
      let imageUrl = formData.image_url || null

      // If a file is provided, convert to base64
      if (formData.image_file) {
        const reader = new FileReader()
        imageUrl = await new Promise((resolve, reject) => {
          reader.onload = () => resolve(reader.result as string)
          reader.onerror = reject
          reader.readAsDataURL(formData.image_file!)
        })
      }

      const payload = {
        ...(editingId && { id: editingId }),
        name: formData.name,
        category: formData.category,
        price: Number.parseFloat(formData.price),
        sale_price: formData.sale_price ? Number.parseFloat(formData.sale_price) : null,
        mrp: formData.mrp ? Number.parseFloat(formData.mrp) : null,
        description: formData.description,
        benefits: benefitsArray,
        usage: formData.usage,
        stock_quantity: Number.parseInt(formData.stock_quantity),
        image_url: imageUrl,
      }

      if (editingId) {
        console.log("[v0] Updating product via API...")
        const response = await fetch("/api/admin/products", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(payload),
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || "Failed to update product")
        }

        setSuccess("Product updated successfully!")
        console.log("[v0] Product updated")
      } else {
        console.log("[v0] Creating new product via API...")
        const response = await fetch("/api/admin/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(payload),
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || "Failed to add product")
        }

        setSuccess("Product added successfully!")
        console.log("[v0] Product created")
      }

      resetForm()
      setShowForm(false)
      await fetchProducts()
    } catch (error) {
      console.error("[v0] Error:", error)
      setError(error instanceof Error ? error.message : "An error occurred")
    }
  }

  const handleDeleteProduct = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return

    try {
      console.log("[v0] Deleting product via API...")
      const response = await fetch(`/api/admin/products?id=${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      })

      const responseData = await response.json()

      if (!response.ok) {
        // Handle foreign key constraint error
        if (responseData.code === "FOREIGN_KEY_CONSTRAINT") {
          setError(
            "Cannot delete this product - it has been used in orders. Products with order history cannot be removed to maintain data integrity."
          )
        } else {
          setError(responseData.details || responseData.error || "Failed to delete product")
        }
        return
      }

      setSuccess("Product deleted successfully!")
      console.log("[v0] Product deleted")
      await fetchProducts()
    } catch (error) {
      console.error("[v0] Error deleting product:", error)
      setError(error instanceof Error ? error.message : "Failed to delete product")
    }
  }

  return (
    <div className="flex h-screen bg-background">
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader />
        <main className="flex-1 overflow-auto p-8">
          <div className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Products Management</h1>
              <p className="text-muted-foreground">Add, Edit, or Delete products - Total: {products.length}</p>
            </div>
            <Button
              onClick={() => {
                resetForm()
                setShowForm(!showForm)
              }}
              className="bg-primary hover:bg-primary/90 text-primary-foreground flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              {showForm ? "Cancel" : "Add Product"}
            </Button>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-gap gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          {success && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-700 text-sm font-semibold">{success}</p>
            </div>
          )}

          {showForm && (
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <h2 className="text-xl font-bold text-foreground mb-6">{editingId ? "Edit Product" : "Add New Product"}</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">Product Name *</label>
                    <input
                      type="text"
                      placeholder="Enter product name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">Category *</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    >
                      <option value="">Select Category</option>
                      <option value="Bone Health">Bone Health</option>
                      <option value="Cough & Cold">Cough & Cold</option>
                      <option value="Detoxification">Detoxification</option>
                      <option value="Digestion Support">Digestion Support</option>
                      <option value="Eye Care">Eye Care</option>
                      <option value="Hair Care">Hair Care</option>
                      <option value="Heart Care">Heart Care</option>
                      <option value="Gout Care">Gout Care</option>
                      <option value="Immunity Support">Immunity Support</option>
                      <option value="Joint Care">Joint Care</option>
                      <option value="Migraine">Migraine</option>
                      <option value="Men's Health">Men's Health</option>
                      <option value="Piles Care">Piles Care</option>
                      <option value="Stress Management">Stress Management</option>
                      <option value="Women's Health">Women's Health</option>
                      <option value="Skin Care">Skin Care</option>
                      <option value="Weight Management">Weight Management</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">MRP (₹)</label>
                    <input
                      type="number"
                      placeholder="0.00"
                      step="0.01"
                      value={formData.mrp}
                      onChange={(e) => setFormData({ ...formData, mrp: e.target.value })}
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">Sale Price (₹) *</label>
                    <input
                      type="number"
                      placeholder="0.00"
                      step="0.01"
                      value={formData.sale_price}
                      onChange={(e) => setFormData({ ...formData, sale_price: e.target.value })}
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">Price (₹) *</label>
                    <input
                      type="number"
                      placeholder="0.00"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">Stock Quantity *</label>
                    <input
                      type="number"
                      placeholder="0"
                      value={formData.stock_quantity}
                      onChange={(e) => setFormData({ ...formData, stock_quantity: e.target.value })}
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>
                </div>

                {/* Image Upload Section */}
                <div className="grid grid-cols-2 gap-6 pt-4 border-t border-border">
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">Upload Image (JPEG/PNG)</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary transition">
                      <input
                        type="file"
                        accept="image/jpeg,image/png"
                        onChange={handleImageFile}
                        className="hidden"
                        id="image-upload"
                      />
                      <label htmlFor="image-upload" className="cursor-pointer">
                        <div className="text-gray-500 mb-2">
                          <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                        <p className="text-xs text-gray-500">PNG, JPEG up to 5MB</p>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">Or paste Google Drive/Image Link</label>
                    <input
                      type="text"
                      placeholder="https://drive.google.com/file/d/... or image URL"
                      onChange={(e) => handleGoogleDriveLink(e.target.value)}
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <p className="text-xs text-muted-foreground mt-2">Paste Google Drive or direct image links here</p>
                  </div>
                </div>

                {/* Image Preview */}
                {imagePreview && (
                  <div className="pt-4 border-t border-border">
                    <p className="text-sm font-semibold text-foreground mb-2">Image Preview</p>
                    <div className="relative w-full max-w-xs">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-48 object-cover rounded-lg border border-border"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setImagePreview("")
                          setFormData({ ...formData, image_url: "", image_file: undefined })
                        }}
                        className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-2"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Description *</label>
                  <textarea
                    placeholder="Enter detailed product description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    rows={3}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Benefits (comma-separated) *</label>
                  <input
                    type="text"
                    placeholder="e.g., Improves vision, Reduces eye strain, Natural ingredients"
                    value={formData.benefits}
                    onChange={(e) => setFormData({ ...formData, benefits: e.target.value })}
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Usage Instructions *</label>
                  <textarea
                    placeholder="Enter usage instructions"
                    value={formData.usage}
                    onChange={(e) => setFormData({ ...formData, usage: e.target.value })}
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    rows={2}
                    required
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <Button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                    {editingId ? "Update Product" : "Add Product"}
                  </Button>
                  <Button
                    type="button"
                    onClick={() => {
                      setShowForm(false)
                      resetForm()
                    }}
                    variant="outline"
                    className="border-border"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </div>
          )}

          {loading ? (
            <div className="text-center py-8 text-muted-foreground">Loading products...</div>
          ) : products.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg">
              <p className="text-muted-foreground mb-4">No products found</p>
              <Button onClick={() => setShowForm(true)} className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Plus className="w-4 h-4 mr-2" />
                Add First Product
              </Button>
            </div>
          ) : (
            <div className="space-y-8">
              {Array.from(new Set(products.map((p) => p.category)))
                .sort()
                .map((category) => {
                  const categoryProducts = products.filter((p) => p.category === category)
                  return (
                    <div key={category} className="bg-white rounded-lg shadow-sm overflow-hidden">
                      <div className="bg-gradient-to-r from-primary/10 to-primary/5 px-6 py-4 border-b border-border">
                        <h2 className="text-lg font-bold text-foreground">{category}</h2>
                        <p className="text-sm text-muted-foreground">{categoryProducts.length} product(s)</p>
                      </div>
                      <table className="w-full">
                        <thead className="bg-secondary/30 border-b border-border">
                          <tr>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Name</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Price</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Stock</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Description</th>
                            <th className="px-6 py-3 text-right text-sm font-semibold text-foreground">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                          {categoryProducts.map((product) => (
                            <tr key={product.id} className="hover:bg-secondary/20 transition-colors">
                              <td className="px-6 py-4 text-sm font-semibold text-foreground">{product.name}</td>
                              <td className="px-6 py-4 text-sm font-bold text-primary">₹{product.price.toLocaleString("en-IN")}</td>
                              <td className="px-6 py-4 text-sm">
                                <span
                                  className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                                    product.stock_quantity < 10
                                      ? "bg-red-100 text-red-700"
                                      : "bg-green-100 text-green-700"
                                  }`}
                                >
                                  {product.stock_quantity}
                                </span>
                              </td>
                              <td className="px-6 py-4 text-sm text-muted-foreground max-w-xs truncate">
                                {product.description}
                              </td>
                              <td className="px-6 py-4 text-right">
                                <div className="flex justify-end gap-2">
                                  <button
                                    onClick={() => handleEdit(product)}
                                    className="p-2 hover:bg-blue-100 rounded-lg transition-colors"
                                    title="Edit product"
                                  >
                                    <Edit2 className="w-4 h-4 text-blue-600" />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteProduct(product.id)}
                                    className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                                    title="Delete product (will fail if product has been used in orders)"
                                  >
                                    <Trash2 className="w-4 h-4 text-red-600" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )
                })}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
