const express = require('express');
const router = express.Router();
const ProductsController = require('../controllers/productsControllers');

// get all products
router.get('/', ProductsController.getAllProducts);

// get a product by id
router.get('/:id', ProductsController.getProductById);

// create a new product
router.post('/', ProductsController.createProduct);

// update a product by id
router.put('/:id', ProductsController.updateProductById);

// delete a product by id
router.delete('/:id', ProductsController.deleteProductById);

exports.modules = router;