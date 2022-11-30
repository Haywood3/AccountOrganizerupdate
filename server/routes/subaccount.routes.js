const SubAccountController = require("../controllers/subaccount.controller")

module.exports = (app) => {
    app.get("/api/subaccounts", SubAccountController.allSubAccount);
    app.get("/api/subaccounts/:id", SubAccountController.oneSubAccount);
    app.post("/api/subaccounts", SubAccountController.addSubAccount);
    app.put("/api/subaccounts/:id", SubAccountController.updateSubAccount);
    app.delete("/api/subaccounts/:id", SubAccountController.deleteSubAccount);
}