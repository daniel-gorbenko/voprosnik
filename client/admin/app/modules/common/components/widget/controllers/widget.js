import Controller from '../../../controllers/controller';

/**
 * RoomsListController controller.
 */

export default class WidgetController extends Controller {
  static $inject = ['$scope', 'Constants'];

  constructor(args) {
    super(arguments);

    this.data = this.injections.$scope.data;
    this.warnings = this.injections.$scope.warnings || {};

    this._init();
  }

  _init() {

    /**
     * If widget is already loaded call widgetInitialization just now
     */

    if(window[this.injections.Constants.widgetField]) {
      this._setWidgetConfig(window[this.injections.Constants.widgetField]);

      return ;
    }

    /***
     * If widget is not created yet, set callback
     * which will be called when widget will be initialized
     */

    window[this.injections.Constants.widgetOnLoadField] = this._setWidgetConfig.bind(this);
  }

  _setWidgetConfig(widget) {
    this.widget = widget;
    this.widget.__demo = true;

    this._setWidgetCallbacks();
  }

  _setWidgetCallbacks() {
    this._setDefaultWidgetMethods();
    this._setNewWidgetMethods();
  }

  _setDefaultWidgetMethods() {
    this._defaultWidgetMethods = {
      _onInit: this.widget.init,
      _onCheck: this.widget._onCheck,
      _onEndPage: this.widget._onEndPage,
      _onStartPage: this.widget._onStartPage,
      _onWidgetClose: this.widget._onWidgetClose
    };
  }

  _setNewWidgetMethods() {
    this.widget.init = this._onInit.bind(this);
    this.widget._onCheck = this._onCheck.bind(this);
    this.widget._onEndPage = this._onEndPage.bind(this);
    this.widget._onStartPage = this._onStartPage.bind(this);
    this.widget._isActiveWidget = this._isActiveWidget.bind(this);
    this.widget._isUserCompleteBlock = this._isUserCompleteBlock.bind(this);
    this.widget._isUserCloseBlock = this._isUserCloseBlock.bind(this);
    this.widget._onWidgetClose = this._onWidgetClose.bind(this);
    this.widget._ajax = this._ajax.bind(this);
  }


  /***
   * New widget methods
   */

  _onInit() {
    if(!this.widget.settings.startPage) {
      this.warnings.start = true;
      this.injections.$scope.$apply();

      return ;
    }

    this._defaultWidgetMethods._onInit.call(this.widget);
  }

  _onCheck() {
    if(this.widget.settings.questions.length === 0) {
      this.warnings.questions = true;
      this.injections.$scope.$apply();

      return ;
    }

    this._defaultWidgetMethods._onCheck.call(this.widget);
  }

  _onEndPage() {
    if(!this.widget.settings.endPage) {
      this.warnings.end = true;
      this.injections.$scope.$apply();

      return ;
    }

    this._defaultWidgetMethods._onEndPage.call(this.widget);
  }

  _onStartPage() {
    if(!this.widget.settings.startPage) {
      this.warnings.start = true;
      this.injections.$scope.$apply();

      return ;
    }

    this._defaultWidgetMethods._onStartPage.call(this.widget);
  }

  _onWidgetClose() {
    if(this.injections.$scope.onClose) {

      // if method returns false, stop execution
      if(!this.injections.$scope.onClose({widget: this.widget})) {
        return ;
      }
    }

    this._defaultWidgetMethods._onWidgetClose.call(this.widget);
  }

  _isActiveWidget() {
    return true;
  }

  _isUserCompleteBlock() {
    return false;
  }

  _isUserCloseBlock() {
    return false;
  }

  _ajax(data, cb) {
    data = {response: data.data || {}};

    if(cb) {
      cb(data);
    }

    return false;
  }
}