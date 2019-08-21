import angular from 'angular';

/**
 * Interceptors
 */

import NotAuthorizedInterceptor from './services/not_authorized_interceptor';


/**
 * Definition
 */

export default angular.module('app.authentication', [])

  .factory('NotAuthorizedInterceptor', NotAuthorizedInterceptor)

  .name;