// Everything here stays the same except line noted
const express = require("express")
const app = express()
const cors = require('cors')
const port = 8000

require("./configs/mongoose.config")

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require("./routes/account.routes")(app) //this will change/job.routes/
require("./routes/subaccount.routes")(app)

app.listen(8000, () => console.log(`We hear you loud and clear on port: 8000`) );