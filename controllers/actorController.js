'use strict';

var mongoose = require('mongoose'),
    Actor = mongoose.model('Actors');

exports.list_all_actors = async function(req, res) {
    Actor.find({}, function(err, actor) {
        if (err){
            res.status(500).send(err);
        }
        else{
            res.json(actor);
        }
    }).limit(200);
};

exports.create_an_actor = function(req, res) {
    var new_actor = new Actor(req.body);
    new_actor.save(function(err, actor) {
        if (err){
            if(err.name=='ValidationError') {
                res.status(422).send(err);
            }
            else{
                res.status(500).send(err);
            }
        }
        else{
            res.json(actor);
        }
    });
};

//sprawdzic \/
exports.read_an_actor = function(req, res) {
    Actor.findById(req.params.actorId)
        .then((actor) => {
            var element = actor.find((rep, index) => {
                if (rep.id == req.params.actorId)
                    return rep
            });
            var idx = actor.indexOf(element)
            if (idx !== -1) {
                res.json(actor[idx]);
            }
        })
        .catch(e => res.status(400).send(e));
};

exports.update_an_actor = async function(req, res) {
    const update = {
        actors: req.body
    }
    let result = await Actor.findOneAndUpdate({
        "_id": req.params.actorId,
    }, update, {new: true})
    res.json(result)

    // Actor.findOneAndUpdate({_id: req.params.actorId}, req.body, {new: true}, function(err, actor) {
    //     if (err){
    //         if(err.name=='ValidationError') {
    //             res.status(422).send(err);
    //         }
    //         else{
    //             res.status(500).send(err);
    //         }
    //     }
    //     else{
    //         res.json(actor);
    //     }
    // });
};
//sprawdzic \/
exports.delete_an_actor = function(req, res) {
    Actor.findById(req.params.actorId)
        .then((actor) => {
            var element = actor.actors.find((rep, index) => {
                if (rep.id == req.params.categoryId)
                    return rep
            });
            var idx = actor.actors.indexOf(element)
            if (idx !== -1) {
                actor.actors.splice(idx, 1);
                return actor.save();
            }
        })
        .then((recipe) => {
            res.json({ message: 'Actor successfully deleted' });
        })
        .catch(e => res.status(400).send(e));

    // Actor.deleteOne({_id: req.params.actorId}, function(err, actor) {
    //     if (err){
    //         res.status(500).send(err);
    //     }
    //     else{
    //         res.json({ message: 'Actor successfully deleted' });
    //     }
    // });
};
