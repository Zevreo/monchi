const router = require('express').Router();
let Store = require('../models/stores.model');
let User = require('../models/users.model');
const auth = require('../middleware/auth');

/*
OwnerId:
Name:
Country:
Description:
StoreImage:
*/

//GET All stores
router.get('/', (req, res) => {
    Store.find().select(["-OwnerId"])
        .then(stores => res.json(stores))
        .catch(err => res.status(400).json('Error: ' + err));
});

//POST Add store
router.post('/', auth, (req, res) => {
    User.findById(req.body.OwnerId)
        .then(user => {
            user.Role = "Owner";
            user.save()
        })

    const OwnerId = req.body.OwnerId;
    const Name = req.body.Name;
    const Country = req.body.Country;
    const Description = (req.body.Description ? req.body.Description : "No description");
    const StoreImage = (req.body.StoreImage ? req.body.StoreImage : "../../613b38eaa594d30013a82b27.png");

    const newStore = new Store({
        OwnerId, Name, Country, Description, StoreImage
    });
    newStore.save()
        .then(() => res.json('Tienda creada'))
        .catch(err => res.status(400).json('Error: ' + err));

});

//GET ById STORE
router.get('/:id', (req, res) => {
    Store.findById(req.params.id)
        .then(store => res.json(store))
        .catch(err => res.status(400).json('Error: ' + err));
});

//GET ById OWNER
router.get('/owner/:OwnerId', (req, res) => {
    const OwnerId = req.params;
    Store.findOne(OwnerId)
        .then(store => res.json(store))
        .catch(err => res.status(400).json('Error: ' + err));
});

//PUT Update ById auth
router.put('/:id', auth, (req, res) => {
    Store.findById(req.params.id)
        .then(store => {
            if (store.OwnerId == res.locals.id || res.locals.Role == "Administrator") {
                store.OwnerId = (req.body.OwnerId ? req.body.OwnerId : store.OwnerId);
                store.Name = (req.body.Name ? req.body.Name : store.Name);
                store.Description = (req.body.Description ? req.body.Description : store.Description);
                store.StoreImage = (req.body.StoreImage ? req.body.StoreImage : store.StoreImage);
                store.Country = (req.body.Country ? req.body.Country : store.Country);

                store.save()
                    .then(() => res.json('Tienda actualizada'))
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
        Store.findByIdAndDelete(req.params.id)
            .then(() => { res.json('Tienda eliminada') })
            .catch(err => res.status(400).json('Error: ' + err));
    }
    else {
        return res.status(401).json('No tienes permiso para hacer eso');
    }
});

module.exports = router;