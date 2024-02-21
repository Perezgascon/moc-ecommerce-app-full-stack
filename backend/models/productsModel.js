const { sequelize } = require('../db/conn');
const { DataTypes } = require('sequelize');
const { Category } = require('./categoriesModel');

const Product = sequelize.define('Product', {
    product_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    product_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    picture_url: {
        type: DataTypes.STRING
    },
    color: {
        type: DataTypes.STRING
    },
    price: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    category_id: { // Change to category_id
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Category,
            key: 'category_id'
        },
        onDelete: 'NO ACTION',
        onUpdate: 'CASCADE'
    },
    stock_quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Product',
    tableName: 'products',
    timestamps: false
});

// Establishing the association with Category based on category_id
Product.belongsTo(Category, { foreignKey: 'category_id' });

module.exports = { Product };
