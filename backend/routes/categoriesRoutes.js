// categoriesRoutes.js

const express = require('express');
const router = express.Router();
const CategoriesController = require('../controllers/categoriesControllers');

// get all product categories
router.get('/', CategoriesController.getAllCategories);

exports.modules = router;