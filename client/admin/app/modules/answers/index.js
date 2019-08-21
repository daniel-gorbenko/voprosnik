import angular from 'angular';

/**
 * Controllers
 */

import AnswersController from './controllers/answers_list_controller';

/**
 * Services
 */

import AnswersService from './services/answers_service';

/**
 * Definition
 */

export default angular.module('app.blocks.answers', [])

  .service('AnswersService', AnswersService)

  .controller('AnswersListController', AnswersController)
  .name;