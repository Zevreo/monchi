const router = require('express').Router();
let Cart = require('../models/cart.model');
let Product = require('../models/products.model');
const auth = require('../middleware/auth');

//GET Product in cart
router.get('/:UserId', async (req, res) => {
    const { UserId } = req.params;
    var prodsInCar;
    var products = [];
    await Cart.find({ UserId: UserId })
        .then(prods => prodsInCar = prods)
        .catch(err => res.status(400).json('Error: ' + err));
    for (var product of prodsInCar) {
        await Product.findById(product.ProductId)
            .then(prod => products.push({
                CartId: product._id,
                ProductId: prod._id,
                ProductName: prod.ProductName,
                ProductPrice: prod.ProductPrice,
                PriceCoin: prod.PriceCoin,
                Quantity: product.Quantity,
                ProductImages: prod.ProductImages,
                CartOptions: product.ProductOptions.join('/')
            }))
            .catch(err => res.status(400).json('Error: ' + err));
    }
    res.json(products);
});

//POST Add product to cart
router.post('/', auth, (req, res) => {
    const { UserId, ProductId, Quantity, ProductOptions } = req.body;
    const newProductCar = new Cart({ UserId, ProductId, Quantity, ProductOptions });
    if (res.locals.id == req.body.UserId) {
        Cart.findOne({ UserId, ProductId })
            .then(existingProdCart => {
                if (existingProdCart == null) {
                    newProductCar.save()
                        .then(prod => res.json(prod))
                        .catch(err => res.status(400).json('Error: ' + err));
                }
                else {
                    existingProdCart.Quantity = existingProdCart.Quantity + Quantity;
                    existingProdCart.save()
                        .then(prod => res.json(prod))
                        .catch(err => res.status(400).json('Error: ' + err));
                }
            })
            .catch(err => res.status(400).json('Error: ' + err));
    }
    else {
        return res.status(401).json('No estas autenticado');
    }
});

//PATCH Cart Qty
router.patch('/quantity/:id', (req, res) => {
    const { Quantity } = req.body;
    Cart.findById(req.params.id)
        .then(cart => {
            cart.Quantity = Quantity;
            cart.save()
                .then(() => res.json("Cantidad cambiada con exito"));
        })
        .catch(err => res.status(400).json('Error: ' + err));
})

//DELETE CartId
router.delete('/:id', (req, res) => {
    Cart.deleteOne({ _id: req.params.id })
        .then(() => res.json("Removed item succesfully"))
        .catch(err => res.status(400).json('Error: ' + err));
})

router.delete('/user/:id', (req, res) => {
    Cart.deleteMany({ UserId: req.params.id })
        .then(() => res.json("Removed cart succesfully"))
        .catch(err => res.status(400).json('Error: ' + err));
})

module.exports = router;