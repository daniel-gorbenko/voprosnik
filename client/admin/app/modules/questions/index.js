import angular from 'angular';

/**
 * Controllers
 */

import QuestionsListController from './controllers/questions_list_controller';
import QuestionsCreateController from './controllers/questions_create_controller';
import QuestionsEditController from './controllers/questions_edit_controller';

import QuestionCreateDirective from './components/question-create';

/**
 * Definition
 */

export default angular.module('app.blocks.questions', [])

  .controller('QuestionsListController', QuestionsListController)
  .controller('QuestionsCreateController', QuestionsCreateController)
  .controller('QuestionsEditController', QuestionsEditController)

  .directive('questionCreate', QuestionCreateDirective)
  .name;