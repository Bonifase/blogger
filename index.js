const express = require('express');
const article = require('./src/routes/article');
const user = require('./src/routes/user');
var cors = require('cors')
const bodyParser = require("body-parser");
const path = require('path');
require("./src/dbConnection")

const app = express();

var port    =   process.env.PORT || 9000;

app.use(cors())
app.use(bodyParser.json());

app.use("/articles", article);
app.use("/users", user);


app.listen(port, () => console.log(`Server running on port ${port}`))
