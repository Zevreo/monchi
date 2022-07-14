const config = require('../config/default');
const jwt = require('jsonwebtoken');

function auth(req, res, next) {
    const token = req.header('x-auth-token');
    if(!token) return res.status(401).json('ese sebas es un loquillo');
    try{
        const decoded = jwt.verify(token, config.jwtSecret);
        req.user = decoded;
        res.locals.id = decoded.id;
        res.locals.Role = decoded.Role;
        next();
    }
    catch(e) {
        res.status(400).json('Token invalido');
    }
}
module.exports = auth;