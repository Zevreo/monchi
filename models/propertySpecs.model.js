
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const specsSchema = new Schema({
    PropertyId: 
    {type: String, required: true },
    Specification: 
    {type: String, required: true },
    Quantity: 
    {type: Number, required: true },
    Linked: 
    {type: Boolean, required: false },
    LinkedSpecId: 
    {type: String, required: false }
}, {
    timestamps: false
});

const Specs = mongoose.model('Specs', specsSchema);

module.exports = Specs;