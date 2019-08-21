import angular from 'angular';

/**
 * Resources
 */

import BlockResource from './resources/block_resource';
import QuestionResource from './resources/question_resource';
import StatisticResource from './resources/statistic_resource';
import AnswerResource from './resources/answer_resource';
import TemplateResource from './resources/template_resource';
import AuthenticationResource from './resources/authentication_resource';
import StartPageResource from './resources/start_page_resource';
import EndPageResource from './resources/end_page_resource';
import WidgetResource from './resources/widget_resource';
import TariffResource from './resources/tariff_resource';
import BillingResource from './resources/billing_resource';
import UserResource from './resources/user_resource';
import ExportResource from './resources/export_resource';

import User from './services/user';
import notify from './services/notify';

import ErrorsInterceptor from './services/errors_interceptor';
import ConstantsFactory from './services/constants_factory';

import widget from './components/widget';

/**
 * Filters
 */

import FormatFilter from './filters/format_filter';
import ShowTypeFilter from './filters/show_type_filter';
import QuestionTypeFilter from './filters/question_type_filter';

/**
 * Definition
 */

export default angular.module('app.common', [widget])
  .service('User', User)
  .service('notify', notify)

  .factory('BlockResource', BlockResource)
  .factory('QuestionResource', QuestionResource)
  .factory('StatisticResource', StatisticResource)
  .factory('AnswerResource', AnswerResource)
  .factory('TemplateResource', TemplateResource)
  .factory('AuthenticationResource', AuthenticationResource)
  .factory('StartPageResource', StartPageResource)
  .factory('EndPageResource', EndPageResource)
  .factory('WidgetResource', WidgetResource)
  .factory('TariffResource', TariffResource)
  .factory('BillingResource', BillingResource)
  .factory('UserResource', UserResource)
  .factory('ExportResource', ExportResource)

  .factory('Constants', ConstantsFactory)
  .factory('ErrorsInterceptor', ErrorsInterceptor)

  .filter('format', FormatFilter)
  .filter('showType', ShowTypeFilter)
  .filter('questionType', QuestionTypeFilter)

  .name;