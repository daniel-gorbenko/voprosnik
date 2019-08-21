/**
 * List of http interceptors
 */

export default function interceptors($httpProvider) {
  $httpProvider.interceptors.push('NotAuthorizedInterceptor');
  $httpProvider.interceptors.push('ErrorsInterceptor');
};

interceptors.$inject = ['$httpProvider'];