'use strict';

var mongoose = require('mongoose'),
    FavouriteList = mongoose.model('FavouriteList'),
    Actor = mongoose.model('Actors');

exports.list_all_favourite_lists = function(req, res) {
    FavouriteList.find({}, function(err, favouriteList) {
        if (err){
            res.status(500).send(err);
        }
        else{
            res.json(favouriteList);
        }
    });
};

exports.read_a_favourite_list = function(req, res) {
    FavouriteList.findById(req.params.recipeId, function(err, favouriteList) {
        if (err){
            res.status(500).send(err);
        }
        else{
            res.json(favouriteList);
        }
    });
};

exports.list_all_favourite_lists_of_actor= function (req, res) {
    Actor.find({
        "_id": req.params.actorId,
    }, function (err, actor) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(actor[0].favouriteLists);
        }
    });
};

exports.create_a_favourite_list_of_actor = function (req, res) {
    Actor.updateOne({
            "_id": req.params.actorId,
        },
        {
            $push: {favouriteLists:req.body}
        }
    )
    // Actor.find({
    //     "_id": req.params.actorId,
    // }, function (err, actor) {
    //     if (err) {
    //         res.status(500).send(err);
    //     } else {
    //         let favouriteListsTemp = actor[0].favouriteLists
    //         favouriteListsTemp.push(req.body)
    //         const update = {
    //             favouriteLists: favouriteListsTemp
    //         }
    //         Actor.findOneAndUpdate({
    //                 "_id": req.params.actorId,
    //             }, update, {new: true}, function (err, result) {
    //                 if (err) {
    //                     res.status(500).send(err);
    //                 } else {
    //                     res.json(result)
    //                 }
    //             }
    //         )
    //     }
    // });
};

exports.update_a_favourite_list_of_actor = async function (req, res) {
    const update = {
        favouriteLists: req.body
    }
    let result = await Actor.findOneAndUpdate({
        "_id": req.params.actorId,
    }, update, {new: true})
    res.json(result)
};

exports.delete_a_favourite_list_of_actor = function (req, res) {
    Actor.findById(req.params.actorId)
        .then((actor) => {
            var element = actor.favouriteLists.find((value, index) => {
                if (value.id === req.params.favouriteListId)
                    return value
            });
            var idx = actor.favouriteLists.indexOf(element)
            if (idx !== -1) {
                actor.favouriteLists.splice(idx, 1);
                return actor.save();
            }
        })
        .then((actor) => {
            res.json({ message: 'Actor Favourite List successfully deleted' });
        })
        .catch(e => res.status(400).send(e));
};

