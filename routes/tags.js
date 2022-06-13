const router = require('express').Router();
let Tags = require('../models/productTags.model');
const bcrypt = require('bcryptjs');
const auth = require('../middleware/auth');