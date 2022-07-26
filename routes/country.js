const router = require('express').Router();
let Country = require('../models/countries.model');

//Country -----
//CountryName   string
//Uses          Number
//timestamps:   false



//GET All Country
router.get('/country', (req, res) => {
    Country.find().sort('Uses')
        .then(countries => res.json(countries))
        .catch(err => res.status(400).json('Error: ' + err));;
});

//POST Country
router.post('/country', (req, res) => {
    const { CountryName } = req.body;
    const newCountry = new Country({ CodeName, Uses: 0});
    newCountry.save()
        .then(() => res.json("Pais agregado:"+CountryName))
        .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;