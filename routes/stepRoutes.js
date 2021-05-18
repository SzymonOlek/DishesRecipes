'use strict';
module.exports = function (app) {
    var steps = require('../controllers/stepController');

    app.route('/v1/steps') // change route v1/recp/:recpid/step
        .get(steps.list_all_steps);

    app.route('/v1/steps/:stepId')
        .get(steps.read_a_step);

    app.route('/v1/recipes/:recipeId/steps')
        .get(steps.list_all_steps_of_recipe)
        .post(steps.create_a_step_of_recipe)
        .put(steps.update_a_steps_of_recipe);

    app.route('/v1/recipes/:recipeId/steps/:stepsId')
        .delete(steps.delete_a_step_of_recipe)
        .put(steps.update_a_step_of_recipe);

};
