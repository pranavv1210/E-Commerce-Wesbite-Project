# 🚀 Quick Start Guide

## Step-by-Step Setup (5 minutes)

### 1️⃣ Setup MongoDB Atlas
1. Visit https://www.mongodb.com/cloud/atlas
2. Sign up/Login (free)
3. Create a new cluster (M0 Free tier)
4. Go to Database Access → Add New Database User
   - Create username and password
5. Go to Network Access → Add IP Address → Allow Access from Anywhere (0.0.0.0/0)
6. Click "Connect" → "Connect your application" → Copy connection string

### 2️⃣ Configure Backend
```powershell
cd backend
```

Edit `backend\.env` file:
```
MONGODB_URI=mongodb+srv://USERNAME:PASSWORD@cluster0.xxxxx.mongodb.net/ecommerce?retryWrites=true&w=majority
PORT=5000
```
Replace USERNAME, PASSWORD, and cluster address with your actual values.

Install dependencies:
```powershell
npm install
```

### 3️⃣ Configure Frontend
Open a NEW terminal:
```powershell
cd frontend
npm install
```

**Note:** This will install React, Vite, TailwindCSS, Axios, and all dependencies.

### 4️⃣ Start Backend
In the backend terminal:
```powershell
npm start
```
✅ You should see: "Server running on port 5000" and "MongoDB Connected"

### 5️⃣ Seed Database (One-time)
In a NEW terminal or PowerShell:
```powershell
Invoke-WebRequest -Uri http://localhost:5000/api/products/seed -Method POST
```
✅ You should see JSON response with products

### 6️⃣ Start Frontend
In the frontend terminal:
```powershell
npm run dev
```
✅ You should see: "Local: http://localhost:5173/"

### 7️⃣ Open in Browser
Navigate to: **http://localhost:5173**

🎉 **Done! Your e-commerce site is running!**

---

## Quick Commands Reference

**Backend (Terminal 1):**
```powershell
cd backend
npm install          # First time only
npm start           # Start server
```

**Frontend (Terminal 2):**
```powershell
cd frontend
npm install          # First time only
npm run dev         # Start dev server
```

**Seed Database (One time):**
```powershell
Invoke-WebRequest -Uri http://localhost:5000/api/products/seed -Method POST
```

---

## Troubleshooting

**Problem:** "MongoDB connection error"
- ✅ Check internet connection
- ✅ Verify MongoDB URI in .env is correct
- ✅ Ensure IP whitelist includes your IP or 0.0.0.0/0

**Problem:** "No products showing"
- ✅ Make sure backend is running
- ✅ Run the seed command
- ✅ Check browser console (F12) for errors

**Problem:** "Port already in use"
- ✅ Close other apps using port 5000 or 5173
- ✅ Or change PORT in backend .env

**Problem:** Frontend can't connect to backend
- ✅ Ensure backend is running on http://localhost:5000
- ✅ Check CORS is enabled (already configured)

---

## Test the Application

### ✅ Frontend Features
1. Homepage loads with product grid (TailwindCSS styled)
2. Click a product → see detailed view
3. Add to cart → cart count badge updates
4. Go to cart → see items with update/remove controls
5. Update quantity → total recalculates from server
6. Remove item → cart updates instantly
7. Refresh page → cart persists (stored in MongoDB)

### ✅ Backend Features
1. Products API serving data from MongoDB
2. Cart API storing cart in database
3. Session-based cart management
4. Stock validation on add/update
5. Automatic total calculation

### ✅ Check These Work
- Responsive design on mobile/tablet/desktop
- Loading spinners when fetching data
- Error messages when backend is offline
- Cart badge shows correct count
- Total price matches item calculations

---

**Need help?** Check the full README.md or technical-architecture.md in /docs
