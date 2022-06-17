const router = require('express').Router();
let Product = require('../models/products.model');
const bcrypt = require('bcryptjs');
const auth = require('../middleware/auth');

/*
    StoreId: 
    ProductName:
    ProductDescription:
    ProductPrice:
    PriceCoin:
*/

//GET All stores
router.get('/', (req, res) => {
    Product.find()
        .then(stores => res.json(stores))
        .catch(err => res.status(400).json('Error: ' + err));
});

//POST Add store
router.post('/', auth, (req, res) => {
    const StoreId = req.body.StoreId;
    const ProductName = req.body.ProductName;
    const ProductPrice = req.body.ProductPrice;
    const PriceCoin = req.body.PriceCoin;
    const ProductDescription = req.body.ProductDescription;

    const newProduct = new Product({
        StoreId, ProductName, ProductPrice, PriceCoin, ProductDescription
    });
    if (res.locals.Role == "Owner" || res.locals.Role == "Administrator") {
        newProduct.save()
        .then(() => res.json('Producto agregado'))
        .catch(err => res.status(400).json('Error: ' + err));
    }
    else {
        return res.status(401).json('No tienes permiso para hacer eso');
    }
    
});

//GET ById auth
router.get('/:id', (req, res) => {
    Product.findById(req.params.id)
        .then(store => res.json(store))
        .catch(err => res.status(400).json('Error: ' + err));
});

//PUT Update ById auth
router.put('/:id', auth, (req, res) => {
    Store.findById(req.params.id)
        .then(product => {
            if (req.params.OwnerId == res.locals.id || res.locals.Role == "Administrator") {
                product.StoreId = (req.body.StoreId ? req.body.StoreId : product.StoreId);
                product.ProductName = (req.body.ProductName ? req.body.ProductName : product.ProductName);
                product.ProductPrice = (req.body.ProductPrice ? req.body.ProductPrice : product.ProductPrice);
                product.PriceCoin = (req.body.PriceCoin ? req.body.PriceCoin : product.PriceCoin);
                product.ProductDescription = (req.body.ProductDescription ? req.body.ProductDescription : product.ProductDescription);

                product.save()
                    .then(() => res.json('Producto actualizado'))
                    .catch(err => res.status(400).json('Error: ' + err));
            }
            else {
                return res.status(401).json('No tienes permiso para hacer eso');
            }
        })
        .catch(err => res.status(400).json('Error: ' + err));
})

//DELETE ById auth
router.delete('/:id', auth, (req, res) => {
    if (req.params.OwnerId == res.locals.id || res.locals.Role == "Administrator") {
        Product.findByIdAndDelete(req.params.id)
            .then(() => { res.json('Producto eliminado') })
            .catch(err => res.status(400).json('Error: ' + err));
    }
    else {
        return res.status(401).json('No tienes permiso para hacer eso');
    }
});

module.exports = router;