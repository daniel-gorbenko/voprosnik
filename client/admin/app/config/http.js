/**
 * Settings for $http service
 */

export default function config($httpProvider) {
  $httpProvider.defaults.withCredentials = true;
}

config.$inject = ['$httpProvider'];