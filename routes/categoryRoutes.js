'use strict';
module.exports = function (app) {
    var categories = require('../controllers/categoryController');

    app.route('/v1/categories')
        .get(categories.list_all_categories);

    app.route('/v1/categories/:categoryId')
        .get(categories.read_a_category)

    app.route('/v1/recipes/:recipeId/categories')
        .get(categories.list_all_categories_of_recipes)
        .post(categories.update_a_category_of_recipes)

    app.route('/v1/recipes/:recipeId/categories/:categoryId')
        .delete(categories.delete_a_category_of_recipes);

};
