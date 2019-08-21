/**
 * Interceptor to catch 'un authorized' 401 error.
 * If gets 401 http response status destroys local user session and redirects to sign-in page.
 */

export default function NotAuthorizedInterceptor($q, $window, config) {
  return {
    responseError: function (response) {
      if(response.status && response.status === 401) {
        $window.location.href = config.site.loginUrl;
      }

      return $q.reject(response);
    }
  };
};

NotAuthorizedInterceptor.$inject = ['$q', '$window', 'config'];