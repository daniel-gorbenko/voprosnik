import Controller from '../../common/controllers/controller';

/**
 * RoomsListController controller.
 */

export default class DesignController extends Controller {
  static $inject = ['$translate', 'notify', 'block', 'TemplateResource', 'Constants', 'BlockResource', '$stateParams'];

  constructor() {
    super(arguments);

    this.blockId = this.injections.block.id;
    this.formats = this.injections.Constants.formats;
    this.showTypes = this.injections.Constants.showTypes;

    this.loadBlock()
      .then(this.fillBlock.bind(this));

    this.loadTemplates()
      .then(this.fillTemplates.bind(this));
  }

  loadBlock() {
    return this.injections.BlockResource.get({id: this.blockId}).$promise;
  }

  fillBlock(data) {
    this.data = data.response;
  }

  loadTemplates() {
    return this.injections.TemplateResource.get().$promise;
  }

  fillTemplates(data) {
    this.templates = data.response.items;
  }

  onSave(data) {
    if(this.$form.$invalid) {
      return ;
    }

    this._save(data)
      .then(this._showMessage.bind(this));
  }

  _save(data) {
    return this.injections.BlockResource.save(data).$promise;
  }

  _showMessage() {
    return this.injections.$translate('design.success')
      .then(this.injections.notify.info.bind(this.injections.notify));
  }

  isOpenShowType() {
    return this.data.showType === this.showTypes.open;
  }

  isDataLoaded() {
    return this.data;
  }

}