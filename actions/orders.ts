"use server"

import { db } from "@/lib/db"
import { auth } from "@/lib/auth"
import { revalidatePath } from "next/cache"
import { z } from "zod"
import { OrderStatus } from "@prisma/client"

const orderItemSchema = z.object({
    menuItemId: z.string(),
    quantity: z.number().positive(),
    price: z.number().positive(),
})

const orderSchema = z.object({
    customerName: z.string().min(2),
    customerPhone: z.string().min(10),
    customerAddress: z.string().min(5),
    notes: z.string().optional(),
    items: z.array(orderItemSchema).min(1),
})

export async function createOrder(data: z.infer<typeof orderSchema>) {
    try {
        const session = await auth()

        if (!session) {
            return { error: "Unauthorized" }
        }

        const validatedFields = orderSchema.safeParse(data)

        if (!validatedFields.success) {
            return { error: "Invalid fields" }
        }

        const { customerName, customerPhone, customerAddress, notes, items } =
            validatedFields.data

        const totalAmount = items.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
        )

        const orderNumber = `ORD-${Date.now()}`

        const order = await db.order.create({
            data: {
                orderNumber,
                userId: session.user.id,
                customerName,
                customerPhone,
                customerAddress,
                notes,
                totalAmount,
                orderItems: {
                    create: items.map((item) => ({
                        menuItemId: item.menuItemId,
                        quantity: item.quantity,
                        price: item.price,
                    })),
                },
            },
            include: {
                orderItems: {
                    include: {
                        menuItem: true,
                    },
                },
            },
        })

        revalidatePath("/orders")
        return { success: "Order created successfully", order }
    } catch (error) {
        console.error("Create order error:", error)
        return { error: "Something went wrong" }
    }
}

export async function getOrders() {
    try {
        const session = await auth()

        if (!session) {
            return []
        }

        const orders = await db.order.findMany({
            where: {
                userId: session.user.id,
            },
            include: {
                orderItems: {
                    include: {
                        menuItem: true,
                    },
                },
            },
            orderBy: {
                createdAt: "desc",
            },
        })

        return orders
    } catch (error) {
        console.error("Get orders error:", error)
        return []
    }
}

export async function getAllOrders() {
    try {
        const session = await auth()

        if (!session || session.user.role !== "ADMIN") {
            return { error: "Unauthorized" }
        }

        const orders = await db.order.findMany({
            include: {
                user: {
                    select: {
                        name: true,
                        email: true,
                    },
                },
                orderItems: {
                    include: {
                        menuItem: true,
                    },
                },
            },
            orderBy: {
                createdAt: "desc",
            },
        })

        return orders
    } catch (error) {
        console.error("Get all orders error:", error)
        return []
    }
}

export async function updateOrderStatus(id: string, status: OrderStatus) {
    try {
        const session = await auth()

        if (!session || session.user.role !== "ADMIN") {
            return { error: "Unauthorized" }
        }

        await db.order.update({
            where: { id },
            data: { status },
        })

        revalidatePath("/admin/orders")
        return { success: "Order status updated successfully" }
    } catch (error) {
        console.error("Update order status error:", error)
        return { error: "Something went wrong" }
    }
}

export async function getOrderStats() {
    try {
        const session = await auth()

        if (!session || session.user.role !== "ADMIN") {
            return { error: "Unauthorized" }
        }

        const totalOrders = await db.order.count()
        const pendingOrders = await db.order.count({
            where: { status: "PENDING" },
        })
        const totalRevenue = await db.order.aggregate({
            _sum: {
                totalAmount: true,
            },
        })
        const totalUsers = await db.user.count()

        return {
            totalOrders,
            pendingOrders,
            totalRevenue: totalRevenue._sum.totalAmount || 0,
            totalUsers,
        }
    } catch (error) {
        console.error("Get order stats error:", error)
        return null
    }
}
