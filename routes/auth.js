const router = require('express').Router();
let User = require('../models/users.model');
const jwt = require('jsonwebtoken');
const config = require('../config/default');
const bcrypt = require('bcryptjs');
const auth = require('../middleware/auth');

router.post('/', (req, res) =>{
    const { EmailAddress, Password } = req.body;
    if( !EmailAddress || !Password ) {
        return res.status(400).json({msg: 'Introduzca todos los campos'});
    }
    User.findOne({ EmailAddress })
    .then(user => {
        if(!user) return res.status(400).json({msg: 'No se encontro el usuario'});
        bcrypt.compare(Password, user.Password)
        .then(isMatch => {
            if(!isMatch) return res.status(400).json({msg: 'Contrasena incorrecta'});
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
router.get('/', auth, (req, res) => {
    User.findById(req.user.id)
    .select('-Password')
    .then(user => res.json(user))
    .catch(err => res.status(400).json('Error: '+err));
});

module.exports = router;