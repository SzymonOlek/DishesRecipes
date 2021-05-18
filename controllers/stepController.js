'use strict';

var mongoose = require('mongoose'),
    Step = mongoose.model('Step'),
    Recipe = mongoose.model('Recipes');

exports.list_all_steps = function(req, res) {
    Step.find({}, function(err, step) {
        if (err){
            res.status(500).send(err);
        }
        else{
            res.json(step);
        }
    });
};

exports.list_all_steps_of_recipe = function (req, res) {
    Recipe.findOne({
        "_id": req.params.recipeId,
    }, function (err, recipe) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(recipe[0].step);
        }
    });
};

// Usunac? \/
//exports.create_a_step = function(req, res) {
//    var new_step = new Step(req.body);
//    new_step.save(function(err, step) {
//        if (err){
//            if(err.name=='ValidationError') {
//                res.status(422).send(err);
//            }
//            else{
//                res.status(500).send(err);
//            }
//        }
//        else{
//            res.json(step);
//        }
//    });
//};

exports.create_a_step_of_recipe = function (req, res) {
    Recipe.updateOne({
            "_id": req.params.recipeId,
        },
        {
            $push: {step:req.body}
        }
    )
    // Recipe.find({
    //     "_id": req.params.recipeId,
    // }, function (err, recipe) {
    //     if (err) {
    //         res.status(500).send(err);
    //     } else {
    //         let stepTemp = recipe[0].step
    //         stepTemp.push(req.body)
    //         const update = {
    //             step: stepTemp
    //         }
    //         Recipe.findOneAndUpdate({
    //                 "_id": req.params.recipeId,
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


//usunac? \/
//exports.update_a_step = function(req, res) {
//    Step.findOneAndUpdate({_id: req.params.stepId}, req.body, {new: true}, function(err, step) {
//        if (err){
//            if(err.name=='ValidationError') {
//                res.status(422).send(err);
//            }
//            else{
//res.status(500).send(err);
//            }
//        }
//        else{
//            res.json(step);
//        }
//    });
//};

exports.update_a_step_of_recipe = async function (req, res) {
    const update = {
        step: req.body
    }
    let result = await Recipe.findOneAndUpdate({
        "_id": req.params.stepId,
    }, update, {new: true})
    res.json(result)
};

//usunac? \/
//exports.delete_a_step = function(req, res) {
//    Step.deleteOne({_id: req.params.stepId}, function(err, step) {
//        if (err){
//            res.status(500).send(err);
//        }
//        else{
//            res.json({ message: 'Step successfully deleted' });
//        }
//    });
//};

exports.delete_a_step_of_recipe = function (req, res) {
    Recipe.findById(req.params.recipeId)
        .then((recipe) => {
            var element = recipe.step.find((stp, index) => {
                if (stp.id == req.params.stepId)
                    return stp
            });
            var idx = recipe.step.indexOf(element)
            if (idx !== -1) {
                recipe.step.splice(idx, 1);
                return recipe.save();
            }
        })
        .then((recipe) => {
            res.json({ message: 'Step successfully deleted' });
        })
        .catch(e => res.status(400).send(e));
};


