const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const storeSchema = new Schema({
    OwnerId: 
    {type: String, required: true },
    Name:
    {type: String, required: true},
    Country:
    {type: String, default: "Unknown"},
    Description:
    {type : String, default: "No description"},
    StoreImage:
    {type: String, default: "../../613b38eaa594d30013a82b27.png"}
}, {
    timestamps: true
});

const Store = mongoose.model('Store', storeSchema);

module.exports = Store;