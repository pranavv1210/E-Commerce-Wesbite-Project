import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <Link to={`/product/${product._id}`}>
        <div className="h-64 overflow-hidden bg-gray-100">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="p-5">
          <span className="inline-block px-3 py-1 text-xs font-semibold text-white bg-primary-600 rounded-full mb-3">
            {product.category}
          </span>
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 h-14">
            {product.name}
          </h3>
          <p className="text-2xl font-bold text-primary-600 mb-2">
            ${product.price.toFixed(2)}
          </p>
          <p className="text-sm text-gray-600">
            {product.stock > 0 ? (
              <span className="text-green-600">✓ {product.stock} in stock</span>
            ) : (
              <span className="text-red-600">Out of stock</span>
            )}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
