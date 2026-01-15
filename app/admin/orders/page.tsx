import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"
import { Navbar } from "@/components/navbar"
import { getAllOrders } from "@/actions/orders"
import { OrdersTable } from "@/components/admin/orders-table"

export default async function AdminOrdersPage() {
    const session = await auth()

    if (!session || session.user.role !== "ADMIN") {
        redirect("/")
    }

    const orders = await getAllOrders()

    if ("error" in orders) {
        return <div>Error loading orders</div>
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50">
            <Navbar user={session.user} />

            <main className="container mx-auto px-4 py-8">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold mb-2">Manage Orders</h1>
                    <p className="text-muted-foreground">
                        View and update order statuses
                    </p>
                </div>

                <OrdersTable orders={orders} />
            </main>
        </div>
    )
}
