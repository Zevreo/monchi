const router = require('express').Router();
let Products = require('../models/products.model');
const bcrypt = require('bcryptjs');
const auth = require('../middleware/auth');