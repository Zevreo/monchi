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
router.get('/', auth, async (req, res) => {
    const { page = 1 } = req.headers;
    if (page < 1) page = 1;
    const count = await Order.find({ UserId: res.locals.id }).countDocuments();
    res.set({ 'x-page': page, 'x-count': count })
    await Order.find({ UserId: res.locals.id }).sort({ updatedAt: -1 })
        .limit(5).skip((page - 1) * 5)
        .then(orders => res.json(orders))
        .catch(err => res.status(400).json('Error: ' + err));
});

//POST New order
router.post('/', auth, async (req, res) => {
    const { SaleTotal, SaleCoin, PaymentMethod,
        PaymentSuccess, SaleProducts,
        TransactionId, BuyerId } = req.body;
    for (var cartProd of SaleProducts) {
        await Product.findById(cartProd.ProductId)
            .then(async prod => {
                cartProd.SalePrice = prod.ProductPrice;
                cartProd.SaleCoin = prod.PriceCoin;
                cartProd.ProductOptions = cartProd.CartOptions;
                cartProd.ProductImage = prod.ProductImages[0];
                cartProd.ProductName = prod.ProductName;
                prod.Stock = prod.Stock - cartProd.Quantity;
                if (prod.Stock == 0) {
                    prod.Status = "Paused"
                }
                await prod.save()
                    .catch(err => res.status(400).json('Error: ' + err));
            }).catch(err => res.status(400).json('Error: ' + err));
    }
    const newOrder = new Order({
        SaleTotal, SaleCoin, PaymentMethod,
        PaymentSuccess, SaleProducts,
        UserId: res.locals.id, TransactionId, BuyerId
    });
    await newOrder.save()
        .then(ord => res.json(ord))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;