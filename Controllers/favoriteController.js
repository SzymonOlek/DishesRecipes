'use strict';

var mongoose = require('mongoose'),
    FavouriteList = mongoose.model('FavouriteList');

exports.list_all_favouriteList = function(req, res) {
    FavouriteList.find({}, function(err, favouriteList) {
        if (err){
            res.status(500).send(err);
        }
        else{
            res.json(favouriteList);
        }
    });
};

exports.create_a_favouriteList = function(req, res) {
    var new_favouriteList = new FavouriteList(req.body);
    new_favouriteList.save(function(err, favouriteList) {
        if (err){
            if(err.name=='ValidationError') {
                res.status(422).send(err);
            }
            else{
                res.status(500).send(err);
            }
        }
        else{
            res.json(favouriteList);
        }
    });
};


exports.read_a_favouriteList = function(req, res) {
    FavouriteList.findById(req.params.recipeId, function(err, favouriteList) {
        if (err){
            res.status(500).send(err);
        }
        else{
            res.json(favouriteList);
        }
    });
};

exports.update_a_favouriteList = function(req, res) {
    FavouriteList.findOneAndUpdate({_id: req.params.recipeId}, req.body, {new: true}, function(err, favouriteList) {
        if (err){
            if(err.name=='ValidationError') {
                res.status(422).send(err);
            }
            else{
                res.status(500).send(err);
            }
        }
        else{
            res.json(favouriteList);
        }
    });
};

exports.delete_a_favouriteList = function(req, res) {
    FavouriteList.deleteOne({_id: req.params.recipeId}, function(err, favouriteList) {
        if (err){
            res.status(500).send(err);
        }
        else{
            res.json({ message: 'favouriteList successfully deleted' });
        }
    });
};