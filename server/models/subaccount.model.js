const mongoose = require('mongoose');
 
const SubAccountSchema = new mongoose.Schema({
    company: {
        type: String,
        required : [true, "{PATH} is required"],
        minlength : [1, "{PATH} must be at least {MINLENGTH} characters long"]
        },
    frequency : {
        type: String,
        required : [true, "{PATH} is required"],
        minlength : [1, "{PATH} must be at least {MINLENGTH} characters long"]
    },
    active: {
        type: Boolean,
        },
    paysource: {
        type: String,
        required : [true, "{PATH} is required"],
        minlength : [1, "{PATH} must be at least {MINLENGTH} characters long"]
        },
    amount: { 
        type : Number,
        required : [true, "{PATH} is required"],
        min : [0, "{PATH} cannot be less than {MIN}"],
    },
    recuroff: {
        type : Boolean,
    },
}, {timestamps: true});
module.exports.SubAccount = mongoose.model('SubAccount', SubAccountSchema);