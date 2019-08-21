/**
 * UsersResource.
 */

export default function BlockResource($resource, config) {
  return $resource(config.api.baseUrl + '/widgets/:id', { id: '@id' }, {

  });
};

BlockResource.$inject = ['$resource', 'config'];