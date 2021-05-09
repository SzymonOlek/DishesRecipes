'use strict';
module.exports = function (app) {
    var ingredients = require('../controllers/ingredientsController');

    app.route('/v1/ingredients')
        .get(ingredients.list_all_ingredients)
        .post(ingredients.create_an_ingredient);

    app.route('/v1/ingredients/:ingredientId')
        .get(ingredients.read_an_ingredient)
        .put(ingredients.update_an_ingredient)
        .delete(ingredients.delete_an_ingredient);

};
