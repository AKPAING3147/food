# Clean Prisma and Restart Script
Write-Host "🔧 Cleaning Prisma files..." -ForegroundColor Cyan

# Step 1: Kill all Node processes
Write-Host "1. Stopping all Node processes..." -ForegroundColor Yellow
Get-Process node -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue
Start-Sleep -Seconds 2

# Step 2: Delete .prisma folder
Write-Host "2. Deleting .prisma folder..." -ForegroundColor Yellow
$prismaPath = "node_modules\.prisma"
if (Test-Path $prismaPath) {
    Remove-Item -Recurse -Force $prismaPath -ErrorAction SilentlyContinue
    Start-Sleep -Seconds 1
}

# Step 3: Delete .next folder (build cache)
Write-Host "3. Deleting .next folder..." -ForegroundColor Yellow
$nextPath = ".next"
if (Test-Path $nextPath) {
    Remove-Item -Recurse -Force $nextPath -ErrorAction SilentlyContinue
    Start-Sleep -Seconds 1
}

# Step 4: Generate Prisma client
Write-Host "4. Generating Prisma client..." -ForegroundColor Yellow
npx prisma generate

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Prisma client generated successfully!" -ForegroundColor Green
    
    # Ask if user wants to push to database
    Write-Host "`n📊 Next steps:" -ForegroundColor Cyan
    Write-Host "1. Make sure you've added your Neon connection string to .env"
    Write-Host "2. Run: npx prisma db push"
    Write-Host "3. Run: npm run db:seed"
    Write-Host "4. Run: npm run dev"
} else {
    Write-Host "❌ Failed to generate Prisma client" -ForegroundColor Red
    Write-Host "Try restarting your computer and running this script again" -ForegroundColor Yellow
}
