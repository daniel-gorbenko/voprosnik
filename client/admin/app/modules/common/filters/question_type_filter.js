
function Filter(Constants) {
  let FORMATS = {};

  FORMATS[Constants.questionTypes.start] = 'filters.questionTypes.startPage';
  FORMATS[Constants.questionTypes.end] = 'filters.questionTypes.endPage';
  FORMATS[Constants.questionTypes.text] = 'filters.questionTypes.text';
  FORMATS[Constants.questionTypes.one] = 'filters.questionTypes.one';
  FORMATS[Constants.questionTypes.many] = 'filters.questionTypes.many';

  return function (format) {
    return FORMATS[format];
  }

}

Filter.$inject = ['Constants'];

export default Filter;