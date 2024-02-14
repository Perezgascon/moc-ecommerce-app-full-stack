const express = require('express');
require('dotenv').config();
const { testConnection } = require('./db/conn');


const app = express();
app.use(express.json());

const PORT = 8080;

testConnection();

app.get('/health', (req, res) => {
    res.send("It's Alive!");
});

app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`)
});