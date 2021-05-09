'use strict';
module.exports = function (app) {
    var quantity = require('../controllers/quantityController');

    app.route('/v1/quantity')
        .get(quantity.list_all_quantity)
        .post(quantity.create_a_quantity);

    app.route('/v1/quantity/:quantityId')
        .get(quantity.read_a_quantity)
        .put(quantity.update_a_quantity)
        .delete(quantity.delete_a_quantity);

};
