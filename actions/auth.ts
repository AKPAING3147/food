"use server"

import { db } from "@/lib/db"
import bcrypt from "bcryptjs"
import { z } from "zod"

const registerSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    phone: z.string().optional(),
    address: z.string().optional(),
})

export async function registerUser(data: z.infer<typeof registerSchema>) {
    try {
        const validatedFields = registerSchema.safeParse(data)

        if (!validatedFields.success) {
            return { error: "Invalid fields" }
        }

        const { name, email, password, phone, address } = validatedFields.data

        const existingUser = await db.user.findUnique({
            where: { email },
        })

        if (existingUser) {
            return { error: "Email already exists" }
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        await db.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                phone,
                address,
            },
        })

        return { success: "User created successfully" }
    } catch (error) {
        console.error("Registration error:", error)
        return { error: "Something went wrong" }
    }
}

export async function getUserById(id: string) {
    try {
        const user = await db.user.findUnique({
            where: { id },
            select: {
                id: true,
                name: true,
                email: true,
                phone: true,
                address: true,
                role: true,
            },
        })

        return user
    } catch (error) {
        console.error("Get user error:", error)
        return null
    }
}
