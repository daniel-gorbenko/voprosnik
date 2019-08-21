import angular from 'angular';

/**
 * Controllers
 */

import AdminIndexController from './controllers/admin_index_controller';

/**
 * Definition
 */

export default angular.module('app.admin', [])

  .controller('AdminIndexController', AdminIndexController)
  .name;