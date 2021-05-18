'use strict';

var mongoose = require('mongoose'),
    CreatedRecipes = mongoose.model('CreatedRecipes'),
    Actor = mongoose.model('Actors');

exports.list_all_create_recipes = async function(req, res) {
    var x = await Actor.distinct("createdRecipes");
    res.json(x);
};

//chyba niepotrzebne \/
exports.read_a_created_recipe = function(req, res) {
    CreatedRecipes.findById(req.params.recipeId, function(err, createdRecipe) {
        if (err){
            res.status(500).send(err);
        }
        else{
            res.json(createdRecipe);
        }
    });
};

exports.list_all_created_recipes_of_actor= function (req, res) {
    Actor.find({
        "_id": req.params.actorId,
    }, function (err, actor) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(actor[0].createdRecipes);
        }
    });
};

exports.add_a_created_recipe_of_actor = function (req, res) {
    Actor.updateOne({
            "_id": req.params.actorId,
        },
        {
            $push: {createdRecipes:req.body}
        }
    )
    // Actor.find({
    //     "_id": req.params.actorId,
    // }, function (err, actor) {
    //     if (err) {
    //         res.status(500).send(err);
    //     } else {
    //         let createdRecipesTemp = actor[0].createdRecipes
    //         createdRecipesTemp.push(req.body)
    //         const update = {
    //             createdRecipes: createdRecipesTemp
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

exports.clear_a_created_recipe_of_actor = async function (req, res) {
    Actor.findById(req.params.actorId)
        .then((actor) => {
            actor.createdRecipes = [];
            return actor.save();
        })
        .then((recipe) => {
            res.json({ message: 'CreatedRecipes successfully deleted' });
        })
        .catch(e => res.status(400).send(e));
};

exports.delete_a_created_recipe_of_actor = function (req, res) {
    Actor.findById(req.params.actorId)
        .then((actor) => {
            var element = actor.createdRecipes.find((value, index) => {
                if (value.id === req.params.recipeId)
                    return value
            });
            var idx = actor.createdRecipes.indexOf(element)
            if (idx !== -1) {
                actor.createdRecipes.splice(idx, 1);
                return actor.save();
            }
        })
        .then((actor) => {
            res.json({ message: 'Actor Created Recipe successfully deleted' });
        })
        .catch(e => res.status(400).send(e));
};

