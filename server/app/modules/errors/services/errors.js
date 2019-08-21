'use strict';

var errors = {};

errors['IncorrectDataError'] = IncorrectDataError;
errors['ForbiddenError'] = ForbiddenError;
errors['AlreadyInRoomError'] = AlreadyInRoomError;
errors['IncorrectLinkError'] = IncorrectLinkError;
errors['UnhandledError'] = UnhandledError;
errors['UnauthorizedError'] = UnauthorizedError;
errors['NotActiveError'] = NotActiveError;

function IncorrectDataError(message) {
  this.message = message;
}
IncorrectDataError.prototype.name = 'IncorrectDataError';

function NotActiveError(message) {
  this.message = message;
}
NotActiveError.prototype.name = 'NotActiveError';

function ForbiddenError() {}
ForbiddenError.prototype.name = 'ForbiddenError';

function AlreadyInRoomError() {}
AlreadyInRoomError.prototype.name = 'AlreadyInRoomError';

function IncorrectLinkError() {}
IncorrectLinkError.prototype.name = 'IncorrectLinkError';

function UnhandledError() {}
UnhandledError.prototype.name = 'UnhandledError';

function UnauthorizedError() {}
UnauthorizedError.prototype.name = 'UnauthorizedError';



errors.parseErrors = function (errors, vocabulary) {
  if(!errors) {
    return {};
  }

  return errors.reduce(function (prev, error) {
    prev[error.path] = {};
    prev[error.path].message = vocabulary.errors[error.message];

    return prev;
  }, {});
};

module.exports = errors;