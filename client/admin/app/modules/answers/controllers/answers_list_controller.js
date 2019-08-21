import Controller from '../../common/controllers/controller';

/**
 * RoomsListController controller.
 */

export default class BlocksListController extends Controller {
  static $inject = ['ExportResource', '$window', 'config', 'block', 'Constants', 'AnswersService', 'QuestionResource', 'AnswerResource', '$stateParams'];

  constructor() {
    super(arguments);

    this.blockId = this.injections.block.id;

    this.loadAnswers()
      .then(this.fillListOfAnswers.bind(this));

    this.loadQuestions()
      .then(this.fillListOfQuestions.bind(this));
  }

  loadQuestions() {
    return this.injections.QuestionResource.get({blockId: this.blockId}).$promise;
  }

  loadAnswers() {
    return this.injections.AnswerResource.get({blockId: this.blockId}).$promise;
  }

  onExport(type) {
    this._exportType(type)
      .then(this._showDownloadLink.bind(this));
  }

  _exportType(type) {
    return this.injections.ExportResource.exportType({type: type, blockId: this.blockId}).$promise;
  }

  _showDownloadLink(data) {
    data = {key: data.response, type: 'csv'};

    this.exportFileName = this._generateExportFileName(data);
    this.downloadUrl = this._generateExportUrl(data);
  }

  downloadFile(url) {
    this.injections.$window.open(url, '_target');
    this.downloadUrl = null;
    this.exportFileName = null;
  }

  _generateExportFileName(data) {
    return ':key.:type'
      .replace(':key', data.key)
      .replace(':type', data.type);
  }

  _generateExportUrl(data) {
    return this.injections.config.api.baseUrl + '/export/'
      + this._generateExportFileName(data);
  }

  fillListOfQuestions(data) {
    this.questions = data.response.items;
    this.sortedNeededQuestions = this.injections.AnswersService.getSortedByPosition(this.questions);
  }

  fillListOfAnswers(data) {
    this.answersCollections = data.response.items;
  }

  isDataLoaded() {
    return this.questions && this.answersCollections;
  }

  getAnswerToQuestion(question, answers) {
    var relatedAnswer = this.injections.AnswersService.getAnswerForQuestion(question, answers);

    if(!relatedAnswer) {
      return null;
    }

    return this._getAnswerBasedOnType(question, relatedAnswer);
  }

  _getAnswerBasedOnType(question, answer) {
    if(question.type === this.injections.Constants.questionTypes.one) {
      return this._getOptionValue(question.options, answer.options[0]);
    }

    if(question.type === this.injections.Constants.questionTypes.many) {
      return this._getOptionsValues(question.options, answer.options).join(', ');
    }

    if(question.type === this.injections.Constants.questionTypes.text) {
      return answer.value;
    }
  }

  _getOptionValue(questionOptions, answerOption) {
    return questionOptions.filter(function (questionOption) {
      return answerOption.questionOptionId === questionOption.id;
    })[0].value;
  }

  _getOptionsValues(questionOptions, answerOptions) {
    var self = this;

    return answerOptions.map(function (answerOption) {
      return self._getOptionValue(questionOptions, answerOption);
    });
  }

}