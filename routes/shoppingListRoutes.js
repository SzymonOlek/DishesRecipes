'use strict';
module.exports = function (app) {
    var shoppingList = require('../controllers/shoppingList');

    app.route('/v1/shoppingList')
        .get(shoppingList.list_all_shopping_lists)
        .post(shoppingList.create_a_shopping_list);

    app.route('/v1/shoppingList/:shoppingListId')
        .get(shoppingList.read_a_shopping_list)
        .put(shoppingList.update_a_shopping_list)
        .delete(shoppingList.delete_a_shopping_list);

};
