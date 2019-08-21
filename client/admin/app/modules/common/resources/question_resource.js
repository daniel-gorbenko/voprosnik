/**
 * UsersResource.
 */

export default function QuestionResource($resource, config) {
  return $resource(config.api.baseUrl + '/blocks/:blockId/questions/:id', { id: '@id', blockId: '@blockId' }, {
    updatePosition: {url: config.api.baseUrl + '/blocks/:blockId/questions/updatePosition', method: 'post', params: {blockId: '@blockId'}},
  });
};

QuestionResource.$inject = ['$resource', 'config'];