import Controller from '../../common/controllers/controller';

/**
 * RoomsCreateController controller.
 */

export default class RoomsCreateController extends Controller {
  static $inject = ['$translate', 'notify', 'Constants', 'WidgetResource', '$state'];

  constructor() {
    super(arguments);

    this.widget = this._getDefaultData();

  }

  /**
   * Creates room by passed data and redirects after success.
   *
   * @param room
   * @param event
   */

  _getDefaultData() {
    return {
      blocks: [{
        format: this.injections.Constants.formats.full,
        templateId: this.injections.Constants.blockDefaults.templateId,
        colorMain: this.injections.Constants.blockDefaults.colorMain,
        showType: this.injections.Constants.showTypes.open,
        showDelay: this.injections.Constants.blockDefaults.showDelay,
        colorAdditional: this.injections.Constants.blockDefaults.colorAdditional,
        status: this.injections.Constants.status.disabled
      }]
    };
  }

  /**
   * Creates room by passed data and redirects after success.
   *
   * @param room
   * @param event
   */

  create(widget) {
    if(this.$form.$invalid) {
      return ;
    }

    this.injections.WidgetResource.save(widget).$promise
      .then(this.redirectAfterCreation.bind(this))
      .catch(this._setErrors.bind(this));
  }

  /**
   * Redirects user to his room list.
   */

  redirectAfterCreation() {
    this.injections.$translate('widgets.create.success')
      .then(this.injections.notify.info.bind(this.injections.notify));

    this.injections.$state.go('blocks.list');
  }

  /**
   * Redirects user to his room list.
   */

  _setErrors(response) {
    this.error = response.data.error;
    this.$form.url.$invalid = true;
  }
}