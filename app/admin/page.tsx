import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"
import { Navbar } from "@/components/navbar"
import { getOrderStats } from "@/actions/orders"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, ShoppingBag, Clock, Users } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default async function AdminDashboard() {
    const session = await auth()

    if (!session || session.user.role !== "ADMIN") {
        redirect("/")
    }

    const stats = await getOrderStats()

    if (!stats || "error" in stats) {
        return <div>Error loading stats</div>
    }

    const statCards = [
        {
            title: "Total Revenue",
            value: `$${stats.totalRevenue.toFixed(2)}`,
            icon: <DollarSign className="h-8 w-8" />,
            color: "text-green-600",
            bgColor: "bg-green-100",
        },
        {
            title: "Total Orders",
            value: stats.totalOrders.toString(),
            icon: <ShoppingBag className="h-8 w-8" />,
            color: "text-blue-600",
            bgColor: "bg-blue-100",
        },
        {
            title: "Pending Orders",
            value: stats.pendingOrders.toString(),
            icon: <Clock className="h-8 w-8" />,
            color: "text-yellow-600",
            bgColor: "bg-yellow-100",
        },
        {
            title: "Total Users",
            value: stats.totalUsers.toString(),
            icon: <Users className="h-8 w-8" />,
            color: "text-purple-600",
            bgColor: "bg-purple-100",
        },
    ]

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50">
            <Navbar user={session.user} />

            <main className="container mx-auto px-4 py-8">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
                    <p className="text-muted-foreground">
                        Manage your food ordering system
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {statCards.map((stat, index) => (
                        <Card
                            key={index}
                            className="overflow-hidden hover:shadow-lg transition-all animate-scale-in"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-sm font-medium text-muted-foreground">
                                    {stat.title}
                                </CardTitle>
                                <div className={`${stat.bgColor} ${stat.color} p-2 rounded-lg`}>
                                    {stat.icon}
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold">{stat.value}</div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Quick Actions */}
                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle>Quick Actions</CardTitle>
                        <CardDescription>Manage your restaurant</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <Link href="/admin/orders">
                                <Button variant="outline" className="w-full h-24 text-lg">
                                    <div className="flex flex-col items-center space-y-2">
                                        <ShoppingBag className="h-8 w-8" />
                                        <span>Manage Orders</span>
                                    </div>
                                </Button>
                            </Link>
                            <Link href="/admin/menu">
                                <Button variant="outline" className="w-full h-24 text-lg">
                                    <div className="flex flex-col items-center space-y-2">
                                        <span className="text-3xl">🍽️</span>
                                        <span>Manage Menu</span>
                                    </div>
                                </Button>
                            </Link>
                            <Link href="/admin/categories">
                                <Button variant="outline" className="w-full h-24 text-lg">
                                    <div className="flex flex-col items-center space-y-2">
                                        <span className="text-3xl">📁</span>
                                        <span>Manage Categories</span>
                                    </div>
                                </Button>
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </main>
        </div>
    )
}
