/**
 * UsersResource.
 */

export default function UserResource($resource, config) {
  return $resource(config.api.baseUrl + '/user', {}, {

  });
};

UserResource.$inject = ['$resource', 'config'];