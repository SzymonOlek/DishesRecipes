'use strict';

var mongoose = require('mongoose'),
    CreatedRecipes = mongoose.model('CreatedRecipes');

exports.list_all_createdRecipe = function(req, res) {
    CreatedRecipes.find({}, function(err, createdRecipe) {
        if (err){
            res.status(500).send(err);
        }
        else{
            res.json(createdRecipe);
        }
    });
};

exports.create_a_createdRecipe = function(req, res) {
    var new_createdRecipe = new CreatedRecipes(req.body);
    new_createdRecipe.save(function(err, createdRecipe) {
        if (err){
            if(err.name=='ValidationError') {
                res.status(422).send(err);
            }
            else{
                res.status(500).send(err);
            }
        }
        else{
            res.json(createdRecipe);
        }
    });
};


exports.read_a_createdRecipe = function(req, res) {
    CreatedRecipes.findById(req.params.recipeId, function(err, createdRecipe) {
        if (err){
            res.status(500).send(err);
        }
        else{
            res.json(createdRecipe);
        }
    });
};

exports.update_a_createdRecipe = function(req, res) {
    CreatedRecipes.findOneAndUpdate({_id: req.params.recipeId}, req.body, {new: true}, function(err, createdRecipe) {
        if (err){
            if(err.name=='ValidationError') {
                res.status(422).send(err);
            }
            else{
                res.status(500).send(err);
            }
        }
        else{
            res.json(createdRecipe);
        }
    });
};

exports.delete_a_createdRecipe = function(req, res) {
    CreatedRecipes.deleteOne({_id: req.params.recipeId}, function(err,    createdRecipe) {
        if (err){
            res.status(500).send(err);
        }
        else{
            res.json({ message: 'createdRecipe successfully deleted' });
        }
    });
};