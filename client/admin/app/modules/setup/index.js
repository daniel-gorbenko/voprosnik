import angular from 'angular';

/**
 * Controllers
 */

import SetupIndexController from './controllers/setup_index_controller';

/**
 * Definition
 */


export default angular.module('app.blocks.setup', [])

  .controller('SetupIndexController', SetupIndexController)

  .name;