const express = require('express');
const routes = require('./routes');
var cors = require('cors')
const bodyParser = require("body-parser");
const path = require('path');
require("./dbConnection")

const app = express();
app.use(express.static(path.join(__dirname, "./build")))

var port    =   process.env.PORT || 9000;

app.use(cors())
app.use(bodyParser.json());

app.use("/", routes);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/build/index.html' ));
})

app.listen(port, () => console.log(`Server running on port ${port}`))