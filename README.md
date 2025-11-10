# E-Commerce Website

A full-stack e-commerce web application built with React (Vite), TailwindCSS, Express.js, and MongoDB with complete cart persistence.

## 🚀 Features

- 🏠 Product listing with responsive grid layout
- 🔍 Product details page with stock validation
- 🛒 Shopping cart with backend persistence
- ➕ Add/Remove items with server synchronization
- 🔢 Update product quantities with stock validation
- 💰 Real-time total calculation from server
- 📱 Fully responsive design with TailwindCSS
- 💾 Cart persistence across sessions
- 🌐 RESTful API with complete CRUD operations
- ⚡ Fast development with Vite and Axios

## 🛠️ Tech Stack

**Frontend:**
- React 18
- Vite
- React Router DOM
- Context API for state management
- TailwindCSS for styling
- Axios for HTTP requests

**Backend:**
- Node.js
- Express.js
- MongoDB with Mongoose
- Session-based cart storage
- CORS enabled

## 📋 Prerequisites

Before running this project, make sure you have:
- Node.js (v16 or higher)
- npm (v7 or higher)
- MongoDB Atlas account (free tier works fine)

## ⚙️ Installation & Setup

### 1. Clone or Download the Project

Navigate to the project directory:
```bash
cd "E-Commerce Website"
```

### 2. Setup MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account or sign in
3. Create a new cluster (free tier M0)
4. Click "Connect" → "Connect your application"
5. Copy the connection string

### 3. Configure Backend

Navigate to the backend folder:
```bash
cd backend
```

Install dependencies:
```bash
npm install
```

Open the `.env` file in the backend folder and update it with your MongoDB URI:
```env
MONGODB_URI=mongodb+srv://your-username:your-password@your-cluster.mongodb.net/ecommerce?retryWrites=true&w=majority
PORT=5000
```

**Important:** Replace `your-username`, `your-password`, and `your-cluster` with your actual MongoDB Atlas credentials.

### 4. Configure Frontend

Open a new terminal and navigate to the frontend folder:
```bash
cd frontend
```

Install dependencies:
```bash
npm install
```

## 🚀 Running the Application

### Start the Backend Server

In the backend folder:
```bash
npm start
```

The backend server will start on `http://localhost:5000`

### Seed the Database (First Time Only)

You need to populate the database with sample products. You can do this using any API client (Postman, Thunder Client, or curl):

**Using curl (in a new terminal):**
```bash
curl -X POST http://localhost:5000/api/products/seed
```

**Or using PowerShell:**
```powershell
Invoke-WebRequest -Uri http://localhost:5000/api/products/seed -Method POST
```

You should see a success message with the seeded products.

### Start the Frontend

In the frontend folder (in a separate terminal):
```bash
npm run dev
```

The frontend will start on `http://localhost:5173`

Open your browser and navigate to `http://localhost:5173`

## 📁 Project Structure

```
E-Commerce Website/
├── backend/
│   ├── config/
│   │   └── db.js              # MongoDB connection
│   ├── models/
│   │   ├── Product.js         # Product schema
│   │   └── Cart.js            # Cart schema
│   ├── routes/
│   │   ├── products.js        # Product API routes
│   │   └── cart.js            # Cart API routes
│   ├── seed/
│   │   └── seedData.js        # Sample data
│   ├── .env                   # Environment variables
│   ├── server.js              # Express server
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── ProductCard.jsx
│   │   │   ├── CartItem.jsx
│   │   │   └── Footer.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── ProductDetail.jsx
│   │   │   └── Cart.jsx
│   │   ├── context/
│   │   │   └── CartContext.jsx
│   │   ├── api/
│   │   │   └── api.js         # Axios configuration
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css          # TailwindCSS
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
├── docs/
│   ├── technical-architecture.md
│   └── prompts-used.txt
├── README.md
├── QUICKSTART.md
└── .env.example
```

## 🔌 API Endpoints

### Products
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | Get all products |
| GET | `/api/products/:id` | Get single product |
| POST | `/api/products/seed` | Seed database with sample products |

### Cart
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/cart/:sessionId` | Get cart for session |
| POST | `/api/cart/:sessionId` | Add item to cart |
| PUT | `/api/cart/:sessionId/:itemId` | Update item quantity |
| DELETE | `/api/cart/:sessionId/:itemId` | Remove item from cart |
| DELETE | `/api/cart/:sessionId` | Clear entire cart |

## 🎯 Usage

1. **Browse Products:** View all available products on the home page with beautiful TailwindCSS cards
2. **View Details:** Click on any product to see detailed information with image and description
3. **Add to Cart:** Select quantity and add products to your cart (saved in backend)
4. **Manage Cart:** Update quantities or remove items (synced with MongoDB)
5. **View Total:** See the calculated total price from server in real-time
6. **Session Persistence:** Your cart is saved even if you close the browser

## 🐛 Troubleshooting

**Backend won't start:**
- Make sure MongoDB URI is correctly set in `.env`
- Check if port 5000 is available

**Frontend won't connect to backend:**
- Ensure backend is running on port 5000
- Check browser console for CORS errors

**No products showing:**
- Make sure backend is running on port 5000
- Run the seed command to populate database
- Check browser console (F12) for errors
- Verify MongoDB connection is successful

**Database connection error:**
- Verify MongoDB Atlas cluster is running
- Check network access settings in MongoDB Atlas (allow your IP)
- Verify connection string format

## 📝 Development Scripts

**Backend:**
- `npm start` - Start the server (port 5000)
- `npm run dev` - Start with nodemon (auto-reload on changes)

**Frontend:**
- `npm run dev` - Start development server (port 5173)
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 🔒 Security Notes

- The `.env` file is included for demonstration purposes only
- In production, never commit `.env` files to version control
- Use environment variables for all sensitive data
- Implement authentication for seed endpoint in production
- Add rate limiting to prevent API abuse
- Validate all user inputs on the backend
- Use HTTPS in production

## 🎨 Design Features

- **TailwindCSS**: Utility-first CSS framework for rapid UI development
- **Responsive**: Mobile-first design that works on all devices
- **Modern UI**: Clean and professional interface with smooth transitions
- **Loading States**: Skeleton loaders and spinners for better UX
- **Error Handling**: User-friendly error messages and fallbacks

## 📚 Documentation

- **Technical Architecture**: See `/docs/technical-architecture.md` for detailed system design
- **Prompts Used**: Check `/docs/prompts-used.txt` for AI prompts used in development
- **Quick Start**: See `QUICKSTART.md` for a condensed setup guide

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

Created as a demonstration e-commerce application.

---

**Happy Shopping! 🛍️**
