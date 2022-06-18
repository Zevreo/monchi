const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const currencySchema = new Schema({
    CodeName: 
    {type: String, required: true },
    Name: 
    {type: String, required: true },
    USD:
    {type: Number, required: true }
}, {
    timestamps: false
});

const Currency = mongoose.model('Currency', currencySchema);

module.exports = Currency;