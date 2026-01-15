"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ShoppingCart, User, LogOut, LayoutDashboard, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { logout } from "@/actions/logout"
import { useState } from "react"

interface NavbarProps {
    user?: {
        name?: string | null
        email?: string | null
        role?: string
    } | null
}

export function Navbar({ user }: NavbarProps) {
    const pathname = usePathname()
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    const isActive = (path: string) => pathname === path

    const navLinks = [
        { href: "/", label: "Menu", show: true },
        { href: "/orders", label: "My Orders", show: !!user },
        { href: "/admin", label: "Admin", show: user?.role === "ADMIN", icon: LayoutDashboard },
    ]

    return (
        <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                {/* Logo */}
                <Link href="/" className="flex items-center space-x-2">
                    <div className="h-10 w-10 rounded-lg flex items-center justify-center overflow-hidden">
                        <img
                            src="/images/icon.png"
                            alt="FoodieGo Logo"
                            className="w-full h-full object-contain"
                        />
                    </div>
                    <span className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent hidden sm:inline">
                        FoodieGo
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center space-x-6">
                    {navLinks.map((link) =>
                        link.show && (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`flex items-center space-x-1 text-sm font-medium transition-colors hover:text-primary ${isActive(link.href) || (link.href === "/admin" && pathname.startsWith("/admin"))
                                    ? "text-primary"
                                    : "text-muted-foreground"
                                    }`}
                            >
                                {link.icon && <link.icon className="h-4 w-4" />}
                                <span>{link.label}</span>
                            </Link>
                        )
                    )}
                </div>

                {/* Desktop Auth Section */}
                <div className="hidden md:flex items-center space-x-4">
                    {user ? (
                        <>
                            <div className="flex items-center space-x-2">
                                <User className="h-4 w-4" />
                                <span className="text-sm font-medium">{user.name}</span>
                            </div>
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => logout()}
                            >
                                <LogOut className="h-4 w-4 mr-2" />
                                Logout
                            </Button>
                        </>
                    ) : (
                        <div className="flex items-center space-x-2">
                            <Link href="/login">
                                <Button variant="ghost" size="sm">
                                    Login
                                </Button>
                            </Link>
                            <Link href="/register">
                                <Button size="sm">Register</Button>
                            </Link>
                        </div>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden p-2 hover:bg-accent rounded-lg transition-colors"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? (
                        <X className="h-6 w-6" />
                    ) : (
                        <Menu className="h-6 w-6" />
                    )}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden border-t bg-background animate-slide-up">
                    <div className="container mx-auto px-4 py-4 space-y-4">
                        {/* Mobile Navigation Links */}
                        <div className="space-y-2">
                            {navLinks.map((link) =>
                                link.show && (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition-colors ${isActive(link.href) || (link.href === "/admin" && pathname.startsWith("/admin"))
                                            ? "bg-orange-50 text-orange-600 font-semibold"
                                            : "hover:bg-gray-100 text-gray-700"
                                            }`}
                                    >
                                        {link.icon && <link.icon className="h-5 w-5" />}
                                        <span>{link.label}</span>
                                    </Link>
                                )
                            )}
                        </div>

                        {/* Mobile Auth Section */}
                        <div className="pt-4 border-t space-y-2">
                            {user ? (
                                <>
                                    <div className="flex items-center space-x-2 px-4 py-2 bg-gray-50 rounded-lg">
                                        <User className="h-5 w-5 text-gray-600" />
                                        <div>
                                            <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                                            <p className="text-xs text-gray-600">{user.email}</p>
                                        </div>
                                    </div>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        className="w-full justify-start"
                                        onClick={() => {
                                            logout()
                                            setIsMobileMenuOpen(false)
                                        }}
                                    >
                                        <LogOut className="h-4 w-4 mr-2" />
                                        Logout
                                    </Button>
                                </>
                            ) : (
                                <div className="space-y-2">
                                    <Link href="/login" className="block" onClick={() => setIsMobileMenuOpen(false)}>
                                        <Button variant="outline" className="w-full">
                                            Login
                                        </Button>
                                    </Link>
                                    <Link href="/register" className="block" onClick={() => setIsMobileMenuOpen(false)}>
                                        <Button className="w-full bg-gradient-to-r from-orange-500 to-orange-600">
                                            Register
                                        </Button>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </nav>
    )
}
