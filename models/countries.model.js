const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const countrySchema = new Schema({
    CountryName: 
    {type: String, required: true },
    Uses:
    {type: Number, required: true, default: 0}
}, {
    timestamps: false,    
});

const Country = mongoose.model('Country', countrySchema);

module.exports = Country;