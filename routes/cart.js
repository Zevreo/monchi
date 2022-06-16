const router = require('express').Router();
let Properties = require('../models/productProperties.model');
let Specs = require('../models/propertySpecs.model');
const bcrypt = require('bcryptjs');
const auth = require('../middleware/auth');