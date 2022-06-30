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
    res.json({ Target, Value: output.toFixed(2) });
});

module.exports = router;