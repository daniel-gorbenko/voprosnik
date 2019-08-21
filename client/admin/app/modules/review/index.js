import angular from 'angular';

/**
 * Controllers
 */

import ReviewIndexController from './controllers/review_index_controller';

/**
 * Definition
 */

export default angular.module('app.review', [])

  .controller('ReviewIndexController', ReviewIndexController)
  .name;