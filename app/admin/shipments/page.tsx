"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Box,
  TrendingUp,
  Package,
  Truck,
  AlertCircle,
  CheckCircle2,
  MapPin,
  Phone,
  Download,
  Zap,
  RotateCcw,
  Plus,
  Loader2,
} from "lucide-react"

// Temporary mockup data - will connect to real data
const mockShipments = [
  {
    id: "1",
    orderId: "ORD-001",
    trackingNumber: "TRK-123456",
    status: "in_transit",
    recipientName: "Raj Kumar",
    recipientPhone: "+919876543210",
    recipientCity: "Delhi",
    estimatedDelivery: "2026-03-15",
    weight: 0.5,
    cost: 150,
  },
  {
    id: "2",
    orderId: "ORD-002",
    trackingNumber: "TRK-123457",
    status: "delivered",
    recipientName: "Priya Singh",
    recipientPhone: "+918765432109",
    recipientCity: "Mumbai",
    estimatedDelivery: "2026-03-12",
    weight: 0.3,
    cost: 120,
  },
]

export default function ShipmentsPage() {
  const [shipments] = useState(mockShipments)
  const [isCreating, setIsCreating] = useState(false)
  const [selectedShipment, setSelectedShipment] = useState<(typeof mockShipments)[0] | null>(null)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-800"
      case "in_transit":
        return "bg-blue-100 text-blue-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "delivered":
        return <CheckCircle2 className="w-4 h-4" />
      case "in_transit":
        return <Truck className="w-4 h-4" />
      case "pending":
        return <Box className="w-4 h-4" />
      default:
        return <AlertCircle className="w-4 h-4" />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">Ekart Shipments</h1>
              <p className="text-muted-foreground">Manage deliveries and track orders in real-time</p>
            </div>
            <Button
              className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
              onClick={() => setIsCreating(true)}
            >
              <Plus className="w-4 h-4" />
              Create Shipment
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Shipments</p>
                  <p className="text-3xl font-bold text-foreground mt-2">{shipments.length}</p>
                </div>
                <Package className="w-12 h-12 text-blue-500 opacity-20" />
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">In Transit</p>
                  <p className="text-3xl font-bold text-foreground mt-2">
                    {shipments.filter((s) => s.status === "in_transit").length}
                  </p>
                </div>
                <Truck className="w-12 h-12 text-orange-500 opacity-20" />
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Delivered</p>
                  <p className="text-3xl font-bold text-foreground mt-2">
                    {shipments.filter((s) => s.status === "delivered").length}
                  </p>
                </div>
                <CheckCircle2 className="w-12 h-12 text-green-500 opacity-20" />
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Cost</p>
                  <p className="text-3xl font-bold text-foreground mt-2">
                    ₹{shipments.reduce((sum, s) => sum + s.cost, 0)}
                  </p>
                </div>
                <TrendingUp className="w-12 h-12 text-purple-500 opacity-20" />
              </div>
            </Card>
          </div>
        </div>

        {/* Shipments Table */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-foreground">Active Shipments</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Tracking #</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Order</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Recipient</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Location</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Est. Delivery</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Cost</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {shipments.map((shipment) => (
                  <tr key={shipment.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <code className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">
                        {shipment.trackingNumber}
                      </code>
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold">{shipment.orderId}</td>
                    <td className="px-6 py-4">
                      <div className="text-sm">
                        <p className="font-semibold">{shipment.recipientName}</p>
                        <p className="text-muted-foreground text-xs">{shipment.recipientPhone}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      {shipment.recipientCity}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(shipment.status)}`}>
                        {getStatusIcon(shipment.status)}
                        {shipment.status.replace("_", " ").toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">{shipment.estimatedDelivery}</td>
                    <td className="px-6 py-4 text-sm font-semibold">₹{shipment.cost}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          className="p-2 hover:bg-blue-100 rounded text-blue-600 transition-colors"
                          title="Download Label"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                        <button
                          className="p-2 hover:bg-orange-100 rounded text-orange-600 transition-colors"
                          title="View Details"
                          onClick={() => setSelectedShipment(shipment)}
                        >
                          <Zap className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-6 cursor-pointer hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Plus className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Create Shipment</h3>
                <p className="text-sm text-muted-foreground">Generate new label</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 cursor-pointer hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Truck className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Schedule Pickup</h3>
                <p className="text-sm text-muted-foreground">Arrange collection</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 cursor-pointer hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <RotateCcw className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Manage Returns</h3>
                <p className="text-sm text-muted-foreground">Handle returns</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 cursor-pointer hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Calculate Cost</h3>
                <p className="text-sm text-muted-foreground">Check rates</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
