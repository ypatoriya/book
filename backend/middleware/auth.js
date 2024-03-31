// auth.js

const { request } = require('express');
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    console.log(req.headers)
    const token = req.headers.cookie['jwt'].split(' ').pop();
    

    if (!token) {
        return res.status(403).json({ message: 'Token is required!' });
    }

    jwt.verify(token, 'crud', (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid token!' });
        }

        req.user = decoded;
        next();
    });
};

module.exports = { verifyToken };
