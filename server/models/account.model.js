const mongoose = require('mongoose');
 
const AccountSchema = new mongoose.Schema({
    company: {
        type: String,
        required : [true, "{PATH} is required"],
        minlength : [1, "{PATH} must be at least {MINLENGTH} characters long"]
        },
    category: {
        type: String,
        required : [true, "{PATH} is required"],
        minlength : [1, "{PATH} must be at least {MINLENGTH} characters long"]
        },
    statement: {
        type: Boolean,
        },
    autopay: {
        type: Boolean,
        },
    paidoff: {
        type : Boolean,
    },
    paymethod: {
        type: String,
        required : [true, "{PATH} is required"],
        minlength : [1, "{PATH} must be at least {MINLENGTH} characters long"]
        },
    frequency : {
        type: String,
        required : [true, "{PATH} is required"],
        minlength : [1, "{PATH} must be at least {MINLENGTH} characters long"]
    },
    limit: {
        type : Number,
        min : [0, "{PATH} cannot be less than {MIN}"],
    },
    duedate: {
        type : String,
        required : [true, "{PATH} is required"],
        minlength : [1, "{PATH} must be at least {MINLENGTH} characters long"]
    },
    payment: { 
        type : Number,
        required : [true, "{PATH} is required"],
        min : [0, "{PATH} cannot be less than {MIN}"],
    },
    owe: {
        type : Number,
        min : [0, "{PATH} cannot be less than {MIN}"],
    },
    website: {
        type : String
    }
}, {timestamps: true});
module.exports.Account = mongoose.model('Account', AccountSchema);