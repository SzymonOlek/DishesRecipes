'use strict';

var mongoose = require('mongoose'),
    ShoppingList = mongoose.model('ShoppingList');

exports.list_all_shopping_lists = function(req, res) {
    ShoppingList.find({}, function(err, shoppingList) {
        if (err){
            res.status(500).send(err);
        }
        else{
            res.json(shoppingList);
        }
    });
};

exports.create_a_shopping_list = function(req, res) {
    var new_shoppingList = new ShoppingList(req.body);
    new_shoppingList.save(function(err, shoppingList) {
        if (err){
            if(err.name=='ValidationError') {
                res.status(422).send(err);
            }
            else{
                res.status(500).send(err);
            }
        }
        else{
            res.json(shoppingList);
        }
    });
};


exports.read_a_shopping_list = function(req, res) {
    ShoppingList.findById(req.params.recipeId, function(err, shoppingList) {
        if (err){
            res.status(500).send(err);
        }
        else{
            res.json(shoppingList);
        }
    });
};

exports.update_a_shopping_list = function(req, res) {
    ShoppingList.findOneAndUpdate({_id: req.params.shoppingListId}, req.body, {new: true}, function(err, shoppingList) {
        if (err){
            if(err.name=='ValidationError') {
                res.status(422).send(err);
            }
            else{
                res.status(500).send(err);
            }
        }
        else{
            res.json(shoppingList);
        }
    });
};

exports.delete_a_shopping_list = function(req, res) {
    ShoppingList.deleteOne({_id: req.params.shoppingListId}, function(err, shoppingList) {
        if (err){
            res.status(500).send(err);
        }
        else{
            res.json({ message: 'ShoppingList successfully deleted' });
        }
    });
};
