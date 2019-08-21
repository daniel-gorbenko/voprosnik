
import Service from '../../common/services/service';

export default class billingService extends Service {
  static $inject = ['$state', 'config', '$window'];

  constructor(args) {
    super(arguments);

    this.user = this.injections.$window.user;
  }

  checkAccess() {
    if(!this._isActiveUser(this.user)) {
      this.injections.$state.go('billing');
    }
  }

  _isActiveUser(user) {
    return user.active === true;
  }
}