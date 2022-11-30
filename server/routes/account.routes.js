const AccountController = require("../controllers/account.controller")

module.exports = (app) => {
    app.get("/api/accounts", AccountController.allAccount);
    app.get("/api/accounts/:id", AccountController.oneAccount);
    app.post("/api/accounts", AccountController.addAccount);
    app.put("/api/accounts/:id", AccountController.updateAccount);
    app.delete("/api/accounts/:id", AccountController.deleteAccount);
}