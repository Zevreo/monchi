const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productPropertiesSchema = new Schema({
    ProductId: 
    {type: String, required: true },
    PropertyName:
    {type: String, required: true},
    PropertyType:
    {type: String, required: true}
}, {
    timestamps: true
});

const ProductProperties = mongoose.model('ProductProperties', productPropertiesSchema);

module.exports = ProductProperties;