
function Filter(Constants) {
  let FORMATS = {};

  FORMATS[Constants.formats.full] = 'На весь экран';
  FORMATS[Constants.formats.left] = 'Слева';
  FORMATS[Constants.formats.right] = 'Справа';
  FORMATS[Constants.formats.top] = 'Вверху';
  FORMATS[Constants.formats.bottom] = 'Внизу';

  return function (format) {
    return FORMATS[format];
  }
}

Filter.$inject = ['Constants'];

export default Filter;