const mongoose = require('mongoose');


const RoleSchema = new mongoose.Schema({
    nom : {type: String, required: true, unique : true},
    status :{type : Number, default:1} // 1 client, 10 boutique, 20 admin
})

module.exports = mongoose.model('Role',RoleSchema);