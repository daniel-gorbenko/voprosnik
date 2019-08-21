import Injector from './injector';

/**
 * Common controller for extending.
 */

export default class Service extends Injector {
  static $inject = [];

  constructor(args) {
    super(args);
  }
}