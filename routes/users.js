const router = require('express').Router();
let User = require('../models/users.model');
const bcrypt = require('bcryptjs');

//GET All
router.route('/').get((req, res) =>{
    User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: '+err));
});

//POST Add user
router.route('/').post((req, res) => {
    const FirstName = req.body.FirstName;
    const LastName = req.body.LastName;
    const EmailAddress = req.body.EmailAddress;
    const BirthDate = req.body.BirthDate;
    const Password = bcrypt.hashSync(req.body.Password);
    const Country = req.body.Country;
    const PhoneNumber = req.body.PhoneNumber;
    const DefaultCoin = "MXN";
    const Role = "User";
    const Status = "Active";
    
    const newUser = new User({
        FirstName, LastName, EmailAddress,
        BirthDate, Password, Country,
        PhoneNumber, DefaultCoin,
        Role, Status
    });

    newUser.save()
    .then(() => res.json('Usuario agregado'))
    .catch(err => res.status(400).json('Error: '+err));
});

//GET ById
router.route('/:id').get((req, res) => {
    User.findById(req.params.id).select("-Password")
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: '+err));
});

//PUT Update ById
router.route('/:id').put((req, res) => {
    User.findById(req.params.id)
    .then(user => {
        user.FirstName = req.body.FirstName;
        user.LastName = req.body.LastName;
        user.EmailAddress = req.body.EmailAddress;
        user.BirthDate = req.body.BirthDate;
        user.Password = bcrypt.hashSync(req.body.Password);
        user.Country = req.body.Country;
        user.PhoneNumber = req.body.PhoneNumber;
        user.DefaultCoin = req.body.DefaultCoin;
        user.Role = req.body.Role;
        user.Status = req.body.Status;

        user.save()
        .then(() => res.json('Usuario actualizado'))
        .catch(err => res.status(400).json('Error: '+err));
    })
    .catch(err => res.status(400).json('Error: '+err));
})

//DELETE ById
router.route('/:id').delete((req, res) => {
    User.findByIdAndDelete(req.params.id)
    .then(() => res.json('Usuario eliminado'))
    .catch(err => res.status(400).json('Error: '+err));
});

module.exports = router;