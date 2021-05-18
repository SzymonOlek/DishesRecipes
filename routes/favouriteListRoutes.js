'use strict';
module.exports = function (app) {
    var favouriteList = require('../controllers/favouriteListController');

    app.route('/v1/favouriteList')
        .get(favouriteList.list_all_favourite_lists);

    app.route('/v1/favouriteList/:favouriteListId')
        .get(favouriteList.read_a_favourite_list);

    app.route('/v1/actors/:actorId/favouriteLists')
        .get(favouriteList.list_all_favourite_lists_of_actor) // rename 
        .post(favouriteList.create_a_favourite_list_of_actor)
        .put(favouriteList.update_a_favourite_list_of_actor);

    app.route('/v1/actors/:actorId/favouriteList/:favouriteListId')
        .delete(favouriteList.delete_a_favourite_list_of_actor);

};
