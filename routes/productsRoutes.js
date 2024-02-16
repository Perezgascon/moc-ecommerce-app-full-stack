const express = require('express');
const router = express.Router();
const ProductsControllers = require('../controllers/productsControllers');

// get all products
router.get('/', ProductsControllers.getAllProducts);

// get a product by id
router.get('/:id', ProductsControllers.getProductById);

// create a new product
router.post('/', ProductsControllers.createProduct);

// update a product by id
router.put('/:id', ProductsControllers.updateProductById);

// delete a product by id
router.delete('/:id', ProductsControllers.deleteProductById);

exports.modules = router;