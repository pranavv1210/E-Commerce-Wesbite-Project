# Technical Architecture - E-Commerce Website

## 📁 Project Structure

```
E-Commerce Website/
├── backend/
│   ├── models/
│   │   ├── Product.js          # MongoDB Product schema
│   │   └── Cart.js             # MongoDB Cart schema (NEW)
│   ├── routes/
│   │   ├── products.js         # Product API routes
│   │   └── cart.js             # Cart API routes (NEW)
│   ├── config/
│   │   └── db.js               # MongoDB connection
│   ├── seed/
│   │   └── seedData.js         # Sample product data
│   ├── server.js               # Express server entry point
│   ├── package.json
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx      # Navigation bar
│   │   │   ├── ProductCard.jsx # Product display card
│   │   │   ├── CartItem.jsx    # Cart item component
│   │   │   └── Footer.jsx      # Footer component (NEW)
│   │   ├── pages/
│   │   │   ├── Home.jsx        # Product listing page
│   │   │   ├── ProductDetail.jsx # Single product page
│   │   │   └── Cart.jsx        # Shopping cart page
│   │   ├── context/
│   │   │   └── CartContext.jsx # Cart state management
│   │   ├── api/
│   │   │   └── api.js          # Axios API utilities (NEW)
│   │   ├── App.jsx             # Main app component
│   │   ├── main.jsx            # Entry point
│   │   └── index.css           # TailwindCSS styles (UPDATED)
│   ├── tailwind.config.js      # Tailwind configuration (NEW)
│   ├── postcss.config.js       # PostCSS configuration (NEW)
│   ├── package.json
│   └── vite.config.js
├── docs/
│   ├── technical-architecture.md
│   └── prompts-used.txt
└── .env.example
```

## 🏗️ Key Components

### Backend Components

1. **server.js**
   - Express application setup
   - Middleware configuration (CORS, JSON parsing)
   - Route mounting for products and cart
   - Server initialization

2. **config/db.js**
   - MongoDB Atlas connection using Mongoose
   - Connection error handling
   - Database configuration

3. **models/Product.js**
   - Mongoose schema for products
   - Fields: name, description, price, image, category, stock
   - Timestamps for created/updated dates

4. **models/Cart.js** (NEW)
   - Mongoose schema for shopping cart
   - Fields: sessionId, items array, totalAmount
   - Pre-save hook for automatic total calculation
   - Referenced Product schema for cart items

5. **routes/products.js**
   - GET /api/products - Fetch all products
   - GET /api/products/:id - Fetch single product by ID
   - POST /api/products/seed - Seed database with sample data

6. **routes/cart.js** (NEW)
   - GET /api/cart/:sessionId - Get cart for a session
   - POST /api/cart/:sessionId - Add item to cart
   - PUT /api/cart/:sessionId/:itemId - Update item quantity
   - DELETE /api/cart/:sessionId/:itemId - Remove item from cart
   - DELETE /api/cart/:sessionId - Clear entire cart

7. **seed/seedData.js**
   - Sample product data (12 products)
   - Categories: Electronics, Clothing, Books, Home & Kitchen, Sports

### Frontend Components

1. **App.jsx**
   - React Router setup
   - CartProvider wrapper
   - Route definitions

2. **context/CartContext.jsx**
   - Global cart state management
   - Actions: addToCart, removeFromCart, updateQuantity, clearCart
   - Cart state: items[], total, itemCount

3. **pages/Home.jsx**
   - Fetches products from backend
   - Displays product grid
   - Links to product details

4. **pages/ProductDetail.jsx**
   - Displays single product information
   - Add to cart functionality
   - Quantity selector

5. **pages/Cart.jsx**
   - Lists cart items
   - Quantity update controls
   - Total price calculation
   - Remove item functionality

6. **components/Navbar.jsx**
   - Navigation links (Home, Cart)
   - Cart item count badge

7. **components/ProductCard.jsx**
   - Product preview card
   - Price, image, name display
   - Link to product details

8. **components/CartItem.jsx**
   - Individual cart item display
   - Quantity controls (+/-)
   - Remove button
   - Subtotal calculation

## 🔌 API Routes

### Product Routes (`/api/products`)

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|----------|
| GET | `/api/products` | Get all products | - | `{ products: [...] }` |
| GET | `/api/products/:id` | Get product by ID | - | `{ product: {...} }` |
| POST | `/api/products/seed` | Seed database | - | `{ message, products: [...] }` |

