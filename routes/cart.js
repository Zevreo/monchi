const router = require('express').Router();
let Cart = require('../models/cart.model');
let Product = require('../models/products.model');
const auth = require('../middleware/auth');

module.exports = router;

//POST Add product to cart
router.post('/', auth, async (req, res) => {
    const { UserId, ProductId, Quantity} = req.body;
    const newProductCar = new Cart({ UserId, ProductId, Quantity });
    if (res.locals.id == req.body.UserId) {
        console.log(await Cart.exists({UserId: UserId, ProductId: ProductId}));
        if(!Cart.exists({UserId: UserId, ProductId: ProductId})){
            newProductCar.save()
            .then(prod => res.json(prod))
            .catch(err => res.status(400).json('Error: ' + err));
        }
        else{
            Cart.findOne({UserId: UserId, ProductId: ProductId})
            .then(product => {
                console.log(product);
                product.Quantity = product.Quantity+1;
                product.save()
                .then(prod => res.json(prod))
                .catch(err => res.status(400).json('Error: ' + err));
            }).catch(err => res.status(400).json('Error: ' + err));
        }
    }
    else {

        return res.status(401).json('No estas autenticado');
    }
});

router.get('/:UserId', async (req, res) => {
    const {UserId} = req.params;
    var prodsInCar;
    var products = [];
    await Cart.find({ UserId: UserId })
        .then(prods => prodsInCar = prods)
        .catch(err => res.status(400).json('Error: ' + err));
    for(var product of prodsInCar){
        await Product.findById(product.ProductId)
            .then(prod => products.push({
                CartId: product._id,
                ProductId: prod._id,
                ProductName: prod.ProductName,
                ProductPrice: prod.ProductPrice,
                PriceCoin: prod.PriceCoin,
                Quantity: product.Quantity,
                ProductImage: prod.ProductImage
            }))
            .catch(err => res.status(400).json('Error: ' + err));
    }
    res.json(products);
});

module.exports = router;