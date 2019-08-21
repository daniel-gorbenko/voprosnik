/**
 * UsersResource.
 */

export default function StartPageResource($resource, config) {
  return $resource(config.api.baseUrl + '/blocks/:blockId/start_pages/:id', { id: '@id', blockId: '@blockId' }, {

  });
};

StartPageResource.$inject = ['$resource', 'config'];