'use strict';

var mongoose = require('mongoose'),
    Category = mongoose.model('Categories');

exports.list_all_categories = function(req, res) {
    Category.find({}, function(err, categs) {
        if (err){
            res.status(500).send(err);
        }
        else{
            res.json(categs);
        }
    });
};

exports.create_a_category = function(req, res) {
    var new_categ = new Category(req.body);
    new_categ.save(function(err, categ) {
        if (err){
            if(err.name=='ValidationError') {
                res.status(422).send(err);
            }
            else{
                res.status(500).send(err);
            }
        }
        else{
            res.json(categ);
        }
    });
};


exports.read_a_category = function(req, res) {
    Category.findById(req.params.categId, function(err, categ) {
        if (err){
            res.status(500).send(err);
        }
        else{
            res.json(categ);
        }
    });
};

exports.update_a_category = function(req, res) {
    Category.findOneAndUpdate({_id: req.params.categId}, req.body, {new: true}, function(err, categ) {
        if (err){
            if(err.name=='ValidationError') {
                res.status(422).send(err);
            }
            else{
                res.status(500).send(err);
            }
        }
        else{
            res.json(categ);
        }
    });
};

exports.delete_a_category = function(req, res) {
    Category.deleteOne({_id: req.params.categId}, function(err, categ) {
        if (err){
            res.status(500).send(err);
        }
        else{
            res.json({ message: 'Category successfully deleted' });
        }
    });
};