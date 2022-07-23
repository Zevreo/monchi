const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require("path");

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5001;

const maxRequestBodySize = '2mb';
app.use(express.json({limit: maxRequestBodySize}));

app.use(cors());
app.use(fileUpload());
app.use(express.static(path.join(__dirname, "client", "build")))

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () =>{
    console.log('MongoDB se ha conectado');
});

// Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/store', require('./routes/store'));
app.use('/api/address', require('./routes/adressess'));
app.use('/api/product', require('./routes/products'));
app.use('/api/fixed', require('./routes/fixed'));
app.use('/api/cart', require('./routes/cart'));
app.use('/api/order', require('./routes/orders'));

//Make Express serve Client
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(port, () =>{
    console.log(`Server is running on port: ${port}`);
});