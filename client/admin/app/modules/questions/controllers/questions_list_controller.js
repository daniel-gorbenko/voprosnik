import Controller from '../../common/controllers/controller';

/**
 * RoomsListController controller.
 */

export default class BlocksListController extends Controller {
  static $inject = ['$translate', 'notify', 'AnswersService', 'block', 'Constants', 'BlockResource', 'QuestionResource', '$stateParams'];

  constructor() {
    super(arguments);

    this.widgetId = this.injections.$stateParams.id;
    this.widgetState = this.injections.Constants.blockStates[this.injections.$stateParams.state];
    this.versionId = this.injections.$stateParams.versionId;
    this.blockId = this.injections.block.id;

    this.loadQuestions()
      .then(this.fillListOfQuestions.bind(this));
  }

  /**
   * Loads room list from api.
   *
   * @returns {*|Function}
   */

  loadQuestions() {
    return this.injections.BlockResource.getPages({id: this.widgetId, state: this.widgetState, versionId: this.versionId}).$promise;
  }

  /**
   * Assigns response from api to the scope.
   *
   * @param data
   */

  fillListOfQuestions(data) {
    this.questions = this.injections.AnswersService.getSortedByPosition(data.response.questions);
    this.startPage = data.response.startPage;
    this.endPage = data.response.endPage;

    this._dataLoaded = true;
  }

  /**
   * Assigns response from api to the scope.
   *
   * @param data
   */

  isDataLoaded() {
    return this._dataLoaded === true;
  }

  /**
   * Assigns response from api to the scope.
   *
   * @param data
   */

  _updateQuestions() {
    this.loadQuestions()
      .then(this.fillListOfQuestions.bind(this));
  }

  /**
   * Assigns response from api to the scope.
   *
   * @param data
   */

  onRemove(question) {
    this._remove(question)
      .then(this._updateQuestions.bind(this));
  }

  /**
   * Assigns response from api to the scope.
   *
   * @param data
   */

  _remove(question) {
    return this.injections.QuestionResource.remove({blockId: this.injections.$stateParams.id, id: question.id}).$promise;
  }

  /**
   * Assigns response from api to the scope.
   *
   * @param data
   */

  hasStartPage() {
    return !!this.startPage;
  }

  /**
   * Assigns response from api to the scope.
   *
   * @param data
   */

  hasEndPage() {
    return !!this.endPage;
  }

  /**
   * Assigns response from api to the scope.
   *
   * @param data
   */

  hasQuestions() {
    return this.questions && this.questions.length > 0;
  }

  /**
   * Assigns response from api to the scope.
   *
   * @param data
   */

  showPrompts() {
    return this.isEditStateNow() && (!this.hasQuestions() || !this.hasEndPage() || !this.hasStartPage());
  }

  /**
   * Assigns response from api to the scope.
   *
   * @param data
   */

  isEmptyWidget() {
    return !this.hasQuestions() && !this.hasEndPage() && !this.hasStartPage();
  }

  /**
   * Assigns response from api to the scope.
   *
   * @param status
   */

  isActiveStateNow() {
    return this.widgetState === this.injections.Constants.blockStates.active;
  }


  /**
   * Assigns response from api to the scope.
   *
   * @param status
   */

  isVersionStateNow() {
    return this.widgetState === this.injections.Constants.blockStates.versions;
  }

  /**
   * Assigns response from api to the scope.
   *
   * @param status
   */

  isEditStateNow() {
    return this.widgetState === this.injections.Constants.blockStates.edit;
  }

  /**
   * Assigns response from api to the scope.
   *
   * @param status
   */

  onMoved(question) {
    var index = this.questions.indexOf(question);

    this.questions.splice(index, 1);

    this._setPositionByIndex(this.questions);
    this._updateQuestionsPosition(this.questions)
      .then(this._showSuccessPositionUpdate.bind(this));
  }

  /**
   * Assigns response from api to the scope.
   *
   * @param status
   */

  _showSuccessPositionUpdate() {
    debugger
    this.injections.$translate('questions.list.orderChanged')
      .then(this.injections.notify.info.bind(this.injections.notify));
  }


  /**
   * Assigns response from api to the scope.
   *
   * @param status
   */

  _setPositionByIndex(questions) {
   questions.forEach(function (question, index) {
     question.position = index;
   });
  }

  /**
   * Assigns response from api to the scope.
   *
   * @param status
   */

  _updateQuestionsPosition(questions) {
   return this.injections.QuestionResource.updatePosition({
     blockId: this.blockId,
     questions: questions
   }).$promise;
  }

}