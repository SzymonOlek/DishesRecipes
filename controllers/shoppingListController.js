'use strict';

var mongoose = require('mongoose'),
    ShoppingList = mongoose.model('ShoppingList'),
    Actor = mongoose.model('Actors');

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

exports.list_all_shopping_lists_of_actor = function (req, res) {
    Actor.findOne({
        "_id": req.params.actorId,
    }, function (err, recipe) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(actor[0].shoppingList);
        }
    });
};

exports.create_a_shopping_List_for_a_actor = function (req, res) {
    Actor.find({
        "_id": req.params.actorId,
    }, function (err, actor) {
        if (err) {
            res.status(500).send(err);
        } else {
            let shoppingListTemp = actor[0].shoppingList
            shoppingListTemp.push(req.body)
            const update = {
                shoppingList: shoppingListTemp
            }
            Actor.findOneAndUpdate({
                    "_id": req.params.recipeId,
                }, update, {new: true}, function (err, result) {
                    if (err) {
                        res.status(500).send(err);
                    } else {
                        res.json(result)
                    }
                }
            )
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

exports.update_a_shopping_list_of_actor = async function (req, res) {
    const update = {
        shoppingList: req.body
    }
    let result = await Actor.findOneAndUpdate({
        "_id": req.params.actorId,
    }, update, {new: true})
    res.json(result)
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

exports.delete_a_shopping_list_of_actor = function (req, res) {
    Actor.findById(req.params.actorId)
        .then((actor) => {
            var element = actor.shoppingList.find((cat, index) => {
                if (cat.id == req.params.categoryId)
                    return cat
            });
            var idx = actor.shoppingList.indexOf(element)
            if (idx !== -1) {
                actor.shoppingList.splice(idx, 1);
                return actor.save();
            }
        })
        .then((recipe) => {
            res.json({ message: 'Shopping List successfully deleted' });
        })
        .catch(e => res.status(400).send(e));
};
