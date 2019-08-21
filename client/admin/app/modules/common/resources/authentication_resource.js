
/**
 * AuthenticationResource.
 */

export default function AuthenticationResource($resource, config) {
  return $resource(config.api.baseUrl + '/', {}, {
    signIn: {url: config.api.baseUrl + '/sign-in', method: 'post', isArray: false},
    signUp: {url: config.api.baseUrl + '/sign-up', method: 'post', isArray: false},
    check: {url: config.api.baseUrl + '/check', method: 'get', isArray: false}
  });
};

AuthenticationResource.$inject = ['$resource', 'config'];