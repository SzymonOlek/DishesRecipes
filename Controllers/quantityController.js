'use strict';

var mongoose = require('mongoose'),
    Quantity = mongoose.model('Quantity');

exports.list_all_quantity = function(req, res) {
    Quantity.find({}, function(err, quantity) {
        if (err){
            res.status(500).send(err);
        }
        else{
            res.json(quantity);
        }
    });
};

exports.create_a_quantity = function(req, res) {
    var new_quantity = new Quantity(req.body);
    new_quantity.save(function(err, quantity) {
        if (err){
            if(err.name=='ValidationError') {
                res.status(422).send(err);
            }
            else{
                res.status(500).send(err);
            }
        }
        else{
            res.json(quantity);
        }
    });
};


exports.read_a_quantity = function(req, res) {
    Quantity.findById(req.params.recipeId, function(err, quantity) {
        if (err){
            res.status(500).send(err);
        }
        else{
            res.json(quantity);
        }
    });
};

exports.update_a_quantity = function(req, res) {
    Quantity.findOneAndUpdate({_id: req.params.quantityId}, req.body, {new: true}, function(err, quantity) {
        if (err){
            if(err.name=='ValidationError') {
                res.status(422).send(err);
            }
            else{
                res.status(500).send(err);
            }
        }
        else{
            res.json(quantity);
        }
    });
};

exports.delete_a_quantity = function(req, res) {
    Quantity.deleteOne({_id: req.params.quantityId}, function(err, quantity) {
        if (err){
            res.status(500).send(err);
        }
        else{
            res.json({ message: 'Quantity successfully deleted' });
        }
    });
};