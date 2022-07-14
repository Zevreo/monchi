const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderProductsSchema = new Schema({
    ProductId:
    {type: String, required: true},
    Quantity:
    {type: Number, required: true},
    ProductSpecs:
    {type: Object, required: false},
    ProductOptions:
    {type: Array, required: false},
    SaleCoin:
    {type: String, required: true},
    ProductPrice:
    {type: Number, required: true}
});

const orderSchema = new Schema({
    UserId: 
    {type: String, required: true },
    SaleTotal:
    {type: Number, required: true},
    SaleCoin:
    {type: String, required: true},
    SaleProducts:
    {type: [orderProductsSchema], required: true},
    PaymentMethod:
    {type: String, required: true},
    PaymentSuccess:
    {type: Boolean}
}, {
    timestamps: true
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;