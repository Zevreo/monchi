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

//GET CountryName Country
router.get('/country/:CountryName', (req, res) => {
    const { CodeName } = req.params;
    Country.findOne({ CountryName })
        .then(countries => res.json(countries))
        .catch(err => res.status(400).json('Error: ' + err));
});

//POST Coins
router.post('/country', (req, res) => {
    const { CodeName, Uses, } = req.body;
    const newCurrency = new  Country({ CodeName,Uses});
    newCurrency.save()
        .then(coin => res.json(Country))
        .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;