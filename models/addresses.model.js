const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const addressSchema = new Schema({
    UserId: 
    {type: String, required: true },
    Street: 
    {type: String, required: true },
    ExternalNum: 
    {type: Number, required: false },
    InternalNum: 
    {type: Number, required: true },
    Country: 
    {type: String, required: true },
    State: 
    {type: String, required: true },
    City:
    {type: String, required: true},
    Postcode: 
    {type: Number, required: true },
    References: 
    {type: String, required: true },
    Surname: 
    {type: String, required: true },
    Default: 
    {type: Boolean, required: true },
}, {
    timestamps: true,    
});

const Address = mongoose.model('Address', addressSchema);

module.exports = Address;