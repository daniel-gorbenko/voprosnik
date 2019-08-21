import angular from 'angular';

import WidgetDirective from './directives/widget';
import WidgetController from './controllers/widget';

/**
 * Definition
 */

export default angular.module('app.common.widget', [])

  .directive('widget', WidgetDirective)

  .controller('WidgetController', WidgetController)

  .name;