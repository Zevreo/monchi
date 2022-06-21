const router = require('express').Router();
let Prods = require('../models/products.model');
let Cart = require('../models/cart.model');
const auth = require('../middleware/auth');

module.exports = router;