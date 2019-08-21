/**
 * UsersResource.
 */

export default function BillingResource($resource, config) {
  return $resource(config.api.baseUrl + '/billing', {}, {
    purchase: {url: config.api.baseUrl + '/billing/purchase', method: 'post'}
  });
};

BillingResource.$inject = ['$resource', 'config'];