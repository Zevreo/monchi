const router = require('express').Router();
let Store = require('../models/stores.model');
const bcrypt = require('bcryptjs');
const auth = require('../middleware/auth');

