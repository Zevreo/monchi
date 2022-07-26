const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const countrySchema = new Schema({
    CountryName: 
    {type: String, required: true },
    CountryCode: 
    {type: String, required: true },
}, {
    timestamps: false,    
});

const Country = mongoose.model('Country', countrySchema);

module.exports = Country;