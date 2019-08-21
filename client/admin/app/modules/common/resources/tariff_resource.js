/**
 * UsersResource.
 */

export default function TariffResource($resource, config) {
  return $resource(config.api.baseUrl + '/tariffs/:id', { id: '@id' }, {

  });
};

TariffResource.$inject = ['$resource', 'config'];