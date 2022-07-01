const router = require('express').Router();
let Cart = require('../models/cart.model');
let Product = require('../models/products.model');
const auth = require('../middleware/auth');

module.exports = router;

//POST Add product to cart
router.post('/', auth, (req, res) => {
    const { UserId, ProductId, Quantity} = req.body;
    const newProductCar = new Cart({ UserId, ProductId, Quantity });
    if (res.locals.id == req.body.UserId) {
        newProductCar.save()
            .then(prod => res.json(prod))
            .catch(err => res.status(400).json('Error: ' + err));
    }
    else {

        return res.status(401).json('No estas autenticado');
    }
});

router.get('/:UserId', async (req, res) => {
    const {UserId} = req.params;
    await Cart.find({ UserId: UserId })
        .then(prods => {
            for(var product of prods){
                console.log(product)
                Product.find({id: product.ProductId})
                .then(prod => res.json(prod))
                .catch(err => res.status(400).json('Error: ' + err));
            }
        })
        .catch(err => res.status(400).json('Error: ' + err));
        
});

module.exports = router;