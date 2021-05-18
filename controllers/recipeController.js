'use strict';

var mongoose = require('mongoose'),
    Recipe = mongoose.model('Recipes'),
    Actor = mongoose.model('Actors');

exports.list_all_recipes = async function(req, res) {
    var x = await Recipe.distinct("recipe.name");
    res.json(x);
};

exports.list_my_recipe = async function(req, res) { // todo
    var actor = await Actor.findById(req.params.actorId)
    var myRecipes = await Recipe.find({
        '_id': {
            $in: [
                actor.createdRecipes
            ]
        }
    })
    res.json(myRecipes);
};

exports.search_recipe = function(req, res) {
    var query = {};
// add ingredients
    if(req.query.categoryId){
        query.category=req.query.categoryId;
    }

    if(req.query.stars){ // chanage to min ie. min 3 starts etc.
        query.stars = req.query.stars;
    }

    if(req.query.difficultLevel){ // as max diff level
        query.difficultLevel = req.query.difficultLevel;
    }

    if(req.query.calories){ // / as max calo level
        query.calories = req.query.calories;
    }

    var skip=0;
    if(req.query.startFrom){
        skip = parseInt(req.query.startFrom);
    }
    var limit=0;
    if(req.query.pageSize){
        limit=parseInt(req.query.pageSize);
    }

    var sort="";
    if(req.query.reverse=="true"){
        sort="-";
    }
    if(req.query.sortedBy){
        sort+=req.query.sortedBy;
    }

    console.log("Query: "+query+" Skip:" + skip+" Limit:" + limit+" Sort:" + sort);

    Recipe.find(query)
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .lean()
        .exec(function(err, recipe){
            console.log('Start searching recipes');
            if (err){
                res.send(err);
            }
            else{
                res.json(recipe);
            }
            console.log('End searching recipes');
        });
};


exports.create_a_recipe = function(req, res) {
    var new_recipe = new Recipe(req.body);
    new_recipe.save(function(err, recipe) {
        if (err){
            if(err.name=='ValidationError') {
                res.status(422).send(err);
            }
            else{
                res.status(500).send(err);
            }
        }
        else{
            res.json(recipe);
        }
    });
};

//sprawdzic \/
exports.read_a_recipe = function(req, res) {
    Recipe.findById(req.params.recipeId)
        .then((recipe) => {
            var element = recipe.recipes.find((rep, index) => {
                if (rep.id == req.params.recipeId)
                    return rep
            });
            var idx = recipe.recipes.indexOf(element)
            if (idx !== -1) {
                res.json(recipe.recipes[idx]);
            }
        })
        .catch(e => res.status(400).send(e));
};


exports.update_a_recipe = async function(req, res) {
    const update = {
        recipes: req.body
    }
    let result = await Recipe.findOneAndUpdate({
        "_id": req.params.recipeId,
    }, update, {new: true})
    res.json(result)

    // Recipe.updateOne({_id: req.params.recipeId}, req.body, {new: true}, function(err, recipe) {
    //     if (err){
    //         if(err.name=='ValidationError') {
    //             res.status(422).send(err);
    //         }
    //         else{
    //             res.status(500).send(err);
    //         }
    //     }
    //     else{
    //         res.json(recipe);
    //     }
    // });
};


exports.delete_a_recipe = function(req, res) {
    Recipe.findById(req.params.recipeId)
        .then((recipe) => {
            var element = recipe.recipes.find((rep, index) => {
                if (rep.id == req.params.categoryId)
                    return rep
            });
            var idx = recipe.recipes.indexOf(element)
            if (idx !== -1) {
                recipe.recipes.splice(idx, 1);
                return recipe.save();
            }
        })
        .then((recipe) => {
            res.json({ message: 'Recipe successfully deleted' });
        })
        .catch(e => res.status(400).send(e));
    // Recipe.deleteOne({
    //     _id: req.params.recipeId
    // }, function(err, recipe) {
    //     if (err){
    //         res.status(500).send(err);
    //     }
    //     else{
    //         res.json({ message: 'Recipe successfully deleted' });
    //     }
    // });
};


//TODO add steps to recipe etc.
