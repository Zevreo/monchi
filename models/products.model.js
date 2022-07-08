const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Tags = new Schema({
    Tag:
        { type: String, trim: true }
});
const Images = new Schema({
    ImageUrl:
        { type: String, default: "../../613b38eaa594d30013a82b27.png" }
});
const ProductSchema = new Schema({
    StoreId:
        { type: String, required: true },
    ProductName:
        { type: String, requred: true },
    ProductDescription:
        { type: String },
    ProductPrice:
        { type: Number, required: true },
    PriceCoin:
        { type: String, default: "USD" },
    ProductImages:
        { type: Array, required: true },
    Tags:
        { type: Array, required: true },
    Stock:
        { type: Number, required: true },
    Status:
        { type: String, required: true }

}, {
    timestamps: true
});


const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;