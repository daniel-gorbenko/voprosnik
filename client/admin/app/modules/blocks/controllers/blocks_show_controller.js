import Controller from '../../common/controllers/controller';

/**
 * RoomsShowController controller.
 */

export default class RoomsShowController extends Controller {
  static $inject = ['$translate', 'notify', 'User', 'block', 'WidgetResource', 'BlockResource', '$stateParams', 'Constants', '$state', '$window'];

  constructor() {
    super(arguments);

    this.widgetId = this.injections.$stateParams.id;
    this.block = this.injections.block;
    this.$state = this.injections.$state;
    this.state = this.injections.Constants.blockStates[this.injections.$stateParams.state];

    this.loadWidget()
      .then(this.fillWidget.bind(this));
  }

  loadWidget() {
    return this.injections.WidgetResource.get({id: this.widgetId}).$promise;
  }

  /**
   * Assigns response from api to the scope.
   *
   * @param data
   */

  fillWidget(data) {
    this.widget = data.response;
  }

  /**
   * Assigns response from api to the scope.
   *
   * @param data
   */

  isActiveBlock(block) {
    return this.block.status === this.injections.Constants.status.active;
  }

  /**
   * Assigns response from api to the scope.
   *
   * @param data
   */

  turnOffWidget() {
    var self = this;

    return this._updateStatus(this.injections.Constants.status.disabled)
      .then(function () {
        self._updateStatusLocal(self.injections.Constants.status.disabled);
      });
  }

  /**
   * Assigns response from api to the scope.
   *
   * @param data
   */

  turnOnWidget() {
    var self = this;

    return this._updateStatus(this.injections.Constants.status.active)
      .then(function () {
        self._updateStatusLocal(self.injections.Constants.status.active);
      });
  }

  /**
   * Assigns response from api to the scope.
   *
   * @param status
   */

  _updateStatus(status) {
    return this.injections.BlockResource.updateStatus({id: this.block.id, status: status}).$promise;
  }

  /**
   * Assigns response from api to the scope.
   *
   * @param status
   */

  _updateStatusLocal(status) {
    this.block.status = status;
  }

  /**
   * Assigns response from api to the scope.
   *
   * @param status
   */

  review() {
    if(!this.injections.User.isUserActive()) {
      return this.injections.$translate('errors.onlyActive')
        .then(this.injections.notify.warning.bind(this.injections.notify));
    }
    var url = this.injections.$state.href('review', {widgetId: this.widgetId, blockId: this.injections.block.id});

    var reviewWindow = this.injections.$window.open(url, '_blank','width=4000,height=800,menubar=no,toolbar=no,location=no,resizable=yes,scrollbars=yes,status=yes,personalbar=no');

    this.setReviewMethods(reviewWindow);
  }

  /**
   * Assigns response from api to the scope.
   *
   * @param status
   */

  setReviewMethods(reviewWindow) {
    reviewWindow[this.injections.Constants.reviewCreateStartWindowField] = this.goToCreateStart.bind(this);
    reviewWindow[this.injections.Constants.reviewCreateQuestionsWindowField] = this.goToCreateQuestions.bind(this);
    reviewWindow[this.injections.Constants.reviewCreateEndWindowField] = this.goToCreateEnd.bind(this);
  }

  /**
   * Assigns response from api to the scope.
   *
   * @param status
   */

  goToCreateStart() {
    this.injections.$state.go('blocks.show.startPages.create', {id: this.widgetId});
  }

  /**
   * Assigns response from api to the scope.
   *
   * @param status
   */

  goToCreateQuestions() {
    this.injections.$state.go('blocks.show.questions.create', {id: this.widgetId});
  }

  /**
   * Assigns response from api to the scope.
   *
   * @param status
   */

  goToCreateEnd() {
    this.injections.$state.go('blocks.show.endPages.create', {id: this.widgetId});
  }

  /**
   * Assigns response from api to the scope.
   *
   * @param status
   */

  hasActiveBlock(widget) {
    var self = this;

    return widget.blocks.filter(function (block) {
      return block.state === self.injections.Constants.blockStates.active;
    })[0];
  }

  /**
   * Assigns response from api to the scope.
   *
   * @param status
   */

  hasEditBlock(widget) {
    var self = this;

    return widget.blocks.filter(function (block) {
      return block.state === self.injections.Constants.blockStates.edit;
    })[0];
  }

  /**
   * Assigns response from api to the scope.
   *
   * @param status
   */

  hasVersions(widget) {
    var self = this;

    return widget.blocks.filter(function (block) {
      return block.state === self.injections.Constants.blockStates.version;
    })[0];
  }

  /**
   * Assigns response from api to the scope.
   *
   * @param status
   */

  isActiveStateNow() {
    return this.state === this.injections.Constants.blockStates.active;
  }


  /**
   * Assigns response from api to the scope.
   *
   * @param status
   */

  isVersionStateNow() {
    return this.state === this.injections.Constants.blockStates.versions;
  }

  /**
   * Assigns response from api to the scope.
   *
   * @param status
   */

  isEditStateNow() {
    return this.state === this.injections.Constants.blockStates.edit;
  }

  /**
   * Loads room list from api.
   *
   * @returns {*|Function}
   */

  onEdit() {
    this._edit()
      .then(this._redirectToEdit.bind(this));
  }

  /**
   * Loads room list from api.
   *
   * @returns {*|Function}
   */

  _edit() {
    return this.injections.BlockResource.edit({widgetId: this.widgetId}).$promise;
  }

  /**
   * Loads room list from api.
   *
   * @returns {*|Function}
   */

  onActivate() {
    this._activate()
      .then(this._redirectToActive.bind(this));
  }

  /**
   * Loads room list from api.
   *
   * @returns {*|Function}
   */

  _activate() {
    return this.injections.BlockResource.activate({widgetId: this.widgetId}).$promise;
  }

  /**
   * Loads room list from api.
   *
   * @returns {*|Function}
   */

  _redirectToActive() {
    return this.injections.$state.go('blocks.show.questions.list', {id: this.widgetId, state: 'active'});
  }

  /**
   * Loads room list from api.
   *
   * @returns {*|Function}
   */

  _redirectToEdit() {
    return this.injections.$state.go('blocks.show.questions.list', {id: this.widgetId, state: 'edit'});
  }

}