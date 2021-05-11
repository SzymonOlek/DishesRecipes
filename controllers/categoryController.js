'use strict';

var mongoose = require('mongoose'),
    Category = mongoose.model('Categories'),
    Recipe = mongoose.model('Recipes');

exports.list_all_categories = function (req, res) {
    Category.find({}, function (err, categs) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(categs);
        }
    });
};

exports.read_a_category = function (req, res) {
    Category.findById(req.params.categId, function (err, categ) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(categ);
        }
    });
};

exports.list_all_categories_of_recipe = function (req, res) {
    Recipe.find({
        "_id": req.params.recipeId,
    }, function (err, recipe) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(recipe[0].category);
        }
    });
};

exports.create_a_category_of_recipe = function (req, res) {
    Recipe.find({
        "_id": req.params.recipeId,
    }, function (err, recipe) {
        if (err) {
            res.status(500).send(err);
        } else {
            let categoryTemp = recipe[0].category
            categoryTemp.push(req.body)
            const update = {
                category: categoryTemp
            }
            Recipe.findOneAndUpdate({
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

exports.update_a_category_of_recipe = async function (req, res) {
    const update = {
        category: req.body
    }
    let result = await Recipe.findOneAndUpdate({
        "_id": req.params.recipeId,
    }, update, {new: true})
    res.json(result)
};

exports.delete_a_category_of_recipe = function (req, res) {
    Recipe.findById(req.params.recipeId)
        .then((recipe) => {
            var element = recipe.category.find((cat, index) => {
                if (cat.id == req.params.categoryId)
                    return cat
            });
            var idx = recipe.category.indexOf(element)
            if (idx !== -1) {
                recipe.category.splice(idx, 1);
                return recipe.save();
            }
        })
        .then((recipe) => {
            res.json({ message: 'Comment successfully deleted' });
        })
        .catch(e => res.status(400).send(e));
};
