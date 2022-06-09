const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const nameSchema = new Schema({
    OrderId: 
    {type: String, required: true },
    ProductId:
    {type: String, required: true},
    SalePrice:
    {type: Number, required: true}
}, {
    timestamps: true
});

const Name = mongoose.model('Name', nameSchema);

module.exports = Name;