'use strict';

var mongoose = require('mongoose'),
    Comment = mongoose.model('Comments');

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

exports.create_a_comment = function(req, res) {
    var new_comment = new Comment(req.body);
    new_comment.save(function(err, comment) {
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

exports.update_a_comment = function(req, res) {
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

exports.delete_a_comment = function(req, res) {
    Comment.deleteOne({_id: req.params.commentId}, function(err, comment) {
        if (err){
            res.status(500).send(err);
        }
        else{
            res.json({ message: 'Comment successfully deleted' });
        }
    });
};