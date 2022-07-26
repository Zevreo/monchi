const router = require('express').Router();
let User = require('../models/users.model');
const jwt = require('jsonwebtoken');
const config = require('../config/default');
const bcrypt = require('bcryptjs');
const auth = require('../middleware/auth');
const forgot = require('../middleware/forgot');
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'bleended@gmail.com',
        pass: 'wbdstrmhaivrlxnd'
    }
});

//GET All auth
router.get('/', auth, (req, res) => {
    User.find().select(["-Password", "-DefaultCoin", "-PhoneNumber", "-BirthDate"])
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
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
    const Status = "Pending";

    const newUser = new User({
        FirstName, LastName, EmailAddress,
        BirthDate, Password, Country,
        PhoneNumber, DefaultCoin,
        Role, Status
    });

    newUser.save()
        .then(() => {
            jwt.sign(
                { id: newUser.id, Email: newUser.EmailAddress },
                config.jwtSecret,
                { expiresIn: 259200 },
                (err, token) => {
                    if (err) throw err;
                    var mailOptions = {
                        from: 'zevreo.dev@gmail.com',
                        to: '19393060@utcancun.edu.mx',
                        subject: 'Please confirm your e-mail',
                        text: `Hello ${newUser.FirstName} ${newUser.LastName}\nTo confirm your e-mail go to:\nhttps://monchi-mern.herokuapp.com/confirmMail/${token}\nYou have 72 hours until the token expires.`
                    };
                    transporter.sendMail(mailOptions, function (error, info) {
                        if (error) {
                            console.log(error);
                        } else {
                            console.log('Email sent: ' + info.response);
                            res.json("Correo de confirmacion enviado a: " + EmailAddress);
                        }
                    });
                }
            )
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

//GET ById auth
router.get('/me/:id', auth, (req, res) => {
    User.findById(req.params.id)
        .then(user => {
            if (req.params.id == res.locals.id) {
                res.json(user)
            }
            else {
                return res.status(401).json('No tienes permiso para hacer eso');
            }
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

//GET ById auth
router.get('/:id', auth, (req, res) => {
    User.findById(req.params.id).select(["-Password", "-DefaultCoin", "-PhoneNumber", "-EmailAddress", "-Role", "-updatedAt"])
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

//PUT Update ById auth
router.put('/:id', auth, (req, res) => {
    User.findById(req.params.id)
        .then(user => {
            if (req.params.id == res.locals.id || res.locals.Role == "Administrator") {
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
    if (req.params.id == res.locals.id || res.locals.Role == "Administrator") {
        User.findByIdAndDelete(req.params.id)
            .then(() => { res.json('Usuario eliminado') })
            .catch(err => res.status(400).json('Error: ' + err));
    }
    else {
        return res.status(401).json('No tienes permiso para hacer eso');
    }
});

router.patch('/password', forgot, (req, res) => {
    const { id, EmailAddress } = res.locals;
    const { newPassword } = req.body;
    User.findById(id)
        .then(user => {
            user.Password = bcrypt.hashSync(newPassword);
            user.save()
                .then(() => res.json("Password cambiada"))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

router.patch('/credentials/:id', auth, (req, res) => {
    if (req.params.id == res.locals.id) {
        const { newPassword, newEmail } = req.body;
        User.findById(req.params.id)
            .then(user => {
                user.EmailAddress = newEmail;
                user.Password = bcrypt.hashSync(newPassword);
                user.save()
                    .then(() => res.json("Credenciales cambiadas"))
                    .catch(err => res.status(400).json('Error: ' + err));
            })
            .catch(err => res.status(400).json('Error: ' + err));
    }
    else {
        return res.status(401).json('No tienes permiso para hacer eso');
    }
})

router.patch('/confirmEmail', forgot, (req, res) => {
    User.findById(res.locals.id)
        .then(user => {
            user.Status = "Active";
            user.save()
                .then(() => res.json("Correo confirmado"));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

router.post('/resendEmail', (req, res) => {
    const { EmailAddress } = req.body;
    User.findOne({ EmailAddress })
        .then(user => {
            jwt.sign(
                { id: user.id, Email: user.EmailAddress },
                config.jwtSecret,
                { expiresIn: 259200 },
                (err, token) => {
                    if (err) throw err;
                    var mailOptions = {
                        from: 'zevreo.dev@gmail.com',
                        to: '19393060@utcancun.edu.mx',
                        subject: 'Please confirm your e-mail',
                        text: `Hello ${user.FirstName} ${user.LastName}\nTo cconfirm your e-mail go to:\nhttps://monchi-mern.herokuapp.com/confirmMail/${token}\nYou have 72 hours until the token expires.`
                    };
                    transporter.sendMail(mailOptions, function (error, info) {
                        if (error) {
                            console.log(error);
                        } else {
                            console.log('Email sent: ' + info.response);
                            res.json("Correo de confirmacion enviado a: " + EmailAddress);
                        }
                    });
                }
            )
        })
});

module.exports = router;