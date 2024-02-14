const express = require('express');

const app = express();

app.get('/health', (req, res) => {
    res.send("It's Alive!");
});

const PORT = 8080;

app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`)
});