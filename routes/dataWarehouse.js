'use strict';
module.exports = function (app) {
    var favouriteList = require('../controllers/favouriteListController');

    app.route('/v1/datawarehouse')
        .get(favouriteList.list_all_favourite_lists);



};
