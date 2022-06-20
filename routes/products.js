const router = require('express').Router();
let Product = require('../models/products.model');
let Tag = require('../models/productTags.model');
let Props = require('../models/productProperties.model');
let Specs = require('../models/propertySpecs.model');
const auth = require('../middleware/auth');

/*
    StoreId: 
    ProductName:
    ProductDescription:
    ProductPrice:
    PriceCoin:
*/

//GET All products with tags
router.get('/', async (req, res) => {
    var productsWithTags = [];
    var prods = null;
    await Product.find()
        .then(products => { prods = products })
        .catch(err => res.status(400).json('Error: ' + err));
    for (var prod of prods) {
        await Tag.find({ ProductId: prod.id }).select("Tags -_id")
            .then(tags => {
                productsWithTags.push({ prod, tags })
            })
            .catch(err => res.status(400).json('Error: ' + err));;
        console.log(productsWithTags);
    }
    res.json(productsWithTags);
});

//GET All ByStore
router.get('/store/:StoreId', async (req, res) => {
    const StoreId = req.params.StoreId;
    var productsWithTags = [];
    var prods = null;
    await Product.find({ StoreId: StoreId })
        .then(products => { prods = products })
        .catch(err => res.status(400).json('Error: ' + err));
    for (var product of prods) {
        await Tag.find({ ProductId: product.id }).select("Tags -_id")
            .then(tags => {
                var productTags = [];
                for (var tag of tags) {
                    productTags.push(tag.Tags);
                }
                var prod = {
                    _id: product.id,
                    StoreId: product.StoreId,
                    ProductName: product.ProductName,
                    ProductDescription: product.ProductDescription,
                    ProductPrice: product.ProductPrice,
                    PriceCoin: product.PriceCoin,
                    Tags: productTags,
                    Modified: product.updatedAt
                };
                productsWithTags.push(prod)
            })
            .catch(err => res.status(400).json('Error: ' + err));;
    }
    res.json(productsWithTags);
});

//POST Add product with tags
router.post('/', auth, (req, res) => {
    const { StoreId, ProductName, ProductPrice, PriceCoin, ProductDescription } = req.body;
    const newProduct = new Product({ StoreId, ProductName, ProductPrice, PriceCoin, ProductDescription });
    const newProductID = newProduct._id;
    const { tags } = req.body;
    const tagsSplit = tags.split(',');
    for (var tag of tagsSplit) {
        const newTag = new Tag({ ProductId: `${newProductID}`, Tags: `${tag}` });
        newTag.save()
            .catch(err => res.status(400).json('Error: ' + err));
    }
    if (res.locals.Role == "Owner") {
        newProduct.save()
            .then(prod => res.json(prod))
            .catch(err => res.status(400).json('Error: ' + err));
    }
    else {
        return res.status(401).json('No tienes permiso para hacer eso');
    }
});

//GET ById
router.get('/:id', (req, res) => {
    Product.findById(req.params.id)
        .then(prod => {
            Tag.find({ ProductId: `${prod._id}` }).select("Tags")
                .then(tags => res.json({ prod, tags }))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});
/*
//PUT Update ById auth
router.put('/:id', auth, (req, res) => {
    Store.findById(req.params.id)
        .then(product => {
            if (req.params.OwnerId == res.locals.id) {
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
*/
module.exports = router;