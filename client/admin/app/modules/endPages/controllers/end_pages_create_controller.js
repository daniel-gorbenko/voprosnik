import Controller from '../../common/controllers/controller';

/**
 * RoomsCreateController controller.
 */

export default class RoomsCreateController extends Controller {
  static $inject = ['$translate', 'notify', 'block', 'EndPageResource', '$stateParams', '$state'];

  constructor() {
    super(arguments);

    this.widgetId = this.injections.$stateParams.id;
    this.state = this.injections.$stateParams.state;

    this.setDefaultData();
  }

  /**
   * Creates room by passed data and redirects after success.
   *
   * @param room
   * @param event
   */

  setDefaultData() {
    this.data = {
      blockId: parseInt(this.injections.block.id),
      description: ''
    };

  }

  create(data) {
    if(this.$form.$invalid) {
      return ;
    }

    delete data.option;

    this.injections.EndPageResource.save(data).$promise
      .then(this.redirectToAllQuestions.bind(this));
  }

  redirectToAllQuestions(data) {
    this.injections.$translate('endPages.create.success')
      .then(this.injections.notify.info.bind(this.injections.notify));

    this.injections.$state.go('blocks.show.questions.list', this.injections.$stateParams);
  }

}