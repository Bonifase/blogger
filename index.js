const express = require('express');
const routes = require('./src/routes/routes');
var cors = require('cors')
const bodyParser = require("body-parser");
const path = require('path');
require("./src/dbConnection")

const app = express();

var port    =   process.env.PORT || 9000;

app.use(cors())
app.use(bodyParser.json());

app.use("/", routes);


app.listen(port, () => console.log(`Server running on port ${port}`))