'use strict';
module.exports = function (app) {
    var categories = require('../controllers/categoryController');

    app.route('/v1/categories')
        .get(categories.list_all_categories)
        .post(categories.create_a_category);

    app.route('/v1/categories/:categoryId')
        .get(categories.read_a_category)
        .put(categories.update_a_category)
        .delete(categories.delete_a_category);

};
