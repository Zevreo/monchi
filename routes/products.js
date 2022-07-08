const router = require('express').Router();
let Product = require('../models/products.model');
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
    const { page = 1, limit = 12, sort = "updatedAt", order = -1 } = req.headers;
    if (page < 1) page = 1;
    if (limit < 1) limit = 12;
    if (sort != "updatedAt" && sort != "ProductPrice") sort = "updatedAt";
    const count = await Product.find().countDocuments();
    res.set({
        'x-page': page, 'x-count': count,
        'x-limit': limit, 'x-sort': sort
    })
    await Product.find().sort({ [sort]: order })
        .limit(limit * 1).skip((page - 1) * limit)
        .then(products => res.json(products))
        .catch(err => res.status(400).json('Error: ' + err));
});

//GET Search name, description, tags
router.get('/search/:search', async (req, res) => {
    const { search } = req.params;

    await Product.find({ 
        $or: [{ ProductName: { $regex: new RegExp(search, 'i') } },
        { ProductDescription: { $regex: new RegExp(search, 'i') } },
        {Tags:{ $regex:new RegExp(search,'i') } }] 
    })
        .then(products => res.json(products))
        .catch(err => res.status(400).json('Error: ' + err));
});
// get by presio
router.get('/searchbyprecio/:precio', async (req, res) => {
    const { precio } = req.params;

    await Product.find({ 
        $or: [{ ProductPrice: { $regex: new RegExp( precio>=(precio-precio*.10), precio=(precio+precio*.10) , 'i') } },
        { ProductPrice: { $regex: new RegExp(search, 'i') } },
        {Tags:{ $regex:new RegExp(precio,'i') } }] 
    })
        .then(products => res.json(products))
        .catch(err => res.status(400).json('Error: ' + err));
});

//GET All ByStore
router.get('/store/:StoreId', async (req, res) => {
    const StoreId = req.params.StoreId;
    const { page = 1, limit = 12, sort = "updatedAt", order = -1 } = req.headers;
    if (page < 1) page = 1;
    if (limit < 1) limit = 12;
    if (sort != "updatedAt" && sort != "ProductPrice") sort = "updatedAt";
    const count = await Product.find({ StoreId: StoreId }).countDocuments();
    res.set({
        'x-page': page, 'x-count': count,
        'x-limit': limit, 'x-sort': sort
    })
    await Product.find({ StoreId: StoreId }).sort({ [sort]: order })
        .limit(limit * 1).skip((page - 1) * limit)
        .then(products => res.json(products))
        .catch(err => res.status(400).json('Error: ' + err));
});

//POST Add product
router.post('/', auth, (req, res) => {
    const { StoreId, ProductName, ProductPrice, ProductDescription, tags, PriceCoin, Stock } = req.body;
    const ProductImage = (req.body.ProductImage ? req.body.ProductImage : "../../613b38eaa594d30013a82b27.png");
    const newProduct = new Product({
        StoreId, ProductName, ProductPrice,
        PriceCoin, ProductDescription,
        ProductImages: [ProductImage],
        Tags: tags.split(','), Stock, Status: "Active"
    });
    if (res.locals.Role == "Owner") {
        newProduct.save()
            .then(prod => res.json(prod))
            .catch(err => res.status(400).json('Error: ' + err));
    }
    else return res.status(401).json('No tienes permiso para hacer eso');
});

//PUT Edit base product
router.put('/:id', auth, (req, res) => {
    if (res.locals.Role == "Owner") {
        Product.findById(req.params.id)
            .then(product => {
                product.ProductName = (req.body.ProductName ? req.body.ProductName : product.ProductName);
                product.ProductPrice = (req.body.ProductPrice ? req.body.ProductPrice : product.ProductPrice);
                product.PriceCoin = (req.body.PriceCoin ? req.body.PriceCoin : product.PriceCoin);
                product.ProductDescription = (req.body.ProductDescription ? req.body.ProductDescription : product.ProductDescription);
                product.Stock = (req.body.Stock ? parseInt(parseInt(product.Stock) + parseInt(req.body.Stock)) : product.Stock);
                product.Status = (req.body.Status ? req.body.Status : product.Status);

                product.save()
                    .then(prod => res.json(prod))
                    .catch(err => res.status(400).json('Error: ' + err));

            })
            .catch(err => res.status(400).json('Error: ' + err));
    }
    else {
        return res.status(401).json('No tienes permiso para hacer eso');
    }
});

//GET ById
router.get('/:id', (req, res) => {
    Product.findById(req.params.id)
        .then(prod => res.json(prod))
        .catch(err => res.status(400).json('Error: ' + err));
});

//GET Tags ById
router.get('/tags/:id', (req, res) => {
    Product.findById(req.params.id)
        .then(prod => res.json(prod.Tags))
        .catch(err => res.status(400).json('Error: ' + err));
});

//GET Images ById
router.get('/images/:id', (req, res) => {
    Product.findById(req.params.id)
        .then(prod => res.json(prod.ProductImages))
        .catch(err => res.status(400).json('Error: ' + err));
});

//PUT Add tag
router.put('/addTag/:id', (req, res) => {
    const tag = req.body.tag;
    Product.findById(req.params.id)
        .then(prod => {
            prod.Tags.push(tag);
            prod.save().then(edited => res.json(edited));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

//PUT Remove tag
router.put('/removeTag/:id', (req, res) => {
    const tagIndex = req.body.tagIndex;
    Product.findById(req.params.id)
        .then(prod => {
            prod.Tags.splice(tagIndex, 1);
            prod.save().then(edited => res.json(edited));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

//PUT Add image
router.put('/addImage/:id', (req, res) => {
    const ProductImage = req.body.ProductImage;
    Product.findById(req.params.id)
        .then(prod => {
            prod.ProductImages.push(ProductImage);
            prod.save().then(edited => res.json(edited));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

//PUT Remove image
router.put('/removeImage/:id', async (req, res) => {
    const imageIndex = req.body.imageIndex;
    await Product.findById(req.params.id)
        .then(prod => {
            if (prod.ProductImages.length > 1) {
                prod.ProductImages.splice(imageIndex, 1);
                prod.save().then(edited => res.json(edited));
            }
            else {
                prod.ProductImages[0] = "../../613b38eaa594d30013a82b27.png";
                prod.save().then(edited => res.json(edited));
            }

        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;