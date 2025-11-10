import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { productAPI } from '../api/api';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await productAPI.getById(id);
      setProduct(response.data.product);
      setError(null);
    } catch (err) {
      setError(err.response?.status === 404 ? 'Product not found' : 'Error loading product');
      console.error('Error fetching product:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    setAdding(true);
    const result = await addToCart(product, quantity);
    setAdding(false);
    
    if (result.success) {
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 2000);
    } else {
      alert(result.message || 'Failed to add to cart');
    }
  };

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= product.stock) {
      setQuantity(newQuantity);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary-600 mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Loading product...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="max-w-2xl mx-auto mt-12 p-8 bg-white rounded-lg shadow-md text-center">
        <h2 className="text-3xl font-bold text-red-600 mb-4">Product Not Found</h2>
        <p className="text-gray-600 mb-6">{error || 'The product you are looking for does not exist.'}</p>
        <button 
          onClick={() => navigate('/')} 
          className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-semibold transition"
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white rounded-xl shadow-lg p-8">
        <div className="h-[500px] rounded-xl overflow-hidden bg-gray-100">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="flex flex-col space-y-6">
          <span className="inline-block px-4 py-2 text-sm font-semibold text-white bg-primary-600 rounded-full w-fit">
            {product.category}
          </span>
          <h1 className="text-4xl font-bold text-gray-900">{product.name}</h1>
          <p className="text-4xl font-bold text-primary-600">₹{product.price.toLocaleString('en-IN')}</p>
          <p className="text-gray-600 text-lg leading-relaxed">{product.description}</p>
          
          <div className="p-4 rounded-lg bg-green-50">
            {product.stock > 0 ? (
              <span className="text-green-600 font-semibold">
                ✓ In Stock ({product.stock} available)
              </span>
            ) : (
              <span className="text-red-600 font-semibold">Out of Stock</span>
            )}
          </div>

          {product.stock > 0 && (
            <div className="space-y-4">
              <div>
                <label className="block font-semibold mb-2">Quantity:</label>
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => handleQuantityChange(-1)} 
                    disabled={quantity <= 1}
                    className="w-12 h-12 rounded-lg border-2 border-gray-300 hover:border-primary-600 hover:text-primary-600 font-bold text-xl transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    -
                  </button>
                  <span className="text-2xl font-semibold w-16 text-center">{quantity}</span>
                  <button 
                    onClick={() => handleQuantityChange(1)} 
                    disabled={quantity >= product.stock}
                    className="w-12 h-12 rounded-lg border-2 border-gray-300 hover:border-primary-600 hover:text-primary-600 font-bold text-xl transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    +
                  </button>
                </div>
              </div>
              
              <button 
                onClick={handleAddToCart} 
                disabled={adding}
                className={`w-full py-4 rounded-lg font-semibold text-lg transition ${
                  addedToCart 
                    ? 'bg-green-500 text-white' 
                    : 'bg-primary-600 hover:bg-primary-700 text-white'
                } disabled:opacity-50`}
              >
                {adding ? 'Adding...' : addedToCart ? '✓ Added to Cart!' : 'Add to Cart'}
              </button>
            </div>
          )}

          <button 
            onClick={() => navigate('/')} 
            className="w-full py-3 border-2 border-gray-300 hover:border-primary-600 hover:text-primary-600 rounded-lg font-semibold transition"
          >
            ← Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
