const mongoose = require("mongoose");

var Schema = new mongoose.Schema({
    title: {type:String, required:true},
    body: {type: String, required: true},
    author: {type: String, required: true},
    category: {type: String, enum: ['JavaScript', 'Python', 'C++']}
}, { timestamps: true});

Schema.statics.save = async (article) => {
    var Article = new this(car);
    var result =  await Article.save(article);
    return result;
}

module.exports = mongoose.model('Article', Schema);