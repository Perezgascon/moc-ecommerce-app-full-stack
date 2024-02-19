// categoriesController.js

require('dotenv').config(); // Load environment variables from .env file
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.POSTGRES_DATABASE_URL,
});

// Function to fetch product categories from the database
exports.getCategories = async (req, res) => {
  try {
    const client = await pool.connect();
    const query = 'SELECT DISTINCT category FROM products';
    const result = await client.query(query);
    client.release();
    const categories = result.rows.map(row => row.category);
    res.status(200).json(categories);
  } catch (err) {
    console.error('Error fetching product categories:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
