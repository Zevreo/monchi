const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    UserId: 
    {type: String, required: true },
    SaleTotal:
    {type: Number, required: true},
    PaymentMethod:
    {type: String, required: true},
    PaymentSuccess:
    {type: Boolean}
}, {
    timestamps: true
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;