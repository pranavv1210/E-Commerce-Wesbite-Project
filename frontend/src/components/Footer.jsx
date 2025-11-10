const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4">About E-Shop</h3>
            <p className="text-gray-600">
              Your one-stop destination for quality products at amazing prices.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-600 hover:text-primary-600 transition">Home</a></li>
              <li><a href="/cart" className="text-gray-600 hover:text-primary-600 transition">Cart</a></li>
              <li><a href="#" className="text-gray-600 hover:text-primary-600 transition">About Us</a></li>
              <li><a href="#" className="text-gray-600 hover:text-primary-600 transition">Contact</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4">Contact</h3>
            <p className="text-gray-600">Email: support@eshop.com</p>
            <p className="text-gray-600">Phone: +1 (555) 123-4567</p>
          </div>
        </div>
        <div className="border-t border-gray-200 mt-8 pt-6 text-center">
          <p className="text-gray-600">
            &copy; {new Date().getFullYear()} E-Shop. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
