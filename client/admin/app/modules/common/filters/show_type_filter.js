
function Filter(Constants) {
  let FORMATS = {};

  FORMATS[Constants.showTypes.open] = 'filters.showTypes.open';
  FORMATS[Constants.showTypes.close] = 'filters.showTypes.close';

  return function (format) {
    return FORMATS[format];
  }
}

Filter.$inject = ['Constants'];

export default Filter;