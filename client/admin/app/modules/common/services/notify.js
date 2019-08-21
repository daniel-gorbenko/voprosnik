
import Service from './service';

export default class notify extends Service {
  static $inject = ['ngNotify'];

  constructor(args) {
    super(arguments);
  }

  error(message) {
    this.injections.ngNotify.set(message, 'error');
  }

  success(message) {
    this.injections.ngNotify.set(message, 'success');
  }

  warning(message) {
    this.injections.ngNotify.set(message, 'warn');
  }

  info(message) {
    this.injections.ngNotify.set(message, 'info');
  }
}