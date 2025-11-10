const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const sampleProducts = require('../seed/seedData');

// @route   GET /api/products
// @desc    Get all products
// @access  Public
router.get('/', async (req, res) => {
  try {
    const products = await Product.find({});
    res.json({ products });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

// @route   GET /api/products/:id
// @desc    Get single product by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    res.json({ product });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

// @route   POST /api/products/seed
// @desc    Seed database with sample products
// @access  Public (in production, this should be protected)
router.post('/seed', async (req, res) => {
  try {
    // Clear existing products
    await Product.deleteMany({});
    
    // Insert sample products
    const products = await Product.insertMany(sampleProducts);
    
    res.status(201).json({
      message: 'Database seeded successfully',
      count: products.length,
      products,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error seeding database', error: error.message });
  }
});

module.exports = router;
