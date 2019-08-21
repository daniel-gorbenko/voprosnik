import angular from 'angular';

/**
 * Controllers
 */

import EndPagesCreateController from './controllers/end_pages_create_controller';
import EndPagesEditController from './controllers/end_pages_edit_controller';

import EndPageCreateDirective from './components/end-page-create';

/**
 * Definition
 */

export default angular.module('app.blocks.endPages', [])

  .controller('EndPagesCreateController', EndPagesCreateController)
  .controller('EndPagesEditController', EndPagesEditController)

  .directive('endPageCreate', EndPageCreateDirective)
  .name;