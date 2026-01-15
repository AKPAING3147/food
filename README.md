# 🍔 FoodieGo - Full Stack Food Ordering System

A modern, full-stack food ordering system built with Next.js 15, PostgreSQL, Prisma, and NextAuth.

## ✨ Features

### User Features
- 🔐 User authentication (register/login)
- 🍽️ Browse menu items by categories
- 🛒 Shopping cart functionality
- 📦 Place and track orders
- 📱 Responsive design
- ⚡ Real-time order status updates

### Admin Features
- 📊 Dashboard with statistics
- 📋 Order management with status updates
- 🍕 Menu item CRUD operations
- 📁 Category management
- 👥 View all users and orders

## 🛠️ Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Authentication:** NextAuth v5 (Beta)
- **Styling:** Tailwind CSS
- **UI Components:** Custom components with Radix UI patterns
- **Form Validation:** Zod
- **Icons:** Lucide React

## 📋 Prerequisites

- Node.js 18+ installed
- PostgreSQL database (local or remote)
- npm or yarn package manager

## 🚀 Getting Started

### 1. Clone and Install Dependencies

```bash
cd c:\Users\aungk\Desktop\Next\food
npm install
```

### 2. Set Up Environment Variables

The `.env` file has been created. Update it with your database credentials:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/foodie_go?schema=public"
AUTH_SECRET="your-secret-key-change-this-in-production"
AUTH_URL="http://localhost:3000"
```

**Generate a secure AUTH_SECRET:**
```bash
openssl rand -base64 32
```

### 3. Set Up the Database

```bash
# Generate Prisma Client
npx prisma generate

# Run database migrations
npx prisma migrate dev --name init

# (Optional) Open Prisma Studio to view your database
npx prisma studio
```

### 4. Create an Admin User

You'll need to create an admin user manually in the database. You can do this through Prisma Studio or by running a script.

**Option 1: Using Prisma Studio**
1. Run `npx prisma studio`
2. Go to the User table
3. Create a new user with `role: ADMIN`

**Option 2: Create a seed script**
Create a file `prisma/seed.ts` and run it to create sample data.

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
food/
├── app/                      # Next.js app directory
│   ├── admin/               # Admin pages
│   │   ├── categories/      # Category management
│   │   ├── menu/           # Menu management
│   │   └── orders/         # Order management
│   ├── api/                # API routes
│   │   └── auth/           # NextAuth endpoints
│   ├── login/              # Login page
│   ├── register/           # Registration page
│   ├── orders/             # User orders page
│   └── page.tsx            # Home page (menu)
├── actions/                # Server actions
│   ├── auth.ts            # Authentication actions
│   ├── categories.ts      # Category actions
│   ├── menu.ts            # Menu item actions
│   └── orders.ts          # Order actions
├── components/             # React components
│   ├── admin/             # Admin-specific components
│   ├── ui/                # Reusable UI components
│   ├── cart-modal.tsx     # Shopping cart modal
│   ├── menu-grid.tsx      # Menu display grid
│   └── navbar.tsx         # Navigation bar
├── lib/                    # Utility libraries
│   ├── auth.ts            # NextAuth configuration
│   └── db.ts              # Prisma client instance
├── prisma/                 # Prisma schema and migrations
│   └── schema.prisma      # Database schema
└── types/                  # TypeScript type definitions

```

## 🔑 Default User Roles

- **USER**: Can browse menu, place orders, view their orders
- **ADMIN**: Full access to admin dashboard, can manage menu, categories, and orders

## 🎨 Design Features

- Premium gradient design system
- Smooth animations and transitions
- Glass morphism effects
- Custom scrollbar styling
- Responsive layout for all devices
- Inter font family for modern typography

## 📝 API Routes

### Authentication
- `POST /api/auth/signin` - User login
- `POST /api/auth/signout` - User logout

### Server Actions
- User registration
- Menu item CRUD
- Category CRUD
- Order creation and management
- Order status updates (admin only)

## 🔒 Security Features

- Password hashing with bcrypt
- JWT-based authentication
- Role-based access control
- Protected admin routes
- Server-side validation with Zod

## 🚢 Deployment

### Database Setup
1. Create a PostgreSQL database on your hosting provider (Neon, Supabase, Railway, etc.)
2. Update `DATABASE_URL` in your environment variables
3. Run migrations: `npx prisma migrate deploy`

### Deploy to Vercel
1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy!

## 📄 License

MIT License - feel free to use this project for learning or commercial purposes.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

For issues or questions, please open an issue on GitHub.

---

Built with ❤️ using Next.js and PostgreSQL
