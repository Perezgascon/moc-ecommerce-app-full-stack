// categoriesRoutes.js

const express = require('express');
const router = express.Router();
const CategoriesController = require('../controllers/categoriesControllers');

// get all product categories
router.get('/', CategoriesController.getAllCategories);

// get a category by id
router.get('/:id', CategoriesController.getCategoryById);

// create a new product
router.post('/', CategoriesController.createCategory);

// update a product by id
router.put('/:id', CategoriesController.updateCategoryById);

// delete a product by id
router.delete('/:id', CategoriesController.deleteCategoryById);

exports.modules = router;