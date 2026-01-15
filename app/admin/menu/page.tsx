import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"
import { Navbar } from "@/components/navbar"
import { getMenuItems } from "@/actions/menu"
import { getCategories } from "@/actions/categories"
import { MenuManager } from "@/components/admin/menu-manager"

export default async function AdminMenuPage() {
    const session = await auth()

    if (!session || session.user.role !== "ADMIN") {
        redirect("/")
    }

    const menuItems = await getMenuItems()
    const categories = await getCategories()

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50">
            <Navbar user={session.user} />

            <main className="container mx-auto px-4 py-8">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold mb-2">Manage Menu</h1>
                    <p className="text-muted-foreground">
                        Add, edit, and remove menu items
                    </p>
                </div>

                <MenuManager menuItems={menuItems} categories={categories} />
            </main>
        </div>
    )
}
