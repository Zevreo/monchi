const router = require('express').Router();
let User = require('../models/users.model');
const jwt = require('jsonwebtoken');
const config = require('../config/default');
const bcrypt = require('bcryptjs');
const auth = require('../middleware/auth')

router.post('/', (req, res) =>{
    const { EmailAddress, Password } = req.body;
    if( !EmailAddress || !Password ) {
        return res.status(400).json('Introduzca todos los campos');
    }
    User.findOne({ EmailAddress })
    .then(user => {
        if(!user) return res.status(400).json('No se encontro el usuario');
        bcrypt.compare(Password, user.Password)
        .then(isMatch => {
            if(!isMatch) return res.status(400).json('Contrasena incorrecta');
            jwt.sign(
                { id: user.id, Role: user.Role },
                config.jwtSecret,
                { expiresIn: 86400 },
                (err, token) => {
                    if(err) throw err;
                    res.json({
                        token,
                        user: {
                            id:user.id,
                            Role:user.Role
                        }
                    })
                }
            )
        })
    })
});

module.exports = router;