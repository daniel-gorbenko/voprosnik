import Controller from '../../common/controllers/controller';

/**
 * RoomsCreateController controller.
 */

export default class RoomsCreateController extends Controller {
  static $inject = ['config', '$state'];

  constructor() {
    super(arguments);

    this.logoutUrl = this.injections.config.api.logoutUrl;
  }

}