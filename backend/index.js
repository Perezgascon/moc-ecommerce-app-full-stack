const express = require('express');
require('dotenv').config();
const { testConnection } = require('./db/conn');
const cors = require('cors');
const { Product } = require('./models/productsModel');



const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 8080;

testConnection();

app.get('/health', (req, res) => {
    res.send("It's Alive!");
});

app.use('/images', express.static('images'));

// import routes
const productsRoutes = require('./routes/productsRoutes');
const ordersRoutes = require('./routes/ordersRoutes');
const orderItemsRoutes = require('./routes/orderItemsRoutes');
const usersRoutes = require('./routes/usersRoutes');
const categoriesRoutes = require('./routes/categoriesRoutes');



// use routes
app.use('/products', productsRoutes.modules);
app.use('/orders', ordersRoutes.modules);
app.use('/orderitems', orderItemsRoutes.modules);
app.use('/users', usersRoutes.modules);
app.use('/categories', categoriesRoutes.modules);



app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`)
});