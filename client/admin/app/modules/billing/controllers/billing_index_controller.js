import Controller from '../../common/controllers/controller';

/**
 * RoomsCreateController controller.
 */

export default class RoomsCreateController extends Controller {
  static $inject = ['$state', 'TariffResource', 'BillingResource', 'User'];

  constructor() {
    super(arguments);

    this.loadTariffs()
      .then(this.fillListOfTariffs.bind(this));

    this.userService = this.injections.User;
  }

  loadTariffs() {
    return this.injections.TariffResource.get().$promise;
  }

  fillListOfTariffs(data) {
    this.tariffs = data.response.items;
  }

  onPurchase(tariffId) {
    this._purchase(tariffId)
      .then(this._onSuccessPurchase.bind(this));
  }

  _purchase(tariffId) {
    return this.injections.BillingResource.purchase({tariffId: tariffId}).$promise;
  }

  _onSuccessPurchase() {
    this._updateUser();
  }

  _updateUser() {
    this.injections.User.updateUser();
  }
}