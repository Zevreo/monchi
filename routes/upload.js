const router = require('express').Router();
let Images = require('../models/productImages.model');
const bcrypt = require('bcryptjs');
const auth = require('../middleware/auth');