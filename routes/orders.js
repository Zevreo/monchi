const router = require('express').Router();
let Order = require('../models/orders.model');

/* const orderProductsSchema = new Schema({
    ProductId:
    {type: String, required: true},
    Quantity:
    {type: Number, required: true},
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
    {type: Boolean},
    TransactionId:
    {type: String, required: true},
    BuyerId:
    {type: String, required: true}
}, {
    timestamps: true
}); */

//GET User Orders
router.get('/', auth, (req, res) => {
    Order.find({ UserId: res.locals.id })
        .then(orders => res.json(orders))
        .catch(err => res.status(400).json('Error: ' + err));
});

//POST New order
router.post('/', auth, (req, res) => {
    const { SaleTotal, SaleCoin, PaymentMethod,
        PaymentSuccess, SaleProducts,
        TransactionId, BuyerId } = req.body;
    const newOrder = new Order({
        SaleTotal, SaleCoin, PaymentMethod,
        PaymentSuccess, SaleProducts,
        UserId: res.locals.id, TransactionId, BuyerId
    });
    newOrder.save()
        .then(() => res.json('Orden agregada'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;