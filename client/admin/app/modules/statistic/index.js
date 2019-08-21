import angular from 'angular';

/**
 * Controllers
 */

import StatisticController from './controllers/statistic_controller';

/**
 * Definition
 */

export default angular.module('app.blocks.statistic', [])

  .controller('StatisticController', StatisticController)
  .name;