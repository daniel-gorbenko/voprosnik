import angular from 'angular';

/**
 * Controllers
 */

import StartPagesCreateController from './controllers/start_pages_create_controller';
import StartPagesEditController from './controllers/start_pages_edit_controller';

import StartPageCreateDirective from './components/start-page-create';

/**
 * Definition
 */

export default angular.module('app.blocks.startPages', [])

  .controller('StartPagesCreateController', StartPagesCreateController)
  .controller('StartPagesEditController', StartPagesEditController)

  .directive('startPageCreate', StartPageCreateDirective)
  .name;