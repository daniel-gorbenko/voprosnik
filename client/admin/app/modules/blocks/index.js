import angular from 'angular';

/**
 * Controllers
 */

import BlocksListController from './controllers/blocks_list_controller';
import BlocksCreateController from './controllers/blocks_create_controller';
import BlocksShowController from './controllers/blocks_show_controller';
import BlocksIndexController from './controllers/blocks_index_controller';

/**
 * Definition
 */

export default angular.module('app.blocks', [])

  .controller('BlocksListController', BlocksListController)
  .controller('BlocksCreateController', BlocksCreateController)
  .controller('BlocksShowController', BlocksShowController)
  .controller('BlocksIndexController', BlocksIndexController)
  .name;