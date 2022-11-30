const {Account} = require("../models/account.model")

//get all
module.exports.allAccount = (req, res) => {
    Account.find()
        .then(allAcct=>res.json(allAcct))
        .catch(err=>res.status(400).json(err))
}

// get one
module.exports.oneAccount = (req, res) => {
    Account.findOne({_id: req.params.id})
    .then(oneAcct=>res.json(oneAcct))
    .catch(err=>res.status(400).json(err))
}

//create
module.exports.addAccount = (req, res) => {
    Account.create(req.body)
        .then(addAcct=>res.json(addAcct))
        .catch(err=>res.status(400).json(err))
}

// update -- getOne + create
module.exports.updateAccount = (req, res) => {
    Account.findOneAndUpdate(
        {_id: req.params.id}, // criteria
        req.body, // update info
        {new:true} //options
        // new : true --> return the updated object
    )
        .then(updatedAcct=>res.json(updatedAcct))
        .catch(err=>res.status(400).json(err))
}

// delete
module.exports.deleteAccount = (req, res) => {
    Account.deleteOne({_id: req.params.id})
        .then(status=>res.json(status))
        .catch(err=>res.status(400).json(err))
}