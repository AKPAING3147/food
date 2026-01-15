import { auth } from "@/lib/auth"
import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { MenuGrid } from "@/components/menu-grid"
import { Footer } from "@/components/footer"
import { getCategories } from "@/actions/categories"
import { getMenuItems } from "@/actions/menu"

export default async function Home() {
  const session = await auth()
  const categories = await getCategories()
  const menuItems = await getMenuItems()

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar user={session?.user} />
      <Hero />
      <main id="menu" className="flex-1 bg-gradient-to-br from-orange-50 via-white to-orange-50">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              Our <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">Menu</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Explore our delicious selection of freshly prepared meals, made with the finest ingredients
            </p>
          </div>
          <MenuGrid categories={categories} menuItems={menuItems} />
        </div>
      </main>
      <Footer />
    </div>
  )
}
