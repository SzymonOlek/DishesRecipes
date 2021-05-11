'use strict';

var mongoose = require('mongoose'),
    Ingredients = mongoose.model('Ingredients'),
    Quantity = mongoose.model('Quantity');

exports.list_all_quantity = function(req, res) {
    Quantity.find({}, function(err, quantity) {
        if (err){
            res.status(500).send(err);
        }
        else{
            res.json(quantity);
        }
    });
};

exports.create_a_quantity = function(req, res) {
    var new_quantity = new Quantity(req.body);
    new_quantity.save(function(err, quantity) {
        if (err){
            if(err.name=='ValidationError') {
                res.status(422).send(err);
            }
            else{
                res.status(500).send(err);
            }
        }
        else{
            res.json(quantity);
        }
    });
};

exports.create_a_quantity_of_ingredient = function (req, res) {
    Ingredients.find({
        "_id": req.params.ingredientsId,
    }, function (err, ingredient) {
        if (err) {
            res.status(500).send(err);
        } else {
            let quantityTemp = ingredient[0].quantity
            quantityTemp.push(req.body)
            const update = {
                quantity: quantityTemp
            }
            Ingredients.findOneAndUpdate({
                    "_id": req.params.ingredientsId,
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

//usunac
//exports.read_a_quantity = function(req, res) {
//    Quantity.findById(req.params.recipeId, function(err, quantity) {
//        if (err){
//            res.status(500).send(err);
//        }
//        else{
//            res.json(quantity);
//        }
//    });
//};

exports.update_a_quantity = function(req, res) {
    Quantity.findOneAndUpdate({_id: req.params.quantityId}, req.body, {new: true}, function(err, quantity) {
        if (err){
            if(err.name=='ValidationError') {
                res.status(422).send(err);
            }
            else{
                res.status(500).send(err);
            }
        }
        else{
            res.json(quantity);
        }
    });
};

exports.update_a_quantity_of_ingredient = async function (req, res) {
    const update = {
        quantity: req.body
    }
    let result = await Iingredient.findOneAndUpdate({
        "_id": req.params.ingredientId,
    }, update, {new: true})
    res.json(result)
};

exports.delete_a_quantity = function(req, res) {
    Quantity.deleteOne({_id: req.params.quantityId}, function(err, quantity) {
        if (err){
            res.status(500).send(err);
        }
        else{
            res.json({ message: 'Quantity successfully deleted' });
        }
    });
};