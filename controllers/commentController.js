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
            res.json(recipe[0].comments);
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
            let commentTemp = recipe[0].comments
            commentTemp.push(req.body)
            const update = {
                comments: commentTemp
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

exports.update_a_comment_of_recipe = async function(req, res) {
    const update = {
        comments: req.body
    }
    let result = await Recipe.findOneAndUpdate({
        "_id": req.params.recipeId,
    }, update, {new: true})
    res.json(result)
};

exports.delete_a_comment_of_recipe = function(req, res) {
    Recipe.findById(req.params.recipeId)
        .then((recipe) => {
            var element = recipe.comments.find((value, index) => {
                if (value.id == req.params.commentId)
                    return value
            });
            var idx = recipe.comments.indexOf(element)
            if (idx !== -1) {
                recipe.comments.splice(idx, 1);
                return recipe.save();
            }
        })
        .then((recipe) => {
            res.json({ message: 'Comment successfully deleted' });
        })
        .catch(e => res.status(400).send(e));
};
