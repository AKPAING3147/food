import { NextRequest, NextResponse } from "next/server"
import { writeFile } from "fs/promises"
import { join } from "path"

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData()
        const file = formData.get("file") as File

        if (!file) {
            return NextResponse.json({ error: "No file uploaded" }, { status: 400 })
        }

        // Validate file type
        if (!file.type.startsWith("image/")) {
            return NextResponse.json({ error: "File must be an image" }, { status: 400 })
        }

        // Generate unique filename
        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)

        const timestamp = Date.now()
        const filename = `${timestamp}-${file.name.replace(/\s/g, "-")}`
        const path = join(process.cwd(), "public", "uploads", filename)

        await writeFile(path, buffer)

        // Return the public URL
        const imageUrl = `/uploads/${filename}`

        return NextResponse.json({ url: imageUrl }, { status: 200 })
    } catch (error) {
        console.error("Upload error:", error)
        return NextResponse.json({ error: "Failed to upload image" }, { status: 500 })
    }
}
