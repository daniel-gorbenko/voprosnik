/**
 * UsersResource.
 */

export default function AnswerResource($resource, config) {
  return $resource(config.api.baseUrl + '/answers', { blockId: '@blockId' }, {
    get: {url: config.api.baseUrl + '/blocks/:blockId/answers', method: 'get', isArray: false, params: {blockId: '@blockId'}}
  });
};

AnswerResource.$inject = ['$resource', 'config'];