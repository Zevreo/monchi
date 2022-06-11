const router = require('express').Router();
let User = require('../models/users.model');
const bcrypt = require('bcryptjs');
const auth = require('../middleware/auth');

//GET All auth
router.get('/', auth, (req, res) =>{
    User.find().select(["-Password", "-DefaultCoin", "-PhoneNumber", "-BirthDate"])
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: '+err));
});

//POST Add user
router.post('/', (req, res) => {
    const FirstName = req.body.FirstName;
    const LastName = req.body.LastName;
    const EmailAddress = req.body.EmailAddress;
    const BirthDate = req.body.BirthDate;
    const Password = bcrypt.hashSync(req.body.Password);
    const Country = req.body.Country;
    const PhoneNumber = req.body.PhoneNumber;
    const DefaultCoin = req.body.DefaultCoin;
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

//GET ById auth
router.get('/me/:id', auth, (req, res) => {
    User.findById(req.params.id)
    .then(users => {
        if(req.params.id == res.locals.id) {
            res.json(users)
        }
        else{
            return res.status(401).json('No tienes permiso para hacer eso');
        }
    })
    .catch(err => res.status(400).json('Error: '+err));
});

//GET ById auth
router.get('/:id', auth, (req, res) => {
    User.findById(req.params.id).select(["-Password", "-DefaultCoin", "-PhoneNumber", "-EmailAddress", "-Role", "-updatedAt"])
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: '+err));
});

//POST Auth Test
/*
router.post('/auth', (req, res) =>{
    const { EmailAddress, Password } = req.body;
    if( !EmailAddress || !Password ) {
        return res.status(400).json('Introduzca todos los campos');
    }
    User.findOne({ EmailAddress })
    .then(user => {
        if(!user) return res.status(400).json('No se encontro el usuario');
        bcrypt.compare(Password, user.Password)
        .then(isMatch => {
            if(!isMatch) return res.status(400).json('Contraseña incorrecta');
            res.json('Todo correcto')
        })
    })
});
*/

//PUT Update ById auth
router.put('/:id', auth, (req, res) => {
    User.findById(req.params.id)
    .then(user => {
        if(req.params.id == res.locals.id || res.locals.Role == "Administrator"){
            user.FirstName = (req.body.FirstName ? req.body.FirstName : user.FirstName);
            user.LastName = (req.body.LastName ? req.body.LastName : user.LastName);
            user.EmailAddress = (req.body.EmailAddress ? req.body.EmailAddress : user.EmailAddress);
            user.BirthDate = (req.body.BirthDate ? req.body.BirthDate : user.BirthDate);
            user.Password = (req.body.Password ? bcrypt.hashSync(req.body.Password) : user.Password);
            user.Country = (req.body.Country ? req.body.Country : user.Country);
            user.PhoneNumber = (req.body.PhoneNumber ? req.body.PhoneNumber : user.PhoneNumber);
            user.DefaultCoin = (req.body.DefaultCoin ? req.body.DefaultCoin : user.DefaultCoin);
            user.Role = (req.body.Role ? req.body.Role : user.Role);
            user.Status = (req.body.Status ? req.body.Status : user.Status);
    
            user.save()
            .then(() => res.json('Usuario actualizado'))
            .catch(err => res.status(400).json('Error: '+err));
        }
        else{
            return res.status(401).json('No tienes permiso para hacer eso');
        }
    })
    .catch(err => res.status(400).json('Error: '+err));
})

//DELETE ById auth
router.delete('/:id', auth, (req, res) => {
    if(req.params.id == res.locals.id || res.locals.Role == "Administrator"){
        User.findByIdAndDelete(req.params.id)
        .then(() => {res.json('Usuario eliminado')})
        .catch(err => res.status(400).json('Error: '+err));
    }
    else{
        return res.status(401).json('No tienes permiso para hacer eso');
    }
});

module.exports = router;