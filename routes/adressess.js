const router = require('express').Router();
let Address = require('../models/addresses.model');
const auth = require('../middleware/auth');

/*
    UserId:
    Street:
    ExternalNum:
    InternalNum:
    Country:
    State:
    City:
    Postcode:
    References:
    Surname:
    Default: 
*/
//GET User's Addressess
router.get('/my/:UserId', auth, (req, res) => {
    const UserId = req.params.UserId;
    Address.find({ UserId })
        .then(addressess => res.json(addressess))
        .catch(err => res.status(400).json('Error: ' + err));
});

//POST Add store
router.post('/', auth, (req, res) => {
    const UserId = res.locals.id;
    var Default = true;
    Address.findOne({ $and: [{ UserId }, { Default }] })
        .then(address => {
            if (address != null) {
                Default = false;
            }
            const Street = req.body.Street;
            const ExternalNum = req.body.ExternalNum;
            const InternalNum = req.body.InternalNum;
            const Country = req.body.Country;
            const State = req.body.State;
            const City = req.body.City;
            const Postcode = req.body.Postcode;
            const References = req.body.References;
            const Surname = req.body.Surname;
            const newAddress = new Address({
                UserId, Street, ExternalNum, InternalNum,
                Country, State, City, Postcode,
                References, Surname, Default
            });
            if (req.body.UserId == res.locals.id) {
                newAddress.save()
                    .then(() => res.json('Direccion agregada'))
                    .catch(err => res.status(400).json('Error: ' + err));
            }
            else {
                return res.status(401).json('No tienes permiso para hacer eso');
            }
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

//GET ById Address
router.get('/:id', (req, res) => {
    Address.findById(req.params.id)
        .then(address => res.json(address))
        .catch(err => res.status(400).json('Error: ' + err));
});

//PUT Update ById auth
router.put('/:id', auth, (req, res) => {
    Address.findById(req.params.id)
        .then(address => {
            if (req.params.UserId == res.locals.id) {
                address.Street = (req.body.Street ? req.body.Street : address.Street);
                address.ExternalNum = (req.body.ExternalNum ? req.body.ExternalNum : address.ExternalNum);
                address.InternalNum = (req.body.InternalNum ? req.body.InternalNum : address.InternalNum);
                address.Country = (req.body.Country ? req.body.Country : address.Country);
                address.State = (req.body.State ? req.body.State : address.State);
                address.City = (req.body.City ? req.body.City : address.City);
                address.Postcode = (req.body.Postcode ? req.body.Postcode : address.Postcode);
                address.References = (req.body.References ? req.body.References : address.References);
                address.Surname = (req.body.Surname ? req.body.Surname : address.Surname);
                address.Default = (req.body.Default ? req.body.Default : address.Default);

                address.save()
                    .then(() => res.json('Direccion actualizada'))
                    .catch(err => res.status(400).json('Error: ' + err));
            }
            else {
                return res.status(401).json('No tienes permiso para hacer eso');
            }
        })
        .catch(err => res.status(400).json('Error: ' + err));
})

//PUT Change default
router.put('/default/:id', auth, (req, res) => {
    const UserId = req.body.UserId;
    const Default = true;
    Address.findOne({ $and: [{ UserId }, { Default }] })
        .then(address => {
            const id = address.id;
            Address.findById(id)
                .then(address => {
                    address.Default = false;
                    address.save()
                        .then(() => console.log('Direccion actualizada'))
                        .catch(err => console.log('Error1: ' + err));
                })
                .catch(err => console.log('Error2: ' + err));
        })
        .catch(err => console.log('Error3: ' + err));
    Address.findById(req.params.id)
        .then(address => {
            address.Default = true;
            address.save()
                .then(() => res.json('Direccion actualizada'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

//DELETE ById auth
router.delete('/:id', auth, (req, res) => {
    Address.findByIdAndDelete(req.params.id)
        .then(() => { res.json('Direccion eliminada') })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;