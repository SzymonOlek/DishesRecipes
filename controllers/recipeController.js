'use strict';

var mongoose = require('mongoose'),
    Recipe = mongoose.model('Recipes');

exports.list_all_recipes = function(req, res) {
    Recipe.find({}, function(err, recipe) {
        if (err){
            res.status(500).send(err);
        }
        else{
            res.json(recipe);
        }
    });
};

exports.list_my_recipe= function(req, res) { // todo 
    Recipe.find(function(err, recipe) {
        if (err){
            res.status(500).send(err);
        }
        else{
            res.json(recipe);
        }
    });
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


exports.read_a_recipe = function(req, res) {
    Recipe.findById(req.params.recipeId, function(err, recipe) {
        if (err){
            res.status(500).send(err);
        }
        else{
            res.json(recipe);
        }
    });
};


exports.update_a_recipe = function(req, res) {
    Recipe.findOneAndUpdate({_id: req.params.recipeId}, req.body, {new: true}, function(err, recipe) {
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


exports.delete_a_recipe = function(req, res) {
    Recipe.deleteOne({
        _id: req.params.recipeId
    }, function(err, recipe) {
        if (err){
            res.status(500).send(err);
        }
        else{
            res.json({ message: 'Recipe successfully deleted' });
        }
    });
};


//TODO add steps to recipe etc.