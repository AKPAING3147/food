"use client"

import { useState } from "react"
import { Plus, Edit, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { DeleteModal } from "@/components/ui/delete-modal"
import { createMenuItem, updateMenuItem, deleteMenuItem } from "@/actions/menu"
import { toast } from "sonner"

interface MenuItem {
    id: string
    name: string
    description: string | null
    price: number
    image: string | null
    available: boolean
    categoryId: string
    category: {
        id: string
        name: string
    }
}

interface Category {
    id: string
    name: string
}

interface MenuManagerProps {
    menuItems: MenuItem[]
    categories: Category[]
}

export function MenuManager({ menuItems, categories }: MenuManagerProps) {
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [editingItem, setEditingItem] = useState<MenuItem | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [isUploading, setIsUploading] = useState(false)
    const [deleteModalOpen, setDeleteModalOpen] = useState(false)
    const [itemToDelete, setItemToDelete] = useState<{ id: string; name: string } | null>(null)

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        image: "",
        categoryId: "",
        available: true,
    })

    const resetForm = () => {
        setFormData({
            name: "",
            description: "",
            price: "",
            image: "",
            categoryId: "",
            available: true,
        })
        setEditingItem(null)
        setIsFormOpen(false)
    }

    const handleEdit = (item: MenuItem) => {
        setEditingItem(item)
        setFormData({
            name: item.name,
            description: item.description || "",
            price: item.price.toString(),
            image: item.image || "",
            categoryId: item.categoryId,
            available: item.available,
        })
        setIsFormOpen(true)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            const data = {
                name: formData.name,
                description: formData.description || undefined,
                price: parseFloat(formData.price),
                image: formData.image || undefined,
                categoryId: formData.categoryId,
                available: formData.available,
            }

            let result
            if (editingItem) {
                result = await updateMenuItem(editingItem.id, data)
            } else {
                result = await createMenuItem(data)
            }

            if (result.error) {
                toast.error(result.error)
            } else {
                toast.success(result.success)
                resetForm()
            }
        } catch (error) {
            toast.error("Something went wrong")
        } finally {
            setIsLoading(false)
        }
    }

    const handleDeleteClick = (id: string, name: string) => {
        setItemToDelete({ id, name })
        setDeleteModalOpen(true)
    }

    const handleDeleteConfirm = async () => {
        if (!itemToDelete) return

        setIsLoading(true)
        try {
            const result = await deleteMenuItem(itemToDelete.id)
            if (result.error) {
                toast.error(result.error)
            } else {
                toast.success(result.success)
                setDeleteModalOpen(false)
                setItemToDelete(null)
            }
        } catch (error) {
            toast.error("Failed to delete item")
        } finally {
            setIsLoading(false)
        }
    }

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        setIsUploading(true)
        try {
            const formData = new FormData()
            formData.append("file", file)

            const response = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            })

            const data = await response.json()

            if (data.url) {
                setFormData(prev => ({ ...prev, image: data.url }))
                toast.success("Image uploaded successfully!")
            } else {
                toast.error(data.error || "Failed to upload image")
            }
        } catch (error) {
            toast.error("Failed to upload image")
        } finally {
            setIsUploading(false)
        }
    }

    return (
        <div className="space-y-6">
            {/* Add New Button */}
            <div className="flex justify-end">
                <Button onClick={() => setIsFormOpen(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Menu Item
                </Button>
            </div>

            {/* Form Modal */}
            {isFormOpen && (
                <Card className="border-2 border-primary">
                    <CardHeader>
                        <CardTitle>
                            {editingItem ? "Edit Menu Item" : "Add New Menu Item"}
                        </CardTitle>
                        <CardDescription>
                            Fill in the details below
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Item Name *
                                </label>
                                <Input
                                    required
                                    value={formData.name}
                                    onChange={(e) =>
                                        setFormData({ ...formData, name: e.target.value })
                                    }
                                    placeholder="Delicious Burger"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Description
                                </label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) =>
                                        setFormData({ ...formData, description: e.target.value })
                                    }
                                    placeholder="A tasty description..."
                                    className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                />
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Price *
                                    </label>
                                    <Input
                                        required
                                        type="number"
                                        step="0.01"
                                        min="0"
                                        value={formData.price}
                                        onChange={(e) =>
                                            setFormData({ ...formData, price: e.target.value })
                                        }
                                        placeholder="9.99"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Category *
                                    </label>
                                    <select
                                        required
                                        value={formData.categoryId}
                                        onChange={(e) =>
                                            setFormData({ ...formData, categoryId: e.target.value })
                                        }
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                    >
                                        <option value="">Select a category</option>
                                        {categories.map((cat) => (
                                            <option key={cat.id} value={cat.id}>
                                                {cat.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Image
                                </label>
                                <div className="space-y-2">
                                    <div className="flex gap-2">
                                        <Input
                                            value={formData.image}
                                            onChange={(e) =>
                                                setFormData({ ...formData, image: e.target.value })
                                            }
                                            placeholder="https://example.com/image.jpg or upload below"
                                            className="flex-1"
                                        />
                                        <Button
                                            type="button"
                                            variant="outline"
                                            disabled={isUploading}
                                            onClick={() => document.getElementById('image-upload')?.click()}
                                        >
                                            {isUploading ? "Uploading..." : "Upload"}
                                        </Button>
                                        <input
                                            id="image-upload"
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageUpload}
                                            className="hidden"
                                            disabled={isUploading}
                                        />
                                    </div>
                                    {formData.image && (
                                        <div className="relative w-32 h-32 border rounded-lg overflow-hidden">
                                            <img
                                                src={formData.image}
                                                alt="Preview"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    id="available"
                                    checked={formData.available}
                                    onChange={(e) =>
                                        setFormData({ ...formData, available: e.target.checked })
                                    }
                                    className="h-4 w-4 rounded border-gray-300"
                                />
                                <label htmlFor="available" className="text-sm font-medium">
                                    Available for order
                                </label>
                            </div>

                            <div className="flex space-x-3">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={resetForm}
                                    className="flex-1"
                                >
                                    Cancel
                                </Button>
                                <Button type="submit" disabled={isLoading} className="flex-1">
                                    {isLoading
                                        ? "Saving..."
                                        : editingItem
                                            ? "Update Item"
                                            : "Add Item"}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            )}

            {/* Menu Items List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {menuItems.map((item) => (
                    <Card key={item.id} className="overflow-hidden">
                        <div className="relative h-40 bg-gradient-to-br from-orange-100 to-orange-200">
                            {item.image ? (
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="flex items-center justify-center h-full text-5xl">
                                    🍽️
                                </div>
                            )}
                            {!item.available && (
                                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                    <span className="text-white font-bold text-lg">
                                        Unavailable
                                    </span>
                                </div>
                            )}
                        </div>
                        <CardHeader>
                            <CardTitle className="text-lg">{item.name}</CardTitle>
                            <CardDescription className="line-clamp-2">
                                {item.description || "No description"}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-2xl font-bold text-primary">
                                    ${item.price.toFixed(2)}
                                </span>
                                <span className="text-sm text-muted-foreground">
                                    {item.category.name}
                                </span>
                            </div>
                            <div className="flex space-x-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleEdit(item)}
                                    className="flex-1"
                                >
                                    <Edit className="h-4 w-4 mr-1" />
                                    Edit
                                </Button>
                                <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => handleDeleteClick(item.id, item.name)}
                                    disabled={isLoading}
                                    className="flex-1"
                                >
                                    <Trash2 className="h-4 w-4 mr-1" />
                                    Delete
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {menuItems.length === 0 && (
                <Card>
                    <CardContent className="text-center py-12">
                        <p className="text-xl text-muted-foreground">
                            No menu items yet. Add your first item!
                        </p>
                    </CardContent>
                </Card>
            )}

            {/* Delete Confirmation Modal */}
            <DeleteModal
                isOpen={deleteModalOpen}
                onClose={() => {
                    setDeleteModalOpen(false)
                    setItemToDelete(null)
                }}
                onConfirm={handleDeleteConfirm}
                title="Delete Menu Item"
                message="Are you sure you want to delete this menu item?"
                itemName={itemToDelete?.name}
                isLoading={isLoading}
            />
        </div>
    )
}
