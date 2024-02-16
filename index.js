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

// import routes
const productsRoutes = require('./routes/productsRoutes');
const ordersRoutes = require('./routes/ordersRoutes');
const usersRoutes = require('./routes/usersRoutes');



// use routes
app.use('/products', productsRoutes.modules);
app.use('/orders', ordersRoutes.modules);
app.use('/users', usersRoutes.modules);



app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`)
});