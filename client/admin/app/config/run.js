/**
 * Run
 */

export default function run($state, $rootScope, config, ngNotify, billingService) {
  $rootScope.config = config;
  $rootScope.$state = $state;

  ngNotify.config({
    theme: 'pure',
    position: 'bottom',
    duration: 3000,
    type: 'info',
    sticky: false,
    button: true,
    html: false
  });

  billingService.checkAccess();
};

run.$inject = ['$state', '$rootScope', 'config', 'ngNotify', 'billingService'];