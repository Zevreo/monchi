const router = require('express').Router();
let Coin = require('../models/currency.model');
let Country = require('../models/countries.model');

//Currency -----
//CodeName      string
//Name          string
//USD           number

//GET All Coins
router.get('/currency', (req, res) => {
    Coin.find().sort('Name')
        .then(coins => res.json(coins))
        .catch(err => res.status(400).json('Error: ' + err));;
});

//GET ByCodeName Coins
router.get('/currency/:CodeName', (req, res) => {
    const { CodeName } = req.params;
    Coin.findOne({ CodeName })
        .then(coin => res.json(coin))
        .catch(err => res.status(400).json('Error: ' + err));
});

//POST Coins
router.post('/currency', (req, res) => {
    const { CodeName, Name, USD } = req.body;
    const newCurrency = new Coin({ CodeName, Name, USD });
    newCurrency.save()
        .then(coin => res.json(coin))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.post('/currency/convert', async (req, res) => {
    const { Current, Target, Value } = req.body;
    var inputCurrent = null;
    var inputTarget = null;
    await Coin.findOne({ CodeName: Current })
        .then(res => { inputCurrent = res.USD })
        .catch(err => res.status(400).json('Error: ' + err));
    await Coin.findOne({ CodeName: Target })
        .then(res => { inputTarget = res.USD })
        .catch(err => res.status(400).json('Error: ' + err));
    const output = (Value * inputTarget) / inputCurrent;
    if(Target == "JPY") res.json({ Target, Value: output.toFixed(0) });
    else res.json({ Target, Value: output.toFixed(2) });
});



//ruta massiva de country


router.post('/countrymass', (request, res) => {
    for(var req of request.body){
        const { CountryName , CountryCode} = req;
        const newCountry = new Country({ CountryName, CountryCode});
        newCountry.save()
            .catch(err => res.status(400).json('Error: ' + err));
    }
    res.json("Done");
});





//GET All Country
router.get('/country', (req, res) => {
    Country.find().sort('CountryName')
        .then(countries => res.json(countries))
        .catch(err => res.status(400).json('Error: ' + err));;
});

//POST Country
router.post('/country', (req, res) => {
    const { CountryName } = req.body;
    const newCountry = new Country({ CountryName, Uses: 0});
    newCountry.save()
        .then(() => res.json("Pais agregado:"+CountryName))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;