'use strict';
module.exports = function (app) {
    var shoppingList = require('../controllers/shoppingListController');

    app.route('/v1/shoppingList')
        .get(shoppingList.list_all_shopping_lists)

    app.route('/v1/shoppingList/:shoppingListId')
        .get(shoppingList.read_a_shopping_list)
        .put(shoppingList.update_a_shopping_list)
        .delete(shoppingList.delete_a_shopping_list);

    app.route('/v1/actors/:actorId/shoppingList')
        .get(shoppingList.list_all_shopping_lists_of_actor)
        .post(shoppingList.create_a_shopping_List_for_a_actor)
        .put(shoppingList.update_a_shopping_list_of_actor)

    app.route('/v1/recipes/:actorId/actors/:shoppingListId')
        .delete(shoppingList.delete_a_shopping_list_of_actor);

};
