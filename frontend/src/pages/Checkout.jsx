import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Checkout = () => {
  const navigate = useNavigate();
  const { items, getCartTotal, clearCart, loading } = useCart();
  const { isAuthenticated, user } = useAuth();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
  });

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Simulate order processing
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    // Clear the cart
    await clearCart();
    
    // Show success message
    setOrderPlaced(true);
    
    // Redirect to home after 3 seconds
    setTimeout(() => {
      navigate('/');
    }, 3000);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary-600 mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Loading checkout...</p>
        </div>
      </div>
    );
  }

  if (items.length === 0 && !orderPlaced) {
    return (
      <div className="max-w-2xl mx-auto mt-12 p-12 bg-white rounded-xl shadow-lg text-center">
        <div className="text-6xl mb-6">🛒</div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Cart is Empty</h2>
        <p className="text-gray-600 text-lg mb-8">Add some products before checkout!</p>
        <button 
          onClick={() => navigate('/')} 
          className="px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-semibold text-lg transition"
        >
          Start Shopping
        </button>
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <div className="max-w-2xl mx-auto mt-12 p-12 bg-white rounded-xl shadow-lg text-center">
        <div className="text-6xl mb-6">✅</div>
        <h2 className="text-3xl font-bold text-green-600 mb-4">Order Placed Successfully!</h2>
        <p className="text-gray-600 text-lg mb-4">Thank you for your order, {formData.firstName}!</p>
        <p className="text-gray-500 mb-8">A confirmation email has been sent to {formData.email}</p>
        <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6 mb-8">
          <p className="text-gray-700 mb-2">Order Total: <span className="font-bold text-2xl text-green-600">₹{getCartTotal().toLocaleString('en-IN')}</span></p>
          <p className="text-sm text-gray-500">Redirecting to home page...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Checkout Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Shipping Information</h2>
            
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary-600 focus:outline-none transition"
                    placeholder="John"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary-600 focus:outline-none transition"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary-600 focus:outline-none transition"
                    placeholder="john.doe@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary-600 focus:outline-none transition"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Address *
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary-600 focus:outline-none transition"
                  placeholder="123 Main Street"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    City *
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary-600 focus:outline-none transition"
                    placeholder="New York"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    State *
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary-600 focus:outline-none transition"
                    placeholder="NY"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    ZIP Code *
                  </label>
                  <input
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary-600 focus:outline-none transition"
                    placeholder="10001"
                  />
                </div>
              </div>

              <div className="mb-8">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Country *
                </label>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary-600 focus:outline-none transition"
                >
                  <option value="">Select Country</option>
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                  <option value="UK">United Kingdom</option>
                  <option value="AU">Australia</option>
                  <option value="IN">India</option>
                </select>
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => navigate('/cart')}
                  className="flex-1 py-4 border-2 border-gray-300 hover:border-primary-600 hover:text-primary-600 rounded-lg font-semibold text-lg transition"
                >
                  Back to Cart
                </button>
                <button
                  type="submit"
                  className="flex-1 py-4 bg-green-500 hover:bg-green-600 text-white rounded-lg font-bold text-lg transition"
                >
                  Place Order
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
              {items.map((item) => (
                <div key={item._id} className="flex gap-3 pb-4 border-b border-gray-200">
                  <img 
                    src={item.product.image} 
                    alt={item.product.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm text-gray-900 line-clamp-1">
                      {item.product.name}
                    </h3>
                    <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                    <p className="text-sm font-bold text-primary-600">
                      ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Items:</span>
                <span className="font-semibold">
                  {items.reduce((count, item) => count + item.quantity, 0)}
                </span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Subtotal:</span>
                <span className="font-semibold">₹{getCartTotal().toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping:</span>
                <span className="font-semibold text-green-600">FREE</span>
              </div>
              <div className="border-t-2 border-gray-200 pt-3 flex justify-between items-center">
                <span className="text-xl font-bold">Total:</span>
                <span className="text-3xl font-bold text-primary-600">
                  ₹{getCartTotal().toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                <span className="font-semibold">🔒 Secure Checkout</span>
                <br />
                Your information is protected
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
