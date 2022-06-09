const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderProductsSchema = new Schema({
    OrderId: 
    {type: String, required: true },
    ProductId:
    {type: String, required: true},
    SalePrice:
    {type: Number, required: true}
}, {
    timestamps: true
});

const OrderProducts = mongoose.model('Orderconst OrderProducts', orderProductsSchema);

module.exports = OrderProducts;