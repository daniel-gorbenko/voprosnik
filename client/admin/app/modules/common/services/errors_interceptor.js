/**
 * Interceptor to catch 'un authorized' 401 error.
 * If gets 401 http response status destroys local user session and redirects to sign-in page.
 */

export default function ErrorsInterceptor($q, $translate, $injector) {
  return {
    responseError: function (response) {
      if(response.data && response.data.error && !response.data.error.errors) {
        $injector.get('notify').warning(response.data.error.message);
      }

      return $q.reject(response);
    }
  };
};

ErrorsInterceptor.$inject = ['$q', '$translate', '$injector'];