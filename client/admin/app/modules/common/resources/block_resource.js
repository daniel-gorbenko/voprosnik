/**
 * UsersResource.
 */

export default function BlockResource($resource, config) {
  return $resource(config.api.baseUrl + '/blocks/:id', { id: '@id' }, {
    get: {method: 'get', isArray: false},
    getPages: {url: config.api.baseUrl + '/widgets/:id/pages/:state', method: 'get', params: { id: '@id' , state: '@state', versionId: '@versionId' }},
    getByState: {url: config.api.baseUrl + '/widgets/:id/blocks/state/:state', method: 'get', params: {'id': '@id', state: '@state', blockId: '@blockId'}},
    updateStatus: {url: config.api.baseUrl + '/blocks/:id/status', method: 'post', isArray: false},
    activate: {url: config.api.baseUrl + '/widgets/:widgetId/blocks/activate', method: 'post', params: {widgetId: '@widgetId'}},
    edit: {url: config.api.baseUrl + '/widgets/:widgetId/blocks/edit', method: 'post', params: {widgetId: '@widgetId'}},
    getVersions: {url: config.api.baseUrl + '/widgets/:widgetId/blocks/versions', method: 'get', params: {widgetId: '@widgetId'}}
  });
};

BlockResource.$inject = ['$resource', 'config'];