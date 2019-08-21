export default class Injector {
  static $inject = [];

  /**
   * Constructor
   *
   * @param {Array|Object} injectionsArgs 'arguments' object of constructor
   */

  constructor(injectionsArgs) {
    this.injections = this.injectDependencies(injectionsArgs, this.constructor.$inject);
  }

  /**
   * Creates 'injections' object on current instance(this)
   * and writes dependencies specified in '$inject' field into 'injections' field
   * with appropriate names.
   * Example:
   *
   * class ChildController extends Injector {
   *   constructor() {
   *     super(arguments);
   *   }
   *
   *   myMethod() {
   *     // Dependencies are available in 'injections' field
   *     this.injections.$q;
   *     this.injections.MyService.doSomething();
   *   }
   * }
   *
   * ChildController.$inject = ['$q', 'MyService'];
   *
   * @param {Array|Object} args Array or child's 'arguments' object
   * @param {Array} injectionNames Array of dependencies to inject
   */

  injectDependencies(args, injectionNames) {
    let dependencies = Array.prototype.slice.call(args);

    if( Object.prototype.toString.call( injectionNames ) !== '[object Array]' ) {
      throw new Error('Specify "$inject" field of controller');
    }

    let injections = {};

    for(let i = 0, l = injectionNames.length; i < l; i++) {
      injections[injectionNames[i]] = dependencies[i];
    }

    return injections;
  }
}