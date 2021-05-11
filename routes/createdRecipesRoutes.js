'use strict';
module.exports = function (app) {
    var createdRecipes = require('../controllers/createdRecipesController');

    app.route('/v1/createdRecipes')
        .get(createdRecipes.list_all_create_recipes);

    app.route('/v1/createdRecipes/:createdRecipeId')
        .get(createdRecipes.read_a_created_recipe);

    app.route('/v1/actors/:actorId/createdRecipes')
        .get(createdRecipes.list_all_created_recipes_of_actor)
        .post(createdRecipes.create_a_created_recipe_of_actor)
        .put(createdRecipes.update_a_created_recipe_of_actor);

    app.route('/v1/actors/:actorId/createdRecipes/:createdRecipeId')
        .delete(createdRecipes.delete_a_created_recipe_of_actor);

};
