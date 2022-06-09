const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    FirstName: 
    {type: String, required: true },
    LastName: 
    {type: String, required: true },
    EmailAddress: 
    {type: String, required: true, trim: true },
    BirthDate: 
    {type: String, required: true },
    Password: 
    {type: String, required: true, trim: true },
    Country: 
    {type: String, required: true },
    PhoneNumber: 
    {type: String, required: true },
    DefaultCoin: 
    {type: String, required: true },
    Role: 
    {type: String, required: true },
    Status: 
    {type: String, required: true },
}, {
    timestamps: true,    
});

const User = mongoose.model('User', userSchema);

module.exports = User;