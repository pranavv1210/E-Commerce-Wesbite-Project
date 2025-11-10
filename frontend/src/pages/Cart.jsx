import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CartItem from '../components/CartItem';

const Cart = () => {
  const navigate = useNavigate();
  const { items, getCartTotal, clearCart, loading } = useCart();

  const handleClearCart = async () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      await clearCart();
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary-600 mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Loading cart...</p>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto mt-12 p-12 bg-white rounded-xl shadow-lg text-center">
        <div className="text-6xl mb-6">🛒</div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Cart is Empty</h2>
        <p className="text-gray-600 text-lg mb-8">Add some products to get started!</p>
        <button 
          onClick={() => navigate('/')} 
          className="px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-semibold text-lg transition"
        >
          Start Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900">Shopping Cart</h1>
        <button 
          onClick={handleClearCart}
          className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition"
        >
          Clear Cart
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <CartItem key={item._id} item={item} />
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Items:</span>
                <span className="font-semibold">{items.reduce((count, item) => count + item.quantity, 0)}</span>
              </div>
              <div className="border-t-2 border-gray-200 pt-4 flex justify-between items-center">
                <span className="text-xl font-bold">Total:</span>
                <span className="text-3xl font-bold text-primary-600">
                  ₹{getCartTotal().toLocaleString('en-IN')}
                </span>
              </div>
            </div>
            
            <button 
              onClick={() => navigate('/checkout')}
              className="w-full py-4 bg-green-500 hover:bg-green-600 text-white rounded-lg font-bold text-lg mb-4 transition"
            >
              Proceed to Checkout
            </button>
            
            <button 
              onClick={() => navigate('/')}
              className="w-full py-3 border-2 border-gray-300 hover:border-primary-600 hover:text-primary-600 rounded-lg font-semibold transition"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
