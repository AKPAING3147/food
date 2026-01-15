"use server"

import { db } from "@/lib/db"
import { auth } from "@/lib/auth"
import { revalidatePath } from "next/cache"
import { z } from "zod"

const categorySchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    description: z.string().optional(),
    image: z.string().optional(),
})

export async function getCategories() {
    try {
        const categories = await db.category.findMany({
            include: {
                _count: {
                    select: { menuItems: true },
                },
            },
            orderBy: {
                name: "asc",
            },
        })

        return categories
    } catch (error) {
        console.error("Get categories error:", error)
        return []
    }
}

export async function createCategory(data: z.infer<typeof categorySchema>) {
    try {
        const session = await auth()

        if (!session || session.user.role !== "ADMIN") {
            return { error: "Unauthorized" }
        }

        const validatedFields = categorySchema.safeParse(data)

        if (!validatedFields.success) {
            return { error: "Invalid fields" }
        }

        await db.category.create({
            data: validatedFields.data,
        })

        revalidatePath("/admin/categories")
        return { success: "Category created successfully" }
    } catch (error) {
        console.error("Create category error:", error)
        return { error: "Something went wrong" }
    }
}

export async function updateCategory(
    id: string,
    data: z.infer<typeof categorySchema>
) {
    try {
        const session = await auth()

        if (!session || session.user.role !== "ADMIN") {
            return { error: "Unauthorized" }
        }

        const validatedFields = categorySchema.safeParse(data)

        if (!validatedFields.success) {
            return { error: "Invalid fields" }
        }

        await db.category.update({
            where: { id },
            data: validatedFields.data,
        })

        revalidatePath("/admin/categories")
        return { success: "Category updated successfully" }
    } catch (error) {
        console.error("Update category error:", error)
        return { error: "Something went wrong" }
    }
}

export async function deleteCategory(id: string) {
    try {
        const session = await auth()

        if (!session || session.user.role !== "ADMIN") {
            return { error: "Unauthorized" }
        }

        // Get all menu items in this category
        const menuItems = await db.menuItem.findMany({
            where: { categoryId: id },
            select: { id: true },
        })

        // Delete all order items that reference these menu items
        if (menuItems.length > 0) {
            await db.orderItem.deleteMany({
                where: {
                    menuItemId: {
                        in: menuItems.map(item => item.id),
                    },
                },
            })
        }

        // Delete the category (this will cascade delete menu items)
        await db.category.delete({
            where: { id },
        })

        revalidatePath("/admin/categories")
        revalidatePath("/admin/menu")
        revalidatePath("/")
        return { success: "Category deleted successfully" }
    } catch (error) {
        console.error("Delete category error:", error)
        return { error: "Failed to delete category. Please try again." }
    }
}
