"use server"

import { db } from "@/lib/db"
import { auth } from "@/lib/auth"
import { revalidatePath } from "next/cache"
import { z } from "zod"

const menuItemSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    description: z.string().optional(),
    price: z.number().positive("Price must be positive"),
    image: z.string().optional(),
    categoryId: z.string(),
    available: z.boolean().default(true),
})

export async function getMenuItems() {
    try {
        const menuItems = await db.menuItem.findMany({
            include: {
                category: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        })

        return menuItems
    } catch (error) {
        console.error("Get menu items error:", error)
        return []
    }
}

export async function getMenuItemsByCategory(categoryId: string) {
    try {
        const menuItems = await db.menuItem.findMany({
            where: {
                categoryId,
                available: true,
            },
            include: {
                category: true,
            },
        })

        return menuItems
    } catch (error) {
        console.error("Get menu items by category error:", error)
        return []
    }
}

export async function createMenuItem(data: z.infer<typeof menuItemSchema>) {
    try {
        const session = await auth()

        if (!session || session.user.role !== "ADMIN") {
            return { error: "Unauthorized" }
        }

        const validatedFields = menuItemSchema.safeParse(data)

        if (!validatedFields.success) {
            return { error: "Invalid fields" }
        }

        await db.menuItem.create({
            data: validatedFields.data,
        })

        revalidatePath("/admin/menu")
        return { success: "Menu item created successfully" }
    } catch (error) {
        console.error("Create menu item error:", error)
        return { error: "Something went wrong" }
    }
}

export async function updateMenuItem(
    id: string,
    data: z.infer<typeof menuItemSchema>
) {
    try {
        const session = await auth()

        if (!session || session.user.role !== "ADMIN") {
            return { error: "Unauthorized" }
        }

        const validatedFields = menuItemSchema.safeParse(data)

        if (!validatedFields.success) {
            return { error: "Invalid fields" }
        }

        await db.menuItem.update({
            where: { id },
            data: validatedFields.data,
        })

        revalidatePath("/admin/menu")
        return { success: "Menu item updated successfully" }
    } catch (error) {
        console.error("Update menu item error:", error)
        return { error: "Something went wrong" }
    }
}

export async function deleteMenuItem(id: string) {
    try {
        const session = await auth()

        if (!session || session.user.role !== "ADMIN") {
            return { error: "Unauthorized" }
        }

        // First, delete related order items
        await db.orderItem.deleteMany({
            where: { menuItemId: id },
        })

        // Then delete the menu item
        await db.menuItem.delete({
            where: { id },
        })

        revalidatePath("/admin/menu")
        revalidatePath("/")
        return { success: "Menu item deleted successfully" }
    } catch (error) {
        console.error("Delete menu item error:", error)
        return { error: "Failed to delete menu item. Please try again." }
    }
}
