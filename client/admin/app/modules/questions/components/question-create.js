/**
 *
 */

Controller.$inject = ['$scope', 'Constants'];

function Controller($scope, Constants) {
  this.data = $scope.data;
  this.Constants = Constants;
  this.questionTypes = this.Constants.questionTypes;
  this.$form = $scope.form;
}

Controller.prototype.addOption = function(option) {
  this.data.options.push(option);
  this.markOptionAsNew(option);
};

Controller.prototype.deleteOption = function(option) {
  var index = this.data.options.indexOf(option);

  this.data.options.splice(index, 1);
};

Controller.prototype.isEditing = function() {
  return !!this.data.id;
};

Controller.prototype.markOptionAsNew = function(option) {
  option.isNew = true;
};

Controller.prototype.markOptionAsUpdated = function(option) {
  if(!this.isMarkedOptionAsNew(option)) {
    option.isUpdated = true;
  }
};

Controller.prototype.markOptionAsDeleted = function(option) {
  if(this.isMarkedOptionAsNew(option)) {
    return this.deleteOption(option)
  }

  option.isDeleted = true;
};

Controller.prototype.isMarkedOptionAsNew = function(option) {
  return option.isNew === true;
};

Controller.prototype.onQuestionTypeChange = function(type) {
  this.data.options = [];
};

Controller.prototype.isMarkedOptionAsUpdated = function(option) {
  return option.isUpdated === true;
};

Controller.prototype.isMarkedOptionAsDeleted = function(option) {
  return option.isDeleted === true;
};

Controller.prototype.notDeleted = function(option) {
  return option.isDeleted !== true;
};


/**
 *
 * @returns {{restrict: string, template: *, controller: *, controllerAs: string, scope: {data: string}, link: Function}}
 * @constructor
 */

export default function Question() {
  return {
    restrict: 'E',
    template: require('../views/question-create-component.html'),
    controller: Controller,
    controllerAs: 'vm',

    scope: {
      data: '=',
      form: '='
    },

    link: function ($scope, $el, attrs) {

    }
  };
};

Question.$inject = [];