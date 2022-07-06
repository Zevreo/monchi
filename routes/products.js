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
                    ProductImage: product.ProductImage,
                    Tags: productTags,
                    Modified: product.updatedAt
                };
                productsWithTags.push(prod)
            })
            .catch(err => res.status(400).json('Error: ' + err));
    }
    res.json(productsWithTags);
});

//GET Search name, description, tags
router.get('/search/:search', async (req, res) => {
    const { search } = req.params;
    var productsWithTags = [];
    var prods = [];
    var tagsToFind = [];
    var prodFromTags = [];
    await Product.find({ $or: [{ ProductName: { $regex: new RegExp(search, 'i') } }, { ProductDescription: { $regex: new RegExp(search, 'i') } }] })
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
                    ProductImage: product.ProductImage,
                    Tags: productTags,
                    Modified: product.updatedAt
                };
                productsWithTags.push(prod)
            })
            .catch(err => res.status(400).json('Error: ' + err));
    }
    await Tag.find({ Tags: { $regex: new RegExp(search, 'i') } })
        .then(tags => { tagsToFind = tags }).catch(err => res.status(400).json('Error: ' + err));
    if (tagsToFind.length > 0) {
        for (var tag of tagsToFind) {
            await Product.findOne({ _id: tag.ProductId })
                .then(prod => { prodFromTags.push(prod) })
                .catch(err => res.status(400).json('Error: ' + err));
        }
        if (prodFromTags.length > 1) {
            for (var prod of prodFromTags) {
                await Tag.find({ ProductId: prod.id }).select("Tags -_id")
                    .then(tagsX => {
                        var productTags = [];
                        for (var tagX of tagsX) {
                            productTags.push(tagX.Tags);
                        }
                        var product = {
                            _id: prod.id,
                            StoreId: prod.StoreId,
                            ProductName: prod.ProductName,
                            ProductDescription: prod.ProductDescription,
                            ProductPrice: prod.ProductPrice,
                            PriceCoin: prod.PriceCoin,
                            ProductImage: prod.ProductImage,
                            Tags: productTags,
                            Modified: prod.updatedAt
                        };
                        if (!(productsWithTags.filter(e => e._id === product._id).length > 0)) {
                            productsWithTags.push(product);
                        }
                    })
                    .catch(err => res.status(400).json('Error: ' + err));
            }
        }
    }
    res.json(productsWithTags);
});
// get by presio
router.get('/searchbyprice/:search', async (req, res) => {
    const { search } = req.params;
    var productsWithTags = [];
    var prods = [];
    var tagsToFind = [];
    var prodFromTags = [];
    await Product.find({ ProductPrice: search }) 
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
                    ProductImage: product.ProductImage,
                    Tags: productTags,
                    Modified: product.updatedAt
                };
                productsWithTags.push(prod)
            })
            .catch(err => res.status(400).json('Error: ' + err));
    }
    await Tag.find({ Tags: { $regex: new RegExp(search, 'i') } })
        .then(tags => { tagsToFind = tags }).catch(err => res.status(400).json('Error: ' + err));
    if (tagsToFind.length > 0) {
        for (var tag of tagsToFind) {
            await Product.findOne({ _id: tag.ProductId })
                .then(prod => { prodFromTags.push(prod) })
                .catch(err => res.status(400).json('Error: ' + err));
        }
        if (prodFromTags.length > 1) {
            for (var prod of prodFromTags) {
                await Tag.find({ ProductId: prod.id }).select("Tags -_id")
                    .then(tagsX => {
                        var productTags = [];
                        for (var tagX of tagsX) {
                            productTags.push(tagX.Tags);
                        }
                        var product = {
                            _id: prod.id,
                            StoreId: prod.StoreId,
                            ProductName: prod.ProductName,
                            ProductDescription: prod.ProductDescription,
                            ProductPrice: prod.ProductPrice,
                            PriceCoin: prod.PriceCoin,
                            ProductImage: prod.ProductImage,
                            Tags: productTags,
                            Modified: prod.updatedAt
                        };
                        if (!(productsWithTags.filter(e => e._id === product._id).length > 0)) {
                            productsWithTags.push(product);
                        }
                    })
                    .catch(err => res.status(400).json('Error: ' + err));
            }
        }
    }
    res.json(productsWithTags);
});

