const express = require('express');
require('dotenv').config();
const { testConnection } = require('./db/conn');
const { Product } = require('./models/productsModel');


const app = express();
app.use(express.json());

const PORT = 8080;

testConnection();

app.get('/health', (req, res) => {
    res.send("It's Alive!");
});

//testing connection

app.get('/products', async (req, res) => { // Make the route handler asynchronous
    try {
        const products = await Product.findAll(); // Wait for the Promise to resolve
        res.status(200).json(products); // Send the response with the products
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`)
});