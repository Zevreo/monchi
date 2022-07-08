const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require("path");

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());
app.use(fileUpload());
app.use(express.static(path.join(__dirname, "client", "build","public")))

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () =>{
    console.log('MongoDB se ha conectado');
});

app.listen(port, () =>{
    console.log(`Server is running on port: ${port}`);
});

// Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/store', require('./routes/store'));
app.use('/api/address', require('./routes/adressess'));
app.use('/api/product', require('./routes/products'));
app.use('/api/fixed', require('./routes/fixed'));
app.use('/api/cart', require('./routes/cart'));