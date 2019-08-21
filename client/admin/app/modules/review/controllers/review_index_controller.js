import Controller from '../../common/controllers/controller';

/**
 * RoomsListController controller.
 */

export default class DesignController extends Controller {
  static $inject = ['Constants', '$stateParams', '$window'];

  constructor() {
    super(arguments);

    this.widgetData = this._getWidgetData();
    this.warnings = {};
  }

  _getWidgetData() {
    return {
      widgetId: this.injections.$stateParams.widgetId,
      blockId: this.injections.$stateParams.blockId
    };
  }

  onClose() {
    this.injections.$window.close();
  }

  onCreateStart() {
    this.injections.$window[this.injections.Constants.reviewCreateStartWindowField]();

    this.onClose();
  }

  onCreateQuestions() {
    this.injections.$window[this.injections.Constants.reviewCreateQuestionsWindowField]();

    this.onClose();
  }

  onCreateEnd() {
    this.injections.$window[this.injections.Constants.reviewCreateEndWindowField]();

    this.onClose();
  }
}