//GET All ByStore
router.get('/store/:StoreId', async (req, res) => {
    const StoreId = req.params.StoreId;
    const { page = 1, limit = 12, sort = "updatedAt", order = -1 } = req.headers;
    if (page < 1) {
        page = 1;
    }
    if (limit < 1) {
        limit = 12;
    }
    if (sort != "updatedAt" && sort != "ProductPrice") {
        sort = "updatedAt";
    }
    const count = await Product.find({ StoreId: StoreId }).countDocuments();
    var productsWithTags = [];
    var prods = null;
    await Product.find({ StoreId: StoreId }).sort({ [sort]: order })
        .limit(limit * 1).skip((page - 1) * limit)
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
                    ProductImage: product.ProductImage,
                    Tags: productTags,
                    Modified: product.updatedAt
                };
                productsWithTags.push(prod)
            })
            .catch(err => res.status(400).json('Error: ' + err));
    }
    res.set({
        'x-page': page,
        'x-count': count,
        'x-limit': limit,
        'x-sort': sort
    })
    res.json(productsWithTags);
});

//POST Add product with tags
router.post('/', auth, (req, res) => {
    const { StoreId, ProductName, ProductPrice, ProductDescription } = req.body;
    const PriceCoin = (req.body.PriceCoin ? req.body.PriceCoin : "USD");
    const ProductImage = (req.body.ProductImage ? req.body.ProductImage : "../../613b38eaa594d30013a82b27.png");
    const newProduct = new Product({ StoreId, ProductName, ProductPrice, PriceCoin, ProductDescription, ProductImage });
    const newProductID = newProduct._id;
    const { tags } = req.body;
    const tagsSplit = tags.split(',');
    if (res.locals.Role == "Owner") {
        for (var tag of tagsSplit) {
            const newTag = new Tag({ ProductId: `${newProductID}`, Tags: `${tag}` });
            newTag.save()
                .catch(err => res.status(400).json('Error: ' + err));
        }
        newProduct.save()
            .then(prod => res.json(prod))
            .catch(err => res.status(400).json('Error: ' + err));
    }
    else {
        return res.status(401).json('No tienes permiso para hacer eso');
    }
});

//GET ById
router.get('/:id', async (req, res) => {
    await Product.findById(req.params.id)
        .then(prod => {
            Tag.find({ ProductId: prod.id }).select("Tags -_id")
                .then(tags => {
                    var productTags = [];
                    for (var tag of tags) {
                        productTags.push(tag.Tags);
                    }
                    var product = {
                        _id: prod.id,
                        StoreId: prod.StoreId,
                        ProductName: prod.ProductName,
                        ProductDescription: prod.ProductDescription,
                        ProductPrice: prod.ProductPrice,
                        PriceCoin: prod.PriceCoin,
                        ProductImage: prod.ProductImage,
                        Tags: productTags,
                        Modified: prod.updatedAt
                    };
                    res.json(product);
                })
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

//GET ById For Edit
router.get('/edit/:id', async (req, res) => {
    await Product.findById(req.params.id)
        .then(prod => {
            Tag.find({ ProductId: prod.id }).select("Tags -_id")
                .then(tags => {
                    var tagsNoTitle = [];
                    for (var tag of tags) {
                        tagsNoTitle.push(tag.Tags);
                    }
                    var product = {
                        _id: prod.id,
                        StoreId: prod.StoreId,
                        ProductName: prod.ProductName,
                        ProductDescription: prod.ProductDescription,
                        ProductPrice: prod.ProductPrice,
                        PriceCoin: prod.PriceCoin,
                        ProductImage: prod.ProductImage,
                        Tags: tagsNoTitle.join(),
                        Modified: prod.updatedAt
                    };
                    res.json(product);
                })
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

//PUT Update ById auth
router.put('/:id', auth, async (req, res) => {
    if (res.locals.Role == "Owner") {
        Product.findById(req.params.id)
            .then(product => {
                product.StoreId = (req.body.StoreId ? req.body.StoreId : product.StoreId);
                product.ProductName = (req.body.ProductName ? req.body.ProductName : product.ProductName);
                product.ProductPrice = (req.body.ProductPrice ? req.body.ProductPrice : product.ProductPrice);
                product.PriceCoin = (req.body.PriceCoin ? req.body.PriceCoin : product.PriceCoin);
                product.ProductDescription = (req.body.ProductDescription ? req.body.ProductDescription : product.ProductDescription);
                product.ProductImage = (req.body.ProductImage ? req.body.ProductImage : product.ProductImage);
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

//Get Tags
router.get('/tags/:ProductID', async (req, res) => {
    Tag.find({ ProductId: req.params.ProductID }).select("Tags")
        .then(tags => res.json(tags))
        .catch(err => res.status(400).json('Error: ' + err));
});

//Delete Tag
router.delete('/tag/:id', (req, res) => {
    Tag.findByIdAndDelete(req.params.id)
        .then(() => res.json('Tag eliminado'))
        .catch(err => res.status(400).json('Error: ' + err));
});

//Post Tag
router.post('/tag', (req, res) => {
    const { tag, ProductID } = req.body;
    const newTag = new Tag({ ProductId: ProductID, Tags: tag });
    newTag.save()
        .then(() => res.json('Tag agregado'))
        .catch(err => res.status(400).json('Error: ' + err));
});

/*
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