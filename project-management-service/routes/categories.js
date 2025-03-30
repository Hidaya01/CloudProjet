const express = require('express');
const router = express.Router();
const Category = require('../models/Category');

// GET all categories
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Server Error: Unable to fetch categories' });
  }
});

// POST create a new category
router.post('/', async (req, res) => {
  try {
    if (!req.body.name) {
      return res.status(400).json({ error: 'Category name is required' });
    }

    const category = new Category(req.body);
    await category.save();
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ error: 'Server Error: Unable to create category' });
  }
});

// GET a single category by ID
router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    res.json(category);
  } catch (error) {
    res.status(500).json({ error: 'Server Error: Invalid category ID' });
  }
});

// PUT update a category
router.put('/:id', async (req, res) => {
  try {
    if (!req.body.name) {
      return res.status(400).json({ error: 'Category name is required' });
    }

    const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    res.json(category);
  } catch (error) {
    res.status(500).json({ error: 'Server Error: Unable to update category' });
  }
});

// DELETE a category
router.delete('/:id', async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);

    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server Error: Unable to delete category' });
  }
});

module.exports = router;
