const { Category } = require('../models/categoriesModel');

// get all categories
exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Category.findAll();
        res.status(200).json(categories);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// get a category by id
exports.getCategoryById = async (req, res) => {
  try {
      const category = await Category.findByPk(req.params.id);
      if (!category) {
          res.status(404).json({ message: 'Category not found' });
      } else {
          res.status(200).json(category);
      }
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
};

// create a new category
exports.createCategory = async (req, res) => {
  try {
      const category = await Category.create(req.body);
      res.status(201).json(category);
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
};

// update a category by id
exports.updateCategoryById = async (req, res) => {
  try {
      const category = await Category.update(req.body, {
          where: {
              category_id: req.params.id
          }
      });
      if (!category) {
          res.status(404).json({ message: 'Category not found' });
      } else {
          res.status(200).json(category);
      }
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
};

// delete a category by id
exports.deleteCategoryById = async (req, res) => {
  try {
      const category = await Category.destroy({
          where: {
              category_id: req.params.id
          }
      });
      if (!category) {
          res.status(404).json({ message: 'Category not found' });
      } else {
          res.status(200).json({ message: 'Category deleted' });
      }
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
};
