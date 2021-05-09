'use strict';
module.exports = function (app) {
    var createdRecipes = require('../controllers/createdRecipesModel');

    app.route('/v1/createdRecipes')
        .get(createdRecipes.list_all_create_recipes)
        .post(createdRecipes.create_a_created_recipe);

    app.route('/v1/createdRecipes/:createdRecipeId')
        .get(createdRecipes.read_a_created_recipe)
        .put(createdRecipes.update_a_created_recipe)
        .delete(createdRecipes.delete_a_created_recipe);

};
