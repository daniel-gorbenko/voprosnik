/**
 * UsersResource.
 */

export default function TemplateResource($resource, config) {
  return $resource(config.api.baseUrl + '/templates/:id', { id: '@id' }, {

  });
};

TemplateResource.$inject = ['$resource', 'config'];