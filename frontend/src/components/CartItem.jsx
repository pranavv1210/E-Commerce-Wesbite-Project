import { useCart } from '../context/CartContext';

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  const handleIncrement = async () => {
    await updateQuantity(item._id, item.quantity + 1);
  };

  const handleDecrement = async () => {
    if (item.quantity > 1) {
      await updateQuantity(item._id, item.quantity - 1);
    }
  };

  const handleRemove = async () => {
    await removeFromCart(item._id);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 flex flex-col sm:flex-row gap-4 items-center">
      <img 
        src={item.image} 
        alt={item.name} 
        className="w-32 h-32 object-cover rounded-lg bg-gray-100"
      />
      <div className="flex-1 text-center sm:text-left">
        <h3 className="text-xl font-semibold text-gray-900 mb-1">{item.name}</h3>
        <p className="text-gray-600">${item.price.toFixed(2)} each</p>
      </div>
      <div className="flex flex-col items-center sm:items-end gap-3">
        <div className="flex items-center gap-3">
          <button 
            onClick={handleDecrement}
            disabled={item.quantity <= 1}
            className="w-10 h-10 rounded-lg border-2 border-gray-300 hover:border-primary-600 hover:text-primary-600 font-bold transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            -
          </button>
          <span className="text-xl font-semibold w-12 text-center">{item.quantity}</span>
          <button 
            onClick={handleIncrement}
            className="w-10 h-10 rounded-lg border-2 border-gray-300 hover:border-primary-600 hover:text-primary-600 font-bold transition"
          >
            +
          </button>
        </div>
        <p className="text-lg font-bold text-primary-600">
          ${(item.price * item.quantity).toFixed(2)}
        </p>
        <button 
          onClick={handleRemove}
          className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;
