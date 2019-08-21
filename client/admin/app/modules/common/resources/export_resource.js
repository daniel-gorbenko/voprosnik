/**
 * UsersResource.
 */

export default function ExportResource($resource, config) {
  return $resource(config.api.baseUrl + '/export', {type: '@type'}, {
    exportType: {url: config.api.baseUrl + '/export/:type', method: 'post', params: {type: '@type'}}
  });
};

ExportResource.$inject = ['$resource', 'config'];