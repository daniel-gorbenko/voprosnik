/**
 *
 */

Controller.$inject = ['$scope', 'Constants'];

function Controller($scope, Constants) {
  this.data = $scope.data;
  this.Constants = Constants;
  this.$form = $scope.form;
}

/**
 *
 * @returns {{restrict: string, template: *, controller: *, controllerAs: string, scope: {data: string}, link: Function}}
 * @constructor
 */

export default function StartPage() {
  return {
    restrict: 'E',
    template: require('../views/start-page-create-component.html'),
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

StartPage.$inject = [];