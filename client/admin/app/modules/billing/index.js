import angular from 'angular';

/**
 * Controllers
 */

import BillingIndexController from './controllers/billing_index_controller';

import billingService from './services/billing_service';

/**
 * Definition
 */

export default angular.module('app.billing', [])

  .controller('BillingIndexController', BillingIndexController)

  .service('billingService', billingService)
  .name;