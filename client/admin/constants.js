module.exports = {
  "formats": {
    "full": 1,
    "left": 2,
    "right": 3,
    "top": 4,
    "bottom": 5
  },
  "showTypes": {
    "open": 1
  },
  status: {
    disabled: false,
    active: true
  },
  questionTypes: {
    text: 3,
    one: 4,
    many: 5
  },
  userStatuses: {
    complete: 1,
    close: 2
  },
  pageTypes: {
    question: 1,
    start: 2,
    end: 3,
    success: 4
  },
  localStorage: {
    blockStatus: 'block_:id_status',
    blockTimestamp: 'block_:id_timestamp'
  },
  statistic: {
    visit: 1
  },
  urls: {
    createCollection: 'http://api.savevisitor.com/answers/collections',
    createAnswer: 'http://api.savevisitor.com/answers',
    completeCollection: 'http://api.savevisitor.com/answers/collections/complete',
    createContact: 'http://api.savevisitor.com/contacts',
    getStatistic: 'http://api.savevisitor.com/statistic'
  },
  blockDefaults: {
    colorMain: '#5f9ed3',
    colorAdditional: '#FFFFFF',
    showDelay: 2,
    templateId: 1
  },
  windowConfigField: 'VOPROSNIK_CONFIG',
  widgetOnLoadField: 'VOPROSNIK_ON_LOAD',
  widgetField: 'VOPROSNIK_WIDGET_INSTANCE',
  reviewCreateStartWindowField: 'VOPROSNIK_REVIEW_START',
  reviewCreateQuestionsWindowField: 'VOPROSNIK_REVIEW_QUESTIONS',
  reviewCreateEndWindowField: 'VOPROSNIK_REVIEW_END',
  blockStates: {
    active: 1,
    edit: 2,
    version: 3
  }
};