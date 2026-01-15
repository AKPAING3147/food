"use client"

import { useState } from "react"
import { Plus, Edit, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { DeleteModal } from "@/components/ui/delete-modal"
import { createCategory, updateCategory, deleteCategory } from "@/actions/categories"
import { toast } from "sonner"

interface Category {
    id: string
    name: string
    description: string | null
    image: string | null
    _count: {
        menuItems: number
    }
}

interface CategoryManagerProps {
    categories: Category[]
}

export function CategoryManager({ categories }: CategoryManagerProps) {
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [editingCategory, setEditingCategory] = useState<Category | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [deleteModalOpen, setDeleteModalOpen] = useState(false)
    const [categoryToDelete, setCategoryToDelete] = useState<{ id: string; name: string; itemCount: number } | null>(null)

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        image: "",
    })

    const resetForm = () => {
        setFormData({
            name: "",
            description: "",
            image: "",
        })
        setEditingCategory(null)
        setIsFormOpen(false)
    }

    const handleEdit = (category: Category) => {
        setEditingCategory(category)
        setFormData({
            name: category.name,
            description: category.description || "",
            image: category.image || "",
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
                image: formData.image || undefined,
            }

            let result
            if (editingCategory) {
                result = await updateCategory(editingCategory.id, data)
            } else {
                result = await createCategory(data)
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

    const handleDeleteClick = (id: string, name: string, itemCount: number) => {
        if (itemCount > 0) {
            toast.error("Cannot delete category with menu items. Please remove all items first.")
            return
        }
        setCategoryToDelete({ id, name, itemCount })
        setDeleteModalOpen(true)
    }

    const handleDeleteConfirm = async () => {
        if (!categoryToDelete) return

        setIsLoading(true)
        try {
            const result = await deleteCategory(categoryToDelete.id)
            if (result.error) {
                toast.error(result.error)
            } else {
                toast.success(result.success)
                setDeleteModalOpen(false)
                setCategoryToDelete(null)
            }
        } catch (error) {
            toast.error("Failed to delete category")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="space-y-6">
            {/* Add New Button */}
            <div className="flex justify-end">
                <Button onClick={() => setIsFormOpen(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Category
                </Button>
            </div>

            {/* Form Modal */}
            {isFormOpen && (
                <Card className="border-2 border-primary">
                    <CardHeader>
                        <CardTitle>
                            {editingCategory ? "Edit Category" : "Add New Category"}
                        </CardTitle>
                        <CardDescription>
                            Fill in the details below
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Category Name *
                                </label>
                                <Input
                                    required
                                    value={formData.name}
                                    onChange={(e) =>
                                        setFormData({ ...formData, name: e.target.value })
                                    }
                                    placeholder="Burgers"
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
                                    placeholder="Category description..."
                                    className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Image URL
                                </label>
                                <Input
                                    value={formData.image}
                                    onChange={(e) =>
                                        setFormData({ ...formData, image: e.target.value })
                                    }
                                    placeholder="https://example.com/image.jpg"
                                />
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
                                        : editingCategory
                                            ? "Update Category"
                                            : "Add Category"}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            )}

            {/* Categories List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.map((category) => (
                    <Card key={category.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                        <div className="relative h-32 bg-gradient-to-br from-orange-100 to-orange-200">
                            {category.image ? (
                                <img
                                    src={category.image}
                                    alt={category.name}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="flex items-center justify-center h-full text-5xl">
                                    📁
                                </div>
                            )}
                        </div>
                        <CardHeader>
                            <CardTitle className="flex items-center justify-between">
                                <span>{category.name}</span>
                                <span className="text-sm font-normal text-muted-foreground">
                                    {category._count.menuItems} items
                                </span>
                            </CardTitle>
                            <CardDescription className="line-clamp-2">
                                {category.description || "No description"}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex space-x-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleEdit(category)}
                                    className="flex-1"
                                >
                                    <Edit className="h-4 w-4 mr-1" />
                                    Edit
                                </Button>
                                <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => handleDeleteClick(category.id, category.name, category._count.menuItems)}
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

            {categories.length === 0 && (
                <Card>
                    <CardContent className="text-center py-12">
                        <p className="text-xl text-muted-foreground">
                            No categories yet. Add your first category!
                        </p>
                    </CardContent>
                </Card>
            )}

            {/* Delete Confirmation Modal */}
            <DeleteModal
                isOpen={deleteModalOpen}
                onClose={() => {
                    setDeleteModalOpen(false)
                    setCategoryToDelete(null)
                }}
                onConfirm={handleDeleteConfirm}
                title="Delete Category"
                message="Are you sure you want to delete this category?"
                itemName={categoryToDelete?.name}
                isLoading={isLoading}
            />
        </div>
    )
}
