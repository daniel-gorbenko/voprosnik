import Controller from '../../common/controllers/controller';

/**
 * RoomsListController controller.
 */

export default class BlocksListController extends Controller {
  static $inject = ['Constants', 'BlockResource', '$stateParams'];

  constructor() {
    super(arguments);

    this.widgetId = this.injections.$stateParams.id;

    this.loadVersions()
      .then(this.fillListOfVersions.bind(this));
  }

  /**
   * Loads room list from api.
   *
   * @returns {*|Function}
   */

  loadVersions() {
    return this.injections.BlockResource.getVersions({widgetId: this.widgetId}).$promise;
  }

  /**
   * Assigns response from api to the scope.
   *
   * @param data
   */

  fillListOfVersions(data) {
    this.versions = data.response.items;
  }

}