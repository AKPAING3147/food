import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"
import { Navbar } from "@/components/navbar"
import { getOrders } from "@/actions/orders"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, Clock, CheckCircle, XCircle } from "lucide-react"

const statusIcons = {
    PENDING: <Clock className="h-5 w-5 text-yellow-500" />,
    CONFIRMED: <CheckCircle className="h-5 w-5 text-blue-500" />,
    PREPARING: <Package className="h-5 w-5 text-orange-500" />,
    READY: <CheckCircle className="h-5 w-5 text-green-500" />,
    DELIVERED: <CheckCircle className="h-5 w-5 text-green-600" />,
    CANCELLED: <XCircle className="h-5 w-5 text-red-500" />,
}

const statusColors = {
    PENDING: "bg-yellow-100 text-yellow-800 border-yellow-200",
    CONFIRMED: "bg-blue-100 text-blue-800 border-blue-200",
    PREPARING: "bg-orange-100 text-orange-800 border-orange-200",
    READY: "bg-green-100 text-green-800 border-green-200",
    DELIVERED: "bg-green-100 text-green-800 border-green-200",
    CANCELLED: "bg-red-100 text-red-800 border-red-200",
}

export default async function OrdersPage() {
    const session = await auth()

    if (!session) {
        redirect("/login")
    }

    const orders = await getOrders()

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50">
            <Navbar user={session.user} />

            <main className="container mx-auto px-4 py-8">
                <h1 className="mb-8 text-4xl font-bold">My Orders</h1>

                {orders.length === 0 ? (
                    <Card className="text-center py-12">
                        <CardContent>
                            <Package className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                            <p className="text-xl text-muted-foreground">
                                You haven't placed any orders yet
                            </p>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="space-y-6">
                        {orders.map((order) => (
                            <Card key={order.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                                <CardHeader className="bg-gradient-to-r from-orange-50 to-orange-100">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <CardTitle className="text-xl">
                                                Order #{order.orderNumber}
                                            </CardTitle>
                                            <CardDescription>
                                                {new Date(order.createdAt).toLocaleDateString("en-US", {
                                                    year: "numeric",
                                                    month: "long",
                                                    day: "numeric",
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                })}
                                            </CardDescription>
                                        </div>
                                        <div className={`flex items-center space-x-2 px-4 py-2 rounded-full border ${statusColors[order.status]}`}>
                                            {statusIcons[order.status]}
                                            <span className="font-semibold">{order.status}</span>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="pt-6">
                                    <div className="space-y-4">
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div>
                                                <p className="text-sm font-medium text-muted-foreground">
                                                    Delivery Address
                                                </p>
                                                <p className="font-medium">{order.customerAddress}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-muted-foreground">
                                                    Contact
                                                </p>
                                                <p className="font-medium">{order.customerPhone}</p>
                                            </div>
                                        </div>

                                        {order.notes && (
                                            <div>
                                                <p className="text-sm font-medium text-muted-foreground">
                                                    Notes
                                                </p>
                                                <p className="font-medium">{order.notes}</p>
                                            </div>
                                        )}

                                        <div>
                                            <p className="text-sm font-medium text-muted-foreground mb-2">
                                                Order Items
                                            </p>
                                            <div className="space-y-2">
                                                {order.orderItems.map((item) => (
                                                    <div
                                                        key={item.id}
                                                        className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                                                    >
                                                        <div>
                                                            <p className="font-medium">{item.menuItem.name}</p>
                                                            <p className="text-sm text-muted-foreground">
                                                                Quantity: {item.quantity}
                                                            </p>
                                                        </div>
                                                        <p className="font-semibold">
                                                            ${(item.price * item.quantity).toFixed(2)}
                                                        </p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between pt-4 border-t">
                                            <span className="text-lg font-semibold">Total Amount</span>
                                            <span className="text-2xl font-bold text-primary">
                                                ${order.totalAmount.toFixed(2)}
                                            </span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </main>
        </div>
    )
}
