const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const authHeader = req.get('Authorization');
    if(!authHeader) {
        const error = new Error('No Token/Header.!');
        error.statusCode = 401;
        throw err;
    }
    const token = req.get('Authorization').split(' ')[1];
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, 'somesupersecretsecret');
    } catch(err) {
        err.statusCode = 500;
        throw err;
    }
    if(!decodedToken) {
        const error = new Error('Not authenticated.!');
        error.statusCode = 401;
        throw err;
    }
    req.userId = decodedToken.userId;
    next();
};