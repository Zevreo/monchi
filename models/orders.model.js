const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderProductsSchema = new Schema({
    ProductId:
    {type: String, required: true},
    Quantity:
    {type: Number, required: true},
    ProductOptions:
    {type: String, required: false},
    SaleCoin:
    {type: String, required: true},
    SalePrice:
    {type: Number, required: true},
    ProductImage:
    {type: String, required: true},
    ProductName:
    {type: String, required: true}
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
    {type: Boolean},
    TransactionId:
    {type: String, required: true},
    BuyerId:
    {type: String, required: true},
    TrackingNumber:
    {type: String, required: true}
}, {
    timestamps: true
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;