### Cart Routes (`/api/cart`) - NEW

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|----------|
| GET | `/api/cart/:sessionId` | Get cart for session | - | `{ cart: {...} }` |
| POST | `/api/cart/:sessionId` | Add item to cart | `{ productId, quantity }` | `{ cart: {...}, message }` |
| PUT | `/api/cart/:sessionId/:itemId` | Update item quantity | `{ quantity }` | `{ cart: {...}, message }` |
| DELETE | `/api/cart/:sessionId/:itemId` | Remove item | - | `{ cart: {...}, message }` |
| DELETE | `/api/cart/:sessionId` | Clear cart | - | `{ cart: {...}, message }` |

### Request/Response Examples

**GET /api/products**
```json
{
  "products": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "Wireless Headphones",
      "description": "High-quality wireless headphones with noise cancellation",
      "price": 99.99,
      "image": "https://via.placeholder.com/300",
      "category": "Electronics",
      "stock": 50
    }
  ]
}
```

**GET /api/products/:id**
```json
{
  "product": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Wireless Headphones",
    "description": "High-quality wireless headphones with noise cancellation",
    "price": 99.99,
    "image": "https://via.placeholder.com/300",
    "category": "Electronics",
    "stock": 50
  }
}
```

## 🔄 Data Flow

### Product Listing Flow
1. User navigates to Home page
2. Home component mounts → `useEffect` triggers
3. Frontend makes GET request to `/api/products` using axios
4. Backend queries MongoDB via Mongoose
5. Products returned to frontend
6. React renders ProductCard components with TailwindCSS

### Add to Cart Flow (Backend Persistence)
1. User clicks "Add to Cart" on Product Detail page
2. Frontend calls `addToCart` from CartContext
3. CartContext makes POST request to `/api/cart/:sessionId` via axios
4. Backend validates product and stock availability
5. Backend updates cart in MongoDB
6. Backend calculates total and saves cart
7. Updated cart returned to frontend
8. CartContext updates state with server response
9. UI updates across all components
10. Cart badge shows updated count

### Cart Management Flow
1. User navigates to Cart page
2. Cart component reads from CartContext (synced with backend)
3. User updates quantity → API PUT request to update item
4. Backend validates and updates MongoDB cart
5. Backend recalculates total
6. Frontend receives updated cart
7. UI updates reflect changes
8. User removes item → API DELETE request
9. Backend removes item from cart in MongoDB
10. Total price recalculated automatically

## 🗄️ Database Schema

### Product Collection
```javascript
{
  _id: ObjectId,
  name: String (required),
  description: String (required),
  price: Number (required),
  image: String (required),
  category: String (required),
  stock: Number (default: 0),
  createdAt: Date,
  updatedAt: Date
}
```

### Cart Collection (NEW)
```javascript
{
  _id: ObjectId,
  sessionId: String (required, unique, indexed),
  items: [
    {
      _id: ObjectId,
      productId: ObjectId (ref: Product),
      name: String,
      price: Number,
      image: String,
      quantity: Number (min: 1)
    }
  ],
  totalAmount: Number (auto-calculated),
  createdAt: Date,
  updatedAt: Date
}
```

## 🔐 Environment Variables

### Backend (.env)
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ecommerce
PORT=5000
```

### Frontend (if needed)
```
VITE_API_URL=http://localhost:5000
```

## 🚀 Tech Stack Summary

- **Frontend**: React 18, Vite, React Router DOM, Context API, TailwindCSS, Axios
- **Backend**: Node.js, Express.js, Mongoose
- **Database**: MongoDB Atlas
- **Styling**: TailwindCSS with custom configuration
- **HTTP Client**: Axios
- **State Management**: Context API with backend synchronization
- **Session Management**: Browser localStorage for session IDs

## 📝 Development Workflow

1. Start MongoDB Atlas cluster
2. Update backend `.env` with MongoDB URI
3. Install backend dependencies: `cd backend && npm install`
4. Seed database: POST request to `/api/products/seed`
5. Start backend: `npm start` (port 5000)
6. Install frontend dependencies: `cd frontend && npm install`
7. Start frontend: `npm run dev` (port 5173)
8. Access app at `http://localhost:5173`

## 🎯 Key Features Implemented

✅ Product listing with responsive grid layout (TailwindCSS)
✅ Product detail view with add to cart
✅ Shopping cart with CRUD operations via backend API
✅ Global state management with Context API
✅ RESTful API architecture
✅ MongoDB integration with Mongoose
✅ Backend cart persistence with session management
✅ Stock validation on add/update operations
✅ Responsive design with TailwindCSS
✅ Client-side routing with React Router
✅ Real-time cart updates from backend
✅ Automatic total price calculation on server
✅ Axios for HTTP requests with centralized API configuration
✅ Loading states and error handling
✅ Footer component with company information
