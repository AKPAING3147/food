# 🚀 Quick Setup Guide

Follow these steps to get your FoodieGo application running:

## Step 1: Database Setup

The project is currently configured to use **SQLite** for easiest local development.

```bash
# Push the schema to your database
npx prisma db push
```

## Step 2: Seed the Database

> **Note:** The automated seed script represents a known issue with Prisma v7 in some environments. 
> 
> If `npm run db:seed` fails, please **Register** a new account manually in the app.
> After registering, if you need Admin access, you can update your user role in the database.

## Step 3: Run the Development Server

```bash
npm run dev
```

The app will likely start on **http://localhost:3000** or **http://localhost:3001** if 3000 is in use.

## Step 3: Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🎯 What to Try

### As a User:
1. Register a new account or login with: `user@foodiego.com` / `user123`
2. Browse the menu and filter by categories
3. Add items to your cart
4. Place an order
5. View your orders at `/orders`

### As an Admin:
1. Login with: `admin@foodiego.com` / `admin123`
2. Access the admin dashboard at `/admin`
3. Manage menu items at `/admin/menu`
4. Manage categories at `/admin/categories`
5. View and update orders at `/admin/orders`

## 📝 Important Notes

- The database is using Prisma Postgres (local development database)
- All passwords are hashed with bcrypt
- Admin users have full access to management features
- Regular users can only place and view their own orders

## 🔧 Troubleshooting

### Database Connection Issues
If you have database connection issues:
1. Make sure the Prisma Postgres server is running
2. Try running `npx prisma db push` again
3. Check the `DATABASE_URL` in your `.env` file

### Missing Dependencies
If you get module errors:
```bash
npm install
npx prisma generate
```

### Port Already in Use
If port 3000 is in use:
```bash
npm run dev -- -p 3001
```

## 🎨 Customization

- **Colors**: Edit `app/globals.css` to change the color scheme
- **Logo**: Update the emoji in `components/navbar.tsx`
- **Menu Items**: Add more through the admin panel or seed script

Enjoy building with FoodieGo! 🍔
