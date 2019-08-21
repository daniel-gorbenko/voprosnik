import Controller from '../../common/controllers/controller';

/**
 * RoomsListController controller.
 */

export default class BlocksListController extends Controller {
  //static $inject = ['BlockResource'];
  static $inject = ['$q', '$stateParams'];

  constructor() {
    super(arguments);

    this.blockId = this.injections.$stateParams.id;
  }

}