import Service from '../../common/services/service';

/**
 * RoomsListController controller.
 */

export default class AnswersService extends Service {
  static $inject = ['Constants'];

  constructor() {
    super(arguments);

    this._questionTypes = this._getQuestionTypes();
  }

  _getQuestionTypes() {
    return [
      this.injections.Constants.questionTypes.text,
      this.injections.Constants.questionTypes.many,
      this.injections.Constants.questionTypes.one
    ];
  }

  getSortedByPosition(questions) {
    return questions.sort(function (prev, next) {
      return prev.position > next.position;
    });
  }

  getAnswerForQuestion(question, answers) {
    return answers.filter(function (answer) {
      return answer.questionId === question.id;
    })[0];
  }
}