const jwt = require('jsonwebtoken');
require('dotenv').config();


const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1]; // Split "Bearer <token>"

        jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: 'Invalid token' });
            } else {
                req.user = decoded;
                console.log('Valid token:', token); // Log the token here
                next();
            }
        });
    } else {
        return res.status(401).json({ message: 'Token not found' });
    }
};

module.exports = {
    authenticateJWT
};
