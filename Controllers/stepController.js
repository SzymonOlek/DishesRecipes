'use strict';

var mongoose = require('mongoose'),
    Step = mongoose.model('Step');

exports.list_all_step = function(req, res) {
    Step.find({}, function(err, step) {
        if (err){
            res.status(500).send(err);
        }
        else{
            res.json(step);
        }
    });
};

exports.create_a_step = function(req, res) {
    var new_step = new Step(req.body);
    new_step.save(function(err, step) {
        if (err){
            if(err.name=='ValidationError') {
                res.status(422).send(err);
            }
            else{
                res.status(500).send(err);
            }
        }
        else{
            res.json(step);
        }
    });
};


exports.read_a_step = function(req, res) {
    Step.findById(req.params.recipeId, function(err, step) {
        if (err){
            res.status(500).send(err);
        }
        else{
            res.json(step);
        }
    });
};

exports.update_a_step = function(req, res) {
    Step.findOneAndUpdate({_id: req.params.stepId}, req.body, {new: true}, function(err, step) {
        if (err){
            if(err.name=='ValidationError') {
                res.status(422).send(err);
            }
            else{
                res.status(500).send(err);
            }
        }
        else{
            res.json(step);
        }
    });
};

exports.delete_a_step = function(req, res) {
    Step.deleteOne({_id: req.params.stepId}, function(err, step) {
        if (err){
            res.status(500).send(err);
        }
        else{
            res.json({ message: 'Step successfully deleted' });
        }
    });
};