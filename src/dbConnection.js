const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/blogApp";
const options = { 
    useNewUrlParser: true
};

mongoose.connect(mongoURI, options)
.then(() => console.log("Database is connected succesfully!!"))
.catch((err) => console.log("Database connection failed. Contact your database admin"+ err));
;

