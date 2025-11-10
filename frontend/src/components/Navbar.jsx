import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { getCartCount } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  const cartCount = getCartCount();

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl">🛍️</span>
            <span className="text-xl font-bold text-primary-600 hover:text-primary-700 transition">
              E-Shop
            </span>
          </Link>
          
          <div className="flex items-center space-x-6">
            <Link 
              to="/" 
              className="text-gray-700 hover:text-primary-600 font-medium transition"
            >
              Home
            </Link>
            <Link 
              to="/cart" 
              className="relative flex items-center space-x-1 text-gray-700 hover:text-primary-600 font-medium transition"
            >
              <span className="text-xl">🛒</span>
              <span>Cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <span className="text-gray-700 font-medium">
                  👋 {user?.name}
                </span>
                <button
                  onClick={logout}
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="px-4 py-2 text-primary-600 hover:text-primary-700 font-medium transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
