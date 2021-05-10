'use strict';
module.exports = function (app) {
    var steps = require('../controllers/stepController');

    app.route('/v1/steps') // change route v1/recp/:recpid/step
        .get(steps.list_all_steps)
        .post(steps.create_a_step);

    app.route('/v1/steps/:stepId')
        .get(steps.read_a_step)
        .put(steps.update_a_step)
        .delete(steps.delete_a_step);

};
