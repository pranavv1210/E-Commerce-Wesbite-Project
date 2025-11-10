const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const Product = require('../models/Product');

// @route   GET /api/cart/:sessionId
// @desc    Get cart for a session
// @access  Public
router.get('/:sessionId', async (req, res) => {
  try {
    let cart = await Cart.findOne({ sessionId: req.params.sessionId });
    
    if (!cart) {
      cart = await Cart.create({ sessionId: req.params.sessionId, items: [] });
    }
    
    res.json({ cart });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

// @route   POST /api/cart/:sessionId
// @desc    Add item to cart
// @access  Public
router.post('/:sessionId', async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;
    
    // Validate product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    // Check stock
    if (product.stock < quantity) {
      return res.status(400).json({ message: 'Insufficient stock' });
    }
    
    // Find or create cart
    let cart = await Cart.findOne({ sessionId: req.params.sessionId });
    if (!cart) {
      cart = new Cart({ sessionId: req.params.sessionId, items: [] });
    }
    
    // Check if item already exists in cart
    const existingItemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );
    
    if (existingItemIndex > -1) {
      // Update quantity
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      // Add new item
      cart.items.push({
        productId: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity,
      });
    }
    
    await cart.save();
    res.status(201).json({ cart, message: 'Item added to cart' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

// @route   PUT /api/cart/:sessionId/:itemId
// @desc    Update item quantity in cart
// @access  Public
router.put('/:sessionId/:itemId', async (req, res) => {
  try {
    const { quantity } = req.body;
    
    if (!quantity || quantity < 1) {
      return res.status(400).json({ message: 'Quantity must be at least 1' });
    }
    
    const cart = await Cart.findOne({ sessionId: req.params.sessionId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    
    const item = cart.items.id(req.params.itemId);
    if (!item) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }
    
    // Check stock
    const product = await Product.findById(item.productId);
    if (product && product.stock < quantity) {
      return res.status(400).json({ message: 'Insufficient stock' });
    }
    
    item.quantity = quantity;
    await cart.save();
    
    res.json({ cart, message: 'Cart updated' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

// @route   DELETE /api/cart/:sessionId/:itemId
// @desc    Remove item from cart
// @access  Public
router.delete('/:sessionId/:itemId', async (req, res) => {
  try {
    const cart = await Cart.findOne({ sessionId: req.params.sessionId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    
    cart.items = cart.items.filter(
      (item) => item._id.toString() !== req.params.itemId
    );
    
    await cart.save();
    res.json({ cart, message: 'Item removed from cart' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

// @route   DELETE /api/cart/:sessionId
// @desc    Clear entire cart
// @access  Public
router.delete('/:sessionId', async (req, res) => {
  try {
    const cart = await Cart.findOne({ sessionId: req.params.sessionId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    
    cart.items = [];
    await cart.save();
    
    res.json({ cart, message: 'Cart cleared' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

module.exports = router;
