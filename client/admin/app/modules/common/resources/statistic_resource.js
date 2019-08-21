/**
 * UsersResource.
 */

export default function QuestionResource($resource, config) {
  return $resource(config.api.baseUrl + '/', { blockId: '@blockId' }, {
    get: {url: config.api.statisticUrl + '/statistic/:blockId', method: 'get', isArray: false, params: {blockId: '@blockId'}}
  });
};

QuestionResource.$inject = ['$resource', 'config'];