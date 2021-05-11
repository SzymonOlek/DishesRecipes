'use strict';

var mongoose = require('mongoose'),
    Comment = mongoose.model('Comments'),
    Recipe = mongoose.model('Recipes');

exports.list_all_comments = function(req, res) {
    Comment.find({}, function(err, comments) {
        if (err){
            res.status(500).send(err);
        }
        else{
            res.json(comments);
        }
    });
};

exports.read_a_comment = function(req, res) {
    Comment.findById(req.params.commentId, function(err, comment) {
        if (err){
            res.status(500).send(err);
        }
        else{
            res.json(comment);
        }
    });
};

exports.list_all_comments_of_recipe = function (req, res) {
    Recipe.find({
        "_id": req.params.recipeId,
    }, function (err, recipe) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(recipe[0].comment);
        }
    });
};

exports.create_a_comment_of_recipe = function (req, res) {
    Recipe.find({
        "_id": req.params.recipeId,
    }, function (err, recipe) {
        if (err) {
            res.status(500).send(err);
        } else {
            let commentTemp = recipe[0].comment
            commentTemp.push(req.body)
            const update = {
                comment: commentTemp
            }
            Recipe.findOneAndUpdate({
                    "_id": req.params.recipeId,
                }, update, {new: true}, function (err, result) {
                    if (err) {
                        res.status(500).send(err);
                    } else {
                        res.json(result)
                    }
                }
            )
        }
    });
};

exports.update_a_comment_of_recipe = function(req, res) {
    Comment.findOneAndUpdate({_id: req.params.commentId}, req.body, {new: true}, function(err, comment) {
        if (err){
            if(err.name=='ValidationError') {
                res.status(422).send(err);
            }
            else{
                res.status(500).send(err);
            }
        }
        else{
            res.json(comment);
        }
    });
};

exports.delete_a_comment_of_recipe = function(req, res) {
    Comment.deleteOne({_id: req.params.commentId}, function(err, comment) {
        if (err){
            res.status(500).send(err);
        }
        else{
            res.json({ message: 'Comment successfully deleted' });
        }
    });
};
