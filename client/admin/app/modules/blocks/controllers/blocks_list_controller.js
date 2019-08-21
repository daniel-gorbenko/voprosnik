import Controller from '../../common/controllers/controller';

/**
 * RoomsListController controller.
 */

export default class BlocksListController extends Controller {
  static $inject = ['WidgetResource'];
  //static $inject = ['$q'];

  constructor() {
    super(arguments);

    this.loadWidgets()
      .then(this.fillListOfBlocks.bind(this));
  }

  /**
   * Loads room list from api.
   *
   * @returns {*|Function}
   */

  loadWidgets() {
    return this.injections.WidgetResource.get().$promise;
  }

  /**
   * Assigns response from api to the scope.
   *
   * @param data
   */

  fillListOfBlocks(data) {
    this.widgets = data.response.items;
  }

  /**
   * Assigns response from api to the scope.
   *
   * @param data
   */

  getCurrentWidgetState(widget) {
    if(widget.blocks.length === 0) {
      return 'edit';
    }

    return 'active';
  }

}