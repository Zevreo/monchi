const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
    UserId: 
    {type: String, required: true },
    ProductId:
    {type: String, required: true},
    Quantity:
    {type: Number, required: true},
    ProductSpecs:
    {type: Object, required: false},
    ProductOptions:
    {type: Array, required: false}
}, {
    timestamps: true
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;