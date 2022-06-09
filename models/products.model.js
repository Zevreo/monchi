const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    StoreId: 
    {type: String, required: true },
    ProductName:
    {type: String, requred: true},
    ProductDescription:
    {type: String},
    ProductPrice:
    {type: Number, required: true},
    PriceCoin:
    {type: String, required: true, default: "USD"}
}, {
    timestamps: true
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;