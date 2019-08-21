import angular from 'angular';

/**
 * Controllers
 */

import DesignController from './controllers/design_controller';

/**
 * Definition
 */

export default angular.module('app.blocks.design', [])

  .controller('DesignController', DesignController)
  .name;