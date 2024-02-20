const { sequelize } = require('../db/conn');
const { DataTypes } = require('sequelize');

const Category = sequelize.define('Category', {
    category_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    categoryName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
}, {
    sequelize,
    modelName: 'Category',
    tableName: 'categories',
    timestamps: false
});

module.exports = { Category };
