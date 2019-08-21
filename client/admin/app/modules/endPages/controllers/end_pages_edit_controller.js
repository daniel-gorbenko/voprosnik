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

    this.loadQuestion()
      .then(this.fillQuestion.bind(this));
  }

  /**
   * Creates room by passed data and redirects after success.
   *
   * @param room
   * @param event
   */

  loadQuestion() {
    return this.injections.EndPageResource.get({blockId: this.injections.block.id, id: this.injections.$stateParams.endPageId}).$promise;
  }

  fillQuestion(data) {
    this.data = data.response;
  }

  onSave(data) {
    if(this.$form.$invalid) {
      return ;
    }

    this._save(data)
      .then(this.redirectToAllQuestions.bind(this));
  }

  _save(data) {
    return this.injections.EndPageResource.save(data).$promise;
  }

  redirectToAllQuestions(data) {
    this.injections.$translate('endPages.edit.success')
      .then(this.injections.notify.info.bind(this.injections.notify));

    this.injections.$state.go('blocks.show.questions.list', this.injections.$stateParams);
  }
}