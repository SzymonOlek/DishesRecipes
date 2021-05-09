'use strict';
module.exports = function (app) {
    var comments = require('../controllers/commentController');

    app.route('/v1/comments')
        .get(comments.list_all_comments)
        .post(comments.create_a_comment);

    app.route('/v1/comments/:commentId')
        .get(comments.read_a_comment)
        .put(comments.update_a_comment)
        .delete(comments.delete_a_comment);

};
