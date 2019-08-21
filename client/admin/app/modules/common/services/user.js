
import Service from './service';

export default class User extends Service {
  static $inject = ['UserResource', '$window'];

  constructor(args) {
    super(arguments);

    this.user = this.injections.$window.user;
    this.updateUser();
  }

  getUser() {
    return this.user;
  }

  _loadUser() {
    return this.injections.UserResource.get().$promise;
  }

  _fillUser(data) {
    this.user = data.response;
  }

  updateUser() {
    return this._loadUser()
      .then(this._fillUser.bind(this))
      .then(this.getUser.bind(this));
  }

  isUserActive() {
    return this.user.active === true;
  }
}