// categoriesController.js

const { sequelize } = require('../db/conn');

// Function to fetch product categories from the database
exports.getCategories = async (req, res) => {
  try {
    // Assuming the model for products is defined and exported from another file
    const { Product }  = require('../models/productsModel');

    // Fetch distinct categories using Sequelize
    const categories = await Product.findAll({
      attributes: [[sequelize.fn('DISTINCT', sequelize.col('category')), 'category']]
    });

    // Extract categories from the result
    const categoryNames = categories.map(category => category.category);

    res.status(200).json(categoryNames);
  } catch (err) {
    console.error('Error fetching product categories:', err);
    res.status(500).json({ error: err.message }); // Send the specific error message
  }
};
