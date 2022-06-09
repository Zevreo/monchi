const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productTagsSchema = new Schema({
    ProductId: 
    {type: String, required: true },
    Tags:
    {type: String, required: true}
}, {
    timestamps: true
});

const ProductTags = mongoose.model('ProductTags', productTagsSchema);

module.exports = ProductTags;