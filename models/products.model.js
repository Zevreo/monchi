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
    {type: String, required: true, default: "USD"},
    ProductImage:
    {type: String, required: true, default: "../../613b38eaa594d30013a82b27.png"}
}, {
    timestamps: true
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;