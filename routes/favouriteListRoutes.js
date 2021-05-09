'use strict';
module.exports = function (app) {
    var favouriteList = require('../controllers/favouriteListController');

    app.route('/v1/favouriteList')
        .get(favouriteList.list_all_favourite_lists)
        .post(favouriteList.create_a_favourite_list);

    app.route('/v1/favouriteList/:favouriteListId')
        .get(favouriteList.read_a_favourite_list)
        .put(favouriteList.update_a_favourite_list)
        .delete(favouriteList.delete_a_favourite_list);

};
