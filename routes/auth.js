const router = require('express').Router();
let User = require('../models/users.model');
const jwt = require('jsonwebtoken');
const config = require('../config/default');
const bcrypt = require('bcryptjs');
const auth = require('../middleware/auth');
var nodemailer = require('nodemailer');

router.post('/', (req, res) => {
    const { EmailAddress, Password } = req.body;
    if (!EmailAddress || !Password) {
        return res.status(400).json({ msg: 'Introduzca todos los campos' });
    }
    User.findOne({ EmailAddress })
        .then(user => {
            if (!user) return res.status(400).json({ msg: 'No se encontró el usuario' });
            bcrypt.compare(Password, user.Password)
                .then(isMatch => {
                    if (!isMatch) return res.status(400).json({ msg: 'Contraseña incorrecta' });
                    jwt.sign(
                        { id: user.id, Role: user.Role },
                        config.jwtSecret,
                        { expiresIn: 86400 },
                        (err, token) => {
                            if (err) throw err;
                            res.json({
                                token,
                                user: {
                                    id: user.id,
                                    Role: user.Role
                                }
                            })
                        }
                    )
                })
        })
});
router.get('/', auth, (req, res) => {
    User.findById(req.user.id)
        .select('-Password')
        .then(user => res.json(user))
        .catch(err => res.status(400).json('Error: ' + err));
});

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'bleended@gmail.com',
        pass: 'wbdstrmhaivrlxnd'
    }
});

router.post('/forgot', (req, res) => {
    const { EmailAddress } = req.body;
    User.findOne({ EmailAddress })
        .then(user => {
            if (!user) return res.status(400).json({ msg: 'No se encontró el usuario' });
            jwt.sign(
                { id: user.id, Email: user.EmailAddress },
                config.jwtSecret,
                { expiresIn: 1800 },
                (err, token) => {
                    if (err) throw err;
                    var mailOptions = {
                        from: 'zevreo.dev@gmail.com',
                        to: 'bleended@gmail.com',
                        subject: 'Forgot your password',
                        text: `Hello ${user.FirstName} ${user.LastName}\nTo change your password go to:\nhttps://monchi-mern.herokuapp.com/changeForgot/${token}\nYou have 30 minutes until the token expires.`
                    };
                    transporter.sendMail(mailOptions, function (error, info) {
                        if (error) {
                            console.log(error);
                        } else {
                            console.log('Email sent: ' + info.response);
                            res.json("Mail sent to: " + EmailAddress);
                        }
                    });
                }
            )
        })
})

router.post('/spam', (req, res) => {
    const { Email } = req.body;
    var mailOptions = {
        from: 'newsletter@monchi.com',
        to: Email,
        subject: 'Monchi Newsletter',
        text: 'Has sido añadido a la lista de noticias de Monchi'
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
            res.json("Mail sent to: " + EmailAddress);
        }
    });
})

module.exports = router;