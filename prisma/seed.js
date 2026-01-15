require('dotenv').config()
const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
    console.log('🌱 Starting database seed...')

    // Clear existing data
    await prisma.orderItem.deleteMany()
    await prisma.order.deleteMany()
    await prisma.menuItem.deleteMany()
    await prisma.category.deleteMany()
    await prisma.user.deleteMany()

    console.log('✅ Cleared existing data')

    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 10)

    const admin = await prisma.user.create({
        data: {
            email: 'admin@foodiego.com',
            name: 'Admin User',
            password: hashedPassword,
            role: 'ADMIN',
            phone: '+1234567890',
            address: '123 Admin Street',
        },
    })

    console.log('✅ Created admin user:', admin.email)

    // Create regular user
    const userPassword = await bcrypt.hash('user123', 10)

    const user = await prisma.user.create({
        data: {
            email: 'user@foodiego.com',
            name: 'Test User',
            password: userPassword,
            role: 'USER',
            phone: '+0987654321',
            address: '456 User Avenue',
        },
    })

    console.log('✅ Created test user:', user.email)

    // Create categories
    const burgers = await prisma.category.create({
        data: {
            name: 'Burgers',
            description: 'Delicious burgers made with fresh ingredients',
        },
    })

    const pizza = await prisma.category.create({
        data: {
            name: 'Pizza',
            description: 'Hand-tossed pizzas with premium toppings',
        },
    })

    const drinks = await prisma.category.create({
        data: {
            name: 'Drinks',
            description: 'Refreshing beverages',
        },
    })

    const desserts = await prisma.category.create({
        data: {
            name: 'Desserts',
            description: 'Sweet treats to end your meal',
        },
    })

    console.log('✅ Created categories')

    // Create menu items
    await prisma.menuItem.createMany({
        data: [
            // Burgers
            {
                name: 'Classic Burger',
                description: 'Beef patty with lettuce, tomato, and special sauce',
                price: 8.99,
                categoryId: burgers.id,
                available: true,
            },
            {
                name: 'Cheese Burger',
                description: 'Classic burger with melted cheddar cheese',
                price: 9.99,
                categoryId: burgers.id,
                available: true,
            },
            {
                name: 'Bacon Burger',
                description: 'Loaded with crispy bacon and BBQ sauce',
                price: 11.99,
                categoryId: burgers.id,
                available: true,
            },
            // Pizza
            {
                name: 'Margherita Pizza',
                description: 'Fresh mozzarella, tomato sauce, and basil',
                price: 12.99,
                categoryId: pizza.id,
                available: true,
            },
            {
                name: 'Pepperoni Pizza',
                description: 'Classic pepperoni with mozzarella cheese',
                price: 14.99,
                categoryId: pizza.id,
                available: true,
            },
            {
                name: 'Veggie Supreme',
                description: 'Loaded with fresh vegetables',
                price: 13.99,
                categoryId: pizza.id,
                available: true,
            },
            // Drinks
            {
                name: 'Coca Cola',
                description: 'Classic refreshing cola',
                price: 2.99,
                categoryId: drinks.id,
                available: true,
            },
            {
                name: 'Fresh Lemonade',
                description: 'Homemade lemonade with real lemons',
                price: 3.99,
                categoryId: drinks.id,
                available: true,
            },
            // Desserts
            {
                name: 'Chocolate Cake',
                description: 'Rich chocolate cake with fudge frosting',
                price: 5.99,
                categoryId: desserts.id,
                available: true,
            },
            {
                name: 'Ice Cream Sundae',
                description: 'Vanilla ice cream with toppings',
                price: 4.99,
                categoryId: desserts.id,
                available: true,
            },
        ],
    })

    console.log('✅ Created menu items')
    console.log('\n🎉 Database seeded successfully!')
    console.log('\n📝 Login credentials:')
    console.log('Admin: admin@foodiego.com / admin123')
    console.log('User: user@foodiego.com / user123')
}

main()
    .catch((e) => {
        console.error('❌ Error seeding database:', e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
