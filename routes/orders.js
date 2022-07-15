const router = require('express').Router();
const auth = require('../middleware/auth');
let Order = require('../models/orders.model');
let Product = require('../models/products.model');

/* const orderProductsSchema = new Schema({
    ProductId:
    {type: String, required: true},
    Quantity:
    {type: Number, required: true},
    ProductOptions:
    {type: Array, required: false},
    SaleCoin:
    {type: String, required: true},
    SalePrice:
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
router.post('/', auth, async (req, res) => {
    const { SaleTotal, SaleCoin, PaymentMethod,
        PaymentSuccess, SaleProducts,
        TransactionId, BuyerId } = req.body;
    for(var cartProd of SaleProducts){
        await Product.findById(cartProd.ProductId)
            .then(prod => {
                cartProd.SalePrice = prod.ProductPrice;
                cartProd.SaleCoin = prod.PriceCoin;
                cartProd.ProductOptions = cartProd.CartOptions;
                delete cartProd.UserId;
            }).catch(err => res.status(400).json('Error: ' + err));
    }
    const newOrder = new Order({
        SaleTotal, SaleCoin, PaymentMethod,
        PaymentSuccess, SaleProducts,
        UserId: res.locals.id, TransactionId, BuyerId
    });
    newOrder.save()
        .then(ord=> res.json(ord))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;