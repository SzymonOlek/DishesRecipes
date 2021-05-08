'use strict';

var mongoose = require('mongoose'),
    Ingredient = mongoose.model('Ingredients');

exports.list_all_ingredient = function(req, res) {
    Ingredient.find({}, function(err, ingredient) {
        if (err){
            res.status(500).send(err);
        }
        else{
            res.json(ingredient);
        }
    });
};

exports.create_a_ingredient = function(req, res) {
    var new_ingredient = new Ingredient(req.body);
    new_ingredient.save(function(err, ingredient) {
        if (err){
            if(err.name=='ValidationError') {
                res.status(422).send(err);
            }
            else{
                res.status(500).send(err);
            }
        }
        else{
            res.json(ingredient);
        }
    });
};


exports.read_a_ingredient = function(req, res) {
    Ingredient.findById(req.params.ingredientId, function(err, ingredient) {
        if (err){
            res.status(500).send(err);
        }
        else{
            res.json(ingredient);
        }
    });
};

exports.update_a_ingredient = function(req, res) {
    Ingredient.findOneAndUpdate({_id: req.params.ingredientId}, req.body, {new: true}, function(err, ingredient) {
        if (err){
            if(err.name=='ValidationError') {
                res.status(422).send(err);
            }
            else{
                res.status(500).send(err);
            }
        }
        else{
            res.json(ingredient);
        }
    });
};

exports.delete_a_ingredient = function(req, res) {
    Ingredient.deleteOne({_id: req.params.ingredientId}, function(err, ingredient) {
        if (err){
            res.status(500).send(err);
        }
        else{
            res.json({ message: 'Ingredient successfully deleted' });
        }
    });
};