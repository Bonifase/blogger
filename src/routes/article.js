const express = require('express');
const Article = require('../models/article');
const validateRequest = require("../utilities/validateRequest")
var router = express.Router();
const checkAuth = require('../middleware/checkAuth');

// All articles route (http://localhost:9000/articles)
router.get('/', (req, res) => {
    Article.find()
    .then(articles => res.status(200).json({articles: articles}))
    .catch(err => res.json({error: error.message})) 
});

// Single article route (http://localhost:9000/articles/id)
router.get('/:id', (req, res) => {
    Article.findOne({_id:req.params.id})
    .then(article => res.status(200).json(article))
    .catch(err => res.json({error: error.message})) 
});

// add article route (http://localhost:9000/add-article)
router.post('/add-article', checkAuth, (req, res) => {
    var data = validateRequest(req.body);
    if(!data){
        res.json({message:"Make sure all field have values"})
    }
    data.author = req.user.username; 
    data.authorId = req.user.userId;   
    let article = new Article(data);
    article.save()
    .then(article => res.status(201).json(article))
    .catch(error => console.log(error))    
});

// update article route (http://localhost:9000/articles/id)
router.put('/:id', checkAuth, (req, res) => {
    var data = req.body;
    Article.updateOne({_id:req.params.id}, data)
    .then(() => res.status(201).json({message: "Article updated"}))
    .catch(error => res.status(404).json({error: error}))    
});

// delete article route (http://localhost:9000/articles/id)
router.delete('/:id', checkAuth, (req, res) => {
    var data = req.body;
    Article.deleteOne({_id:req.params.id}, data)
    .then(() => res.status(201).json({message: "Article deleted"}))
    .catch(error => res.status(404).json({error: error.message}))     
});

// comment article route (http://localhost:9000/article/comment)
router.post('/add-comment/:id', checkAuth, (req, res) => {
    let { comment } = req.body;
    let articleId = req.params.id;
    Article.updateOne({_id:articleId}, {
        $push: {
            "comments": {comment: comment, user:"Static_user"}
        }
    }).then(() => res.json({message:"Comment added successfully"}))
    .catch(err => console.log(err))    
});

module.exports = router;

