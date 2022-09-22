// Handles the token
const jwt = require('jsonwebtoken')

// This middleware uncrypts the token to be used in te calls to authenticate the requests
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]; // we take the token from the header
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET'); // we decode the token and assign the values
        const userId = decodedToken.userId;
        const userName = decodedToken.userName;
        const userAdmin = decodedToken.userAdmin
        req.auth = {
            userName: userName,
            userId: userId,
            userAdmin: userAdmin
        }; // we assign the values to the req.auth middleware
     next();
    } catch(error) {
        res.status(401).json({ error });
    }
 };