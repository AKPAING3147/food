# 🐘 Neon PostgreSQL Migration Guide

Your FoodieGo app is now configured to use **Neon PostgreSQL** instead of SQLite!

## 🚀 Quick Setup (5 minutes)

### Step 1: Create Neon Account

1. Go to **https://neon.tech**
2. Sign up for FREE (no credit card required)
3. Click **"Create a project"**
4. Choose a project name (e.g., "foodiego")
5. Select a region close to you

### Step 2: Get Connection String

1. After creating the project, you'll see your **connection string**
2. It looks like this:
   ```
   postgresql://username:password@ep-xxx-xxx.us-east-2.aws.neon.tech/neondb?sslmode=require
   ```
3. **Copy this entire string!**

### Step 3: Update .env File

Replace the placeholder in your `.env` file:

```env
# Replace BOTH of these with your Neon connection string:
DATABASE_URL="your_neon_connection_string_here"
DIRECT_URL="your_neon_connection_string_here"
```

**Example:**
```env
DATABASE_URL="postgresql://myuser:mypass@ep-cool-sound-123456.us-east-2.aws.neon.tech/neondb?sslmode=require"
DIRECT_URL="postgresql://myuser:mypass@ep-cool-sound-123456.us-east-2.aws.neon.tech/neondb?sslmode=require"
```

### Step 4: Run Migration Commands

```bash
# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push

# Seed the database
npm run db:seed
```

### Step 5: Restart Dev Server

```bash
# Stop current server (Ctrl+C)
# Start again
npm run dev
```

## ✅ Verify It Works

1. Go to http://localhost:3001
2. Try logging in with:
   - Email: `admin@foodiego.com`
   - Password: `admin123`
3. If you can log in, **it's working!** 🎉

## 🔍 View Your Database

**Neon Console:**
- Go to https://console.neon.tech
- Click on your project
- Go to "Tables" to see your data
- Use the SQL Editor to run queries

**Prisma Studio (Local):**
```bash
npx prisma studio
```
Opens at http://localhost:5555

## 📊 Benefits of Neon PostgreSQL

✅ **Production-Ready** - Real database, not just a file  
✅ **Serverless** - Auto-scales, no server management  
✅ **Free Tier** - 0.5GB storage, 100 hours compute/month  
✅ **Fast** - Optimized for Next.js and Vercel  
✅ **Branching** - Create database branches like Git  
✅ **Backups** - Automatic point-in-time recovery  

## 🆚 SQLite vs PostgreSQL Differences

| Feature | SQLite (Old) | PostgreSQL (New) |
|---------|-------------|------------------|
| **Storage** | Local file | Cloud database |
| **Concurrent Users** | Limited | Unlimited |
| **Production Ready** | ❌ No | ✅ Yes |
| **Deployment** | Hard | Easy |
| **Data Types** | Basic | Advanced |
| **Performance** | Good for dev | Great for prod |

## 🔧 Troubleshooting

### Error: "Can't reach database server"
- Check your connection string is correct
- Make sure you're connected to the internet
- Verify the database exists in Neon console

### Error: "SSL connection required"
- Make sure your connection string ends with `?sslmode=require`

### Error: "Authentication failed"
- Double-check username and password in connection string
- Copy the connection string again from Neon console

### Database is empty after migration
- Run `npm run db:seed` to add sample data
- Check Neon console to verify tables exist

## 🌐 Deployment Ready

Your app is now ready to deploy to:
- **Vercel** (recommended for Next.js)
- **Railway**
- **Render**
- **Fly.io**
- Any platform that supports Next.js

Just add your `DATABASE_URL` to the platform's environment variables!

## 📚 Resources

- [Neon Documentation](https://neon.tech/docs)
- [Neon + Prisma Guide](https://neon.tech/docs/guides/prisma)
- [Neon Console](https://console.neon.tech)

---

**Need Help?** Check the Neon docs or their Discord: https://discord.gg/neon
