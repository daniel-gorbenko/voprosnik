/**
 * UsersResource.
 */

export default function EndPageResource($resource, config) {
  return $resource(config.api.baseUrl + '/blocks/:blockId/end_pages/:id', { id: '@id', blockId: '@blockId' }, {

  });
};

EndPageResource.$inject = ['$resource', 'config'];