(function (global) {


  /**
   * Widget constructor
   *
   * @param {Object} settings Id of the widget
   * @constructor
   */

  function Widget(settings) {
    this.settings = settings;

    this.id = this.settings.id;
    this.display = false;
    this.$container = null;
    this.answers = [];

    this.constants = settings.constants;

    window[this.constants.widgetField] = this;

    if(typeof window[this.constants.widgetOnLoadField] === 'function') {
      window[this.constants.widgetOnLoadField](this);
    }
  }

  /**
   * Initializes widget. Loads settings,
   * shows widget.
   */

  Widget.prototype.init = function () {
    if(!this._isActiveWidget()) {
      // send message to the server, that widget is not active

      return ;
    }

    if(this._isMobile()) {
      // We currently don't support

      return ;
    }

    if(this._isUserCompleteBlock()) {
      // send message to the server,
      // that user that already pass the test, get it again
      console.log('user already pass the test');

      return ;
    }

    if(this._isUserCloseBlock()) {
      //set additional settings to show widget
      console.log('user closed this test some time ago');

      return ;
    }

    this._sortQuestions();
    this._generateCss();
    this._setCurrentPage(this.settings.startPage);
    this._determineFormat();
    this._determineShowTypeAndShow(this._onStartPage.bind(this));
  };

  /**
   * Initializes widget. Loads settings,
   * shows widget.
   */

  Widget.prototype._generateCss = function () {
    var style = document.createElement('STYLE');

    style.innerHTML = this._prepareCss();
    style.type = "text/css";

    var head = document.getElementsByTagName('head')[0];

    head.appendChild(style);
  };

  /**
   * Initializes widget. Loads settings,
   * shows widget.
   */

  Widget.prototype._prepareCss = function () {
    return '.VOPROSNIK-button { background: :btn-bg; color: :btn-color; }'
      .replace(':btn-bg', this.settings.colorMain)
      .replace(':btn-color', this.settings.colorAdditional);
  };

  /**
   * Initializes widget. Loads settings,
   * shows widget.
   */

  Widget.prototype._sortQuestions = function () {
    this.settings.questions = this._sortByPosition(this.settings.questions);
  };

  /**
   * Initializes widget. Loads settings,
   * shows widget.
   */

  Widget.prototype._isMobile = function () {
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
      return true;
    }

    return false;
  };

  /**
   * Initializes widget. Loads settings,
   * shows widget.
   */

  Widget.prototype._isActiveWidget = function () {
    return this.settings.status === this.constants.status.active;
  };

  /**
   * Initializes widget. Loads settings,
   * shows widget.
   */

  Widget.prototype._isUserCompleteBlock = function () {
    return this.getUserStatus() == this.constants.userStatuses.complete;
  };

  /**
   * Initializes widget. Loads settings,
   * shows widget.
   */

  Widget.prototype._isUserCloseBlock = function () {
    return this.getUserStatus() == this.constants.userStatuses.close;
  };

  /**
   * Initializes widget. Loads settings,
   * shows widget.
   */

  Widget.prototype.getUserStatus = function () {
    return localStorage.getItem(this.constants.localStorage.blockStatus.replace(':id', this.settings.widgetId));
  };

  /**
   * Initializes widget. Loads settings,
   * shows widget.
   */

  Widget.prototype._blurAllBodyChildrenExceptWidget = function () {
    var children = document.body.children, i, l;

    for(i = 0, l = children.length; i < l; i++) {
      this._setBlurred(children[i]);
    }

    this._setUnBlurred(document.getElementById('VOPROSNIK'));
  };

  /**
   * Initializes widget. Loads settings,
   * shows widget.
   */

  Widget.prototype._unblurAllBodyChildrenExceptWidget = function () {
    var children = document.body.children, i, l;

    for(i = 0, l = children.length; i < l; i++) {
      this._setUnBlurred(children[i]);
    }
  };

  /**
   * Initializes widget. Loads settings,
   * shows widget.
   */

  Widget.prototype._sortByPosition = function (questions) {
    return questions.sort(function (prev, next) {
      return prev.position > next.position;
    });
  };

  /**
   * Initializes widget. Loads settings,
   * shows widget.
   */

  Widget.prototype._setBlurred = function (el) {
    el.style['-webkit-filter'] = 'blur(4px)';
  };

  /**
   * Initializes widget. Loads settings,
   * shows widget.
   */

  Widget.prototype._setUnBlurred = function (el) {
    el.style['-webkit-filter'] = 'none';
  };

  /**
   * Shows widget
   */

  Widget.prototype._onStartPage = function () {
    this._sendStatistic(this.constants.statistic.visit);

    this._addContainerToBody();

    setTimeout(this._markContainerAsActive.bind(this), 50);
  };

  /**
   * Shows widget
   */

  Widget.prototype._setCurrentPage = function (page) {
    this.currentPage = page;
  };

  /**
   * Shows widget
   */

  Widget.prototype._markContainerAsActive = function () {
    this.$container.className += ' VOPROSNIK--active';
  };

  /**
   * Shows widget
   */

  Widget.prototype._markContainerAsUnActive = function () {
    this.$container.className = this.$container.className.replace('VOPROSNIK--active', '');
  };

  /**
   * Shows widget
   */

  Widget.prototype._determineShowTypeAndShow = function (show) {
    if(this.settings.showType === this.constants.showTypes.open) {

      if(!this.settings.showDelay) {
        show();

        return ;
      }

      setTimeout(show, this.settings.showDelay * 1000);
    }

  };

  /**
   * Shows widget
   */

  Widget.prototype._determineFormat = function () {
    if(this.settings.format === this.constants.formats.full) {
      this._prepareFullFormat();
      this._setTemplateForFullFormat(this.settings.template.startPage);
      this._setFullFormatCallbacks();

      return;
    }

    if(this.settings.format === this.constants.formats.left) {
      this._prepareFormat(this.settings.template.formatLeft);
    }

    if(this.settings.format === this.constants.formats.right) {
      this._prepareFormat(this.settings.template.formatRight);
    }

    if(this.settings.format === this.constants.formats.top) {
      this._prepareFormat(this.settings.template.formatTop);
    }

    if(this.settings.format === this.constants.formats.bottom) {
      this._prepareFormat(this.settings.template.formatBottom);
    }

    this._setFormatCallbacks();
  };

  /**
   * Shows widget
   */

  Widget.prototype._prepareFullFormat = function () {
    this.$container = this._getHTMLObject(this.settings.template.container);
    this.$content = this.$container.querySelector('#W_VOPROSU-page');
  };

  /**
   * Shows widget
   */

  Widget.prototype._setTemplateForFullFormat = function (template) {
    var widget = this.render(template, this.currentPage);

    this._insertContent(this.$content, this._getHTMLObject(widget));
  };

  /**
   * Shows widget
   */

  Widget.prototype._prepareFormat = function (template) {
    var widget = this.render(template, this.currentPage);

    this.$container = this._getHTMLObject(widget);
  };

  /**
   * Shows widget
   */

  Widget.prototype._setFormatCallbacks = function () {
    this.$container.querySelector('#VOPROSNIK-format-open').addEventListener('click', this._onShowFullFormat.bind(this), false);
  };

  /**
   * Shows widget
   */

  Widget.prototype._setFullFormatCallbacks = function () {
    this.$container.querySelector('#W_VOPROSU-close').addEventListener('click', this.closeWidgetWithStat.bind(this), false);
    this.$container.querySelector('#W_VOPROSU-check').addEventListener('click', this._onCheck.bind(this), false);
  };

  /**
   * Shows widget
   */

  Widget.prototype._onShowFullFormat = function () {
    var self = this;

    this._createCollection(function (data) {
      self._onCreateCollection(data);
      self._hideFormatted();
      self._prepareFullFormat();
      self._setContainerCallbacks();
      self._addContainerToBody();

      self.goToNextQuestion();
    });
  };

  /**
   * Shows widget
   */

  Widget.prototype.goToNextQuestion = function () {
    var nextQuestion;

    if(!this._isCurrentPageQuestion()) {
      nextQuestion = this.settings.questions[0];
    }

    if(this._isCurrentPageQuestion() && this._isExistNextQuestion()) {
      nextQuestion = this._getNextQuestion();
    }

    this._setCurrentPage(nextQuestion);
    this.changePage(this.settings.template.question, this._prepareQuestionData(nextQuestion), this.constants.pageTypes.question);
  };

  /**
   * Shows widget
   */

  Widget.prototype._onEndPage = function () {
    this._setCurrentPage(this.settings.endPage);
    this.changePage(this.settings.template.endPage, this.settings.endPage, this.constants.pageTypes.end);
  };

  /**
   * Shows widget
   */

  Widget.prototype.goToSuccessWindow = function () {
    this._setCurrentPage(this.settings.successPage);
    this.changePage(this.settings.template.successPage, this.settings.successPage, this.constants.pageTypes.success);
    this._hideCloseButton();

    setTimeout(this._onWidgetClose.bind(this), this.settings.closeSuccessDelay || 700);
  };

  /**
   * Renders text to html object with passed params
   */

  Widget.prototype._hideCloseButton = function () {
    this.$container.querySelector('#W_VOPROSU-close').style.display = 'none';
  };

  /**
   * Renders text to html object with passed params
   */

  Widget.prototype._isCurrentPageQuestion = function () {
    return this._getCurrentQuestionIndex() !== -1;
  };

  /**
   * Renders text to html object with passed params
   */

  Widget.prototype._isExistNextQuestion = function () {
    return this._isExistQuestion(this._getCurrentQuestionIndex() + 1);
  };

  /**
   * Renders text to html object with passed params
   */

  Widget.prototype._getCurrentQuestionIndex = function () {
    return this.settings.questions.indexOf(this.currentPage);
  };

  /**
   * Renders text to html object with passed params
   */

  Widget.prototype._getNextQuestionIndex = function () {
    return this._getCurrentQuestionIndex()+1;
  };

  /**
   * Renders text to html object with passed params
   */

  Widget.prototype._isExistQuestion = function (index) {
    return this.settings.questions[index];
  };

  /**
   * Shows widget
   */

  Widget.prototype.changePage = function (template, data, type) {
    var to = this.render(template, data);

    var $to = this._getHTMLObject(to);

    this._insertContent(this.$content, $to);
    this._setCallbacksFor(type);
  };

  /**
   * Shows widget
   */

  Widget.prototype._getNextQuestion = function () {
    return this.settings.questions[this._getNextQuestionIndex()];
  };

  /**
   * Shows widget
   */

  Widget.prototype._addContainerToBody = function () {
    this._appendContent(document.body, this.$container);
  };

  /**
   * Shows widget
   */

  Widget.prototype._createCollection = function (cb) {
    this._ajax({
      method: 'POST',
      url: this.constants.urls.createCollection,
      data: this._prepareAnswerCollectionData()
    }, cb);
  };

  /**
   * Shows widget
   */

  Widget.prototype._onCreateCollection = function (data) {
    this.answersCollectionId = data.response.id;
  };

  /**
   * Shows widget
   */

  Widget.prototype._hideFormatted = function () {
    document.body.removeChild(this.$container);
  };

  /**
   * Renders text to html object with passed params
   *
   * @param template
   * @param options
   * @return string Returns html object
   */

  Widget.prototype.render = function (template, options) {
    var option, result = template, substitution, answer;

    for(option in options) {
      if(options.hasOwnProperty(option)) {
        substitution = options[option];

        if(this._isAnswer(substitution)) {
          substitution = this._getAnswerValue(substitution);
        }

        result = result.replace('{{' + option + '}}', substitution);
      }
    }

    return result;
  };

  /**
   * Renders text to html object with passed params
   *
   * @param field
   * @return string|boolean Returns html object
   */

  Widget.prototype._isAnswer = function (field) {
    var pattern = /\{\{answer\:(\d)\}\}/;

    return pattern.test(field);
  };

  /**
   * Renders text to html object with passed params
   *
   * @param field
   * @return string|boolean Returns html object
   */

  Widget.prototype._getAnswerValue = function (field) {
    var pattern, i, l, match, answerOrder;

    pattern = /\{\{answer\:(\d)\}\}/;

    match = field.match(pattern);

    for( i = 0, l = this.answers.length ; i < l; i++) {
      // -1 because we count from 0. If we will write answers like {{answer:0}}, ie.
      // from ZERO, we should use just match[1], without minus 1 (-1)
      answerOrder = match[1] - 1;
      if(i == answerOrder) {
        return field.replace(match[0], this.answers[i].value);
      }
    }
  };

  /**
   * Renders text to html object with passed params
   */

  Widget.prototype._getHTMLObject  = function ( content) {
    var el = document.createElement('DIV');
    el.innerHTML = content;

    return el.firstChild;
  };

  /**
   * Renders text to html object with passed params
   */

  Widget.prototype._insertContent  = function (target, content) {
    target.innerHTML = '';

    this._appendContent(target, content);

    return target;
  };

  /**
   * Renders text to html object with passed params
   */

  Widget.prototype._appendContent  = function (target, content) {
    target.appendChild(content);

    return target;
  };

  /**
   * Renders text to html object with passed params
   */

  Widget.prototype._setCallbacksFor = function (type) {
    if(type === this.constants.pageTypes.end) {
      this.$container.querySelector('#W_VOPROSU-send').addEventListener('click', this._onSend.bind(this));
    }

    if(type === this.constants.pageTypes.question) {
      if(this.currentPage.type === this.constants.questionTypes.one) {
        this._addListenerForElements(this.$container.querySelectorAll('.W_VOPROSU-data'), 'click', this._onRadioClick.bind(this));
      }

      if(this.currentPage.type === this.constants.questionTypes.many) {
        this._addListenerForElements(this.$container.querySelectorAll('.W_VOPROSU-data'), 'click', this._onCheckboxClick.bind(this));
      }

      this.$container.querySelector('#W_VOPROSU-question-next').addEventListener('click', this._onNextQuestion.bind(this), false);
    }
  };

  /**
   * Renders text to html object with passed params
   */

  Widget.prototype._addListenerForElements = function (elements, event, method) {
    var i = 0, l = elements.length;

    for( ; i < l; i++) {
      elements[i].addEventListener(event, method, false);
    }
  };

  /**
   * Renders text to html object with passed params
   */

  Widget.prototype._onRadioClick = function (event) {
    if(this._isActiveRadio(event.target, 'active')) {
      return ;
    }

    var previousRadio = this._findActiveRadio('active');

    if(previousRadio !== null) {
      this._clearOptions();
      this._deleteClass(previousRadio, 'active');
    }

    this._addOption(this._generateOption(event.target));
    this._addClass(event.target, 'active');
  };

  /**
   * Renders text to html object with passed params
   */

  Widget.prototype._onCheckboxClick = function (event) {
    if(this._isActiveRadio(event.target, 'active')) {
      this._deleteOption(this._findOptionById(event.target.getAttribute('data-value')));
      this._deleteClass(event.target, 'active');

      return ;
    }

    this._addOption(this._generateOption(event.target));
    this._addClass(event.target, 'active');
  };

  /**
   * Renders text to html object with passed params
   */

  Widget.prototype._findOptionById = function (id) {
    if(!this._options) {
      return ;
    }

    return this._options.filter(function (option) {
      return option.id === id;
    })[0];
  };

  /**
   * Renders text to html object with passed params
   */

  Widget.prototype._deleteOption = function (option) {
    var index = this._options.indexOf(option);

    this._options.splice(index, 1);
  };

  /**
   * Renders text to html object with passed params
   */

  Widget.prototype._generateOption = function (el) {
    return {
      questionOptionId: el.getAttribute('data-value')
    };
  };

  /**
   * Renders text to html object with passed params
   */

  Widget.prototype._clearOptions = function () {
    this._options = [];
  };

  /**
   * Renders text to html object with passed params
   */

  Widget.prototype._addOption = function (option) {
    if(!this._options) {
      this._options = [];
    }

    this._options.push(option);
  };


  /**
   * Renders text to html object with passed params
   */

  Widget.prototype._findActiveRadio = function (cl) {
    return this.$container.querySelector('.W_VOPROSU-data' + '.' + cl);
  };

  /**
   * Renders text to html object with passed params
   */

  Widget.prototype._addClass = function (el, cl) {
    el.className += ' ' + cl;
  };

  /**
   * Renders text to html object with passed params
   */

  Widget.prototype._isActiveRadio = function (el, cl) {
    var pattern = new RegExp(cl);

    return pattern.test(el.className);
  };

  /**
   * Renders text to html object with passed params
   */

  Widget.prototype._deleteClass = function (el, cl) {
    el.className = el.className.replace(cl, '');
  };

  /**
   * Renders text to html object with passed params
   */

  Widget.prototype._onCheck = function () {
    var self = this;

    self._createCollection(function (data) {
      self._onCreateCollection(data);

      self.goToNextQuestion();
    });
  };

  /**
   * Renders text to html object with passed params
   */

  Widget.prototype._prepareAnswerCollectionData = function () {
    return {
      blockId: this.id
    };
  };

  /**
   * Renders text to html object with passed params
   */

  Widget.prototype._onNextQuestion = function () {
    if(this._isInvalid(this.currentPage.type, this.$container.querySelector('#W_VOPROSU-data'))) {
      this._shakeButton(this.$container.querySelector('#W_VOPROSU-question-next'));

      return ;
    }

    var answer = this._prepareAnswerData();

    this._pushLocalAnswer(answer);
    this._sendAnswer(answer);

    if(this._isExistNextQuestion()) {
      this._clearOptions();
      return this.goToNextQuestion();
    }

    return this._onEndPage();
  };

  /**
   * Renders text to html object with passed params
   */

  Widget.prototype._sendAnswer = function (answer, cb) {
    this._ajax({
      method: 'POST',
      url: this.constants.urls.createAnswer,
      data: answer
    }, function () {
      if(cb) {
        cb();
      }
    });
  };

  /**
   * Renders text to html object with passed params
   */

  Widget.prototype._pushLocalAnswer = function (answer) {
    this.answers.push(answer);
  };

  /**
   * Renders text to html object with passed params
   */

  Widget.prototype._shakeButton = function (btn) {
    btn.className += ' VOPROSNIK-button--invalid';

    setTimeout(function () {
      btn.className = btn.className.replace('VOPROSNIK-button--invalid', ' ');
    }, 820);
  };

  /**
   * Renders text to html object with passed params
   */

  Widget.prototype._onSend = function () {
    if(this._isInvalid(this.constants.pageTypes.end, this.$container.querySelector('#W_VOPROSU-data'))) {
      this._shakeButton(this.$container.querySelector('#W_VOPROSU-send'));

      return ;
    }

    this.createContact();
    this.completeCollection();
    this.markUser(this.constants.userStatuses.complete);

    this.goToSuccessWindow();
  };

  /**
   * Renders text to html object with passed params
   */

  Widget.prototype.markUser = function (status) {
    if(this.__demo) {
      return ;
    }

    localStorage.setItem(this.constants.localStorage.blockStatus.replace(':id', this.settings.widgetId), status);
  };

  /**
   * Renders text to html object with passed params
   */

  Widget.prototype.completeCollection = function (cb) {
    this._ajax({
      method: 'POST',
      url: this.constants.urls.completeCollection,
      data: this._prepareCompleteCollectionData()
    }, function (data) {
      if(cb) {
        cb(data);
      }
    });
  };

  /**
   * Renders text to html object with passed params
   */

  Widget.prototype.createContact = function (cb) {
    this._ajax({
      method: 'POST',
      url: this.constants.urls.createContact,
      data: this._prepareContactData()
    }, function (data) {
      if(cb) {
        cb(data);
      }
    });
  };

  /**
   * Renders text to html object with passed params
   */

  Widget.prototype._prepareAnswerData = function () {
    var answer = {
      questionId: this.currentPage.id,
      answersCollectionId: this.answersCollectionId,
      options: []
    };

    if(this.isTextQuestion()) {
      answer.value = this._getAnswerText();
    }

    if(this.isOptionsQuestion()) {
      answer.options = this._getAnswerOptions();
    }

    return answer;
  };

  /**
   * Renders text to html object with passed params
   */

  Widget.prototype._prepareContactData = function () {
    return {
      endPageId: this.currentPage.id,
      answersCollectionId: this.answersCollectionId,
      value: this._getAnswerText()
    };
  };

  /**
   * Renders text to html object with passed params
   */

  Widget.prototype._prepareCompleteCollectionData = function () {
    return {
      answersCollectionId: this.answersCollectionId
    };
  };

  /**
   * Renders text to html object with passed params
   */

  Widget.prototype._generateQuestion = function (question) {
    var content = '';

    if(question.type === this.constants.questionTypes.text) {
      return this.render(this.settings.template.questionText, question);
    }

    if(question.type === this.constants.questionTypes.one) {
      for(var i = 0, l = question.options.length; i < l; i++) {
        content += this.render(this.settings.template.questionOne, question.options[i]);
      }

      return content;
    }

    if(question.type === this.constants.questionTypes.many) {
      for(var i = 0, l = question.options.length; i < l; i++) {
        content += this.render(this.settings.template.questionMany, question.options[i]);
      }

      return content;
    }
  };

  /**
   * Renders text to html object with passed params
   */

  Widget.prototype._prepareQuestionData = function (question) {
    question.$question = this._generateQuestion(question);

    return question;
  };


  /**
   * Renders text to html object with passed params
   */

  Widget.prototype.closeWidgetWithStat = function () {
    this.markUser(this.constants.userStatuses.close);
    this._onWidgetClose();
  };

  /**
   * Renders text to html object with passed params
   */

  Widget.prototype._onWidgetClose = function () {
    this._markContainerAsUnActive();
    setTimeout(this._destroyWidget.bind(this), 300);
  };

  /**
   * Renders text to html object with passed params
   */

  Widget.prototype._destroyWidget = function () {
    //this._unblurAllBodyChildrenExceptWidget();

    document.body.removeChild(this.$container);

    return false;
  };

  /**
   * Renders text to html object with passed params
   */

  Widget.prototype._setContainerCallbacks = function () {
    this.$container.querySelector('#W_VOPROSU-close').addEventListener('click', this.closeWidgetWithStat.bind(this), false);
  };

  /**
   * Renders text to html object with passed params
   */

  Widget.prototype._sendStatistic = function (type) {
    var data;

    if(type === this.constants.statistic.visit) {
      data = this._prepareVisitStatisticData();
    }

    this._ajax({
      method: 'POST',
      url: this.constants.urls.getStatistic,
      data: data
    }, function () {
      // callback
    });
  };

  /**
   * Renders text to html object with passed params
   */

  Widget.prototype._prepareVisitStatisticData = function () {
    return {
      action: this.constants.statistic.visit,
      blockId: this.id
    };
  };

  /**
   * Renders text to html object with passed params
   */

  Widget.prototype._getAnswerText = function () {
    return this.$container.querySelector('#W_VOPROSU-data').value || null;
  };

  /**
   * Renders text to html object with passed params
   */

  Widget.prototype.isTextQuestion = function () {
    return this.currentPage.type === this.constants.questionTypes.text;
  };

  /**
   * Renders text to html object with passed params
   */

  Widget.prototype.isOptionsQuestion = function () {
    return this.currentPage.type === this.constants.questionTypes.one || this.currentPage.type === this.constants.questionTypes.many;
  };

  /**
   * Renders text to html object with passed params
   */

  Widget.prototype._getAnswerOptions = function () {
      return this._options;
  };

  /**
   * Renders text to html object with passed params
   */

  Widget.prototype._isInvalid = function (type, el) {
      if(type === this.constants.pageTypes.end) {
        return (el.value).trim() === '';
      }

      if(type === this.constants.questionTypes.text) {
        return (el.value).trim() === '';
      }

      if(type === this.constants.questionTypes.one) {
        return !this._options || !this._options.length;
      }

      if(type === this.constants.questionTypes.many) {
        return !this._options || !this._options.length;
      }
  };

  /**
   *
   * @param options
   * @param callback
   * @private
   */

  Widget.prototype._ajax = function (options, callback) {

    if(this.__demo) {
      callback({response: {}});

      return ;
    }

    options = options || {};

    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        callback(JSON.parse(xhr.responseText));
      }
    };

    xhr.open(options.method || 'GET', options.url, true);
    xhr.setRequestHeader('Content-type', options.ContentType || 'application/json');
    xhr.send(JSON.stringify(options.data) || null);
  };

  var widget = new Widget(global['VOPROSNIK_CONFIG']);

  widget.init();

})(window);
