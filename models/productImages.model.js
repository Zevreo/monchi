const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productImagesSchema = new Schema({
    ProductId: 
    {type: String, required: true },
    ImageURL:
    {type: String, required: true}
}, {
    timestamps: true
});

const ProductImages = mongoose.model('ProductImages', productImagesSchema);

module.exports = ProductImages;