const {SubAccount} = require("../models/subaccount.model")

//get all
module.exports.allSubAccount = (req, res) => {
    SubAccount.find()
        .then(allSubAcct=>res.json(allSubAcct))
        .catch(err=>res.status(400).json(err))
}

// get one
module.exports.oneSubAccount = (req, res) => {
    SubAccount.findOne({_id: req.params.id})
    .then(oneSubAcct=>res.json(oneSubAcct))
    .catch(err=>res.status(400).json(err))
}

//create
module.exports.addSubAccount = (req, res) => {
    SubAccount.create(req.body)
        .then(addSubAcct=>res.json(addSubAcct))
        .catch(err=>res.status(400).json(err))
}

// update -- getOne + create
module.exports.updateSubAccount = (req, res) => {
    SubAccount.findOneAndUpdate(
        {_id: req.params.id}, // criteria
        req.body, // update info
        {new:true} //options
        // new : true --> return the updated object
    )
        .then(updatedSubAcct=>res.json(updatedSubAcct))
        .catch(err=>res.status(400).json(err))
}

// delete
module.exports.deleteSubAccount = (req, res) => {
    SubAccount.deleteOne({_id: req.params.id})
        .then(status=>res.json(status))
        .catch(err=>res.status(400).json(err))
}