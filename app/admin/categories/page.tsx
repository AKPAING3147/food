import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"
import { Navbar } from "@/components/navbar"
import { getCategories } from "@/actions/categories"
import { CategoryManager } from "@/components/admin/category-manager"

export default async function AdminCategoriesPage() {
    const session = await auth()

    if (!session || session.user.role !== "ADMIN") {
        redirect("/")
    }

    const categories = await getCategories()

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50">
            <Navbar user={session.user} />

            <main className="container mx-auto px-4 py-8">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold mb-2">Manage Categories</h1>
                    <p className="text-muted-foreground">
                        Organize your menu items into categories
                    </p>
                </div>

                <CategoryManager categories={categories} />
            </main>
        </div>
    )
}
