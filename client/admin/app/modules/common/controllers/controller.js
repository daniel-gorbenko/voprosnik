import Injector from '../services/injector';

/**
 * Common controller for extending.
 */

export default class Controller extends Injector {
  static $inject = [];

  constructor(args) {
    super(args);
  }
}