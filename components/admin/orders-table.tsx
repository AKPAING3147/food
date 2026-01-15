"use client"

import { useState } from "react"
import { OrderStatus } from "@prisma/client"
import { updateOrderStatus } from "@/actions/orders"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface Order {
    id: string
    orderNumber: string
    status: OrderStatus
    totalAmount: number
    customerName: string
    customerPhone: string
    customerAddress: string
    createdAt: Date
    user: {
        name: string | null
        email: string | null
    }
    orderItems: {
        id: string
        quantity: number
        price: number
        menuItem: {
            name: string
        }
    }[]
}

const statusOptions: OrderStatus[] = [
    "PENDING",
    "CONFIRMED",
    "PREPARING",
    "READY",
    "DELIVERED",
    "CANCELLED",
]

const statusColors: Record<OrderStatus, string> = {
    PENDING: "bg-yellow-100 text-yellow-800 border-yellow-200",
    CONFIRMED: "bg-blue-100 text-blue-800 border-blue-200",
    PREPARING: "bg-orange-100 text-orange-800 border-orange-200",
    READY: "bg-green-100 text-green-800 border-green-200",
    DELIVERED: "bg-green-100 text-green-800 border-green-200",
    CANCELLED: "bg-red-100 text-red-800 border-red-200",
}

export function OrdersTable({ orders }: { orders: Order[] }) {
    const [isUpdating, setIsUpdating] = useState<string | null>(null)

    const handleStatusUpdate = async (orderId: string, newStatus: OrderStatus) => {
        setIsUpdating(orderId)
        try {
            await updateOrderStatus(orderId, newStatus)
        } catch (error) {
            alert("Failed to update order status")
        } finally {
            setIsUpdating(null)
        }
    }

    if (orders.length === 0) {
        return (
            <Card>
                <CardContent className="text-center py-12">
                    <p className="text-xl text-muted-foreground">No orders yet</p>
                </CardContent>
            </Card>
        )
    }

    return (
        <div className="space-y-4">
            {orders.map((order) => (
                <Card key={order.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            {/* Order Info */}
                            <div className="space-y-4">
                                <div>
                                    <h3 className="text-xl font-bold mb-1">
                                        Order #{order.orderNumber}
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                        {new Date(order.createdAt).toLocaleDateString("en-US", {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        })}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">
                                        Customer
                                    </p>
                                    <p className="font-medium">{order.customerName}</p>
                                    <p className="text-sm text-muted-foreground">
                                        {order.user.email}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">
                                        Contact
                                    </p>
                                    <p className="font-medium">{order.customerPhone}</p>
                                </div>

                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">
                                        Delivery Address
                                    </p>
                                    <p className="font-medium">{order.customerAddress}</p>
                                </div>

                                <div>
                                    <p className="text-sm font-medium text-muted-foreground mb-2">
                                        Items
                                    </p>
                                    <div className="space-y-1">
                                        {order.orderItems.map((item) => (
                                            <div
                                                key={item.id}
                                                className="text-sm flex justify-between"
                                            >
                                                <span>
                                                    {item.quantity}x {item.menuItem.name}
                                                </span>
                                                <span className="font-medium">
                                                    ${(item.price * item.quantity).toFixed(2)}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="pt-2 border-t">
                                    <div className="flex justify-between items-center">
                                        <span className="font-semibold">Total</span>
                                        <span className="text-xl font-bold text-primary">
                                            ${order.totalAmount.toFixed(2)}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Status Management */}
                            <div className="space-y-4">
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground mb-2">
                                        Current Status
                                    </p>
                                    <div
                                        className={`inline-flex px-4 py-2 rounded-full border font-semibold ${statusColors[order.status]
                                            }`}
                                    >
                                        {order.status}
                                    </div>
                                </div>

                                <div>
                                    <p className="text-sm font-medium text-muted-foreground mb-3">
                                        Update Status
                                    </p>
                                    <div className="grid grid-cols-2 gap-2">
                                        {statusOptions.map((status) => (
                                            <Button
                                                key={status}
                                                variant={order.status === status ? "default" : "outline"}
                                                size="sm"
                                                onClick={() => handleStatusUpdate(order.id, status)}
                                                disabled={
                                                    isUpdating === order.id || order.status === status
                                                }
                                                className="w-full"
                                            >
                                                {status}
                                            </Button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}
