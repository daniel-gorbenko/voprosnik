/**
 * List of states
 */


export default function config($urlRouterProvider, $stateProvider) {
  $urlRouterProvider.otherwise('/widgets');

  $stateProvider

    /**
     * Admin: Blocks
     */

    .state('admin', {
      abstract: true,
      controller: 'AdminIndexController',
      controllerAs: 'vm',
      template: require('../modules/admin/views/index.html'),
      data: {
        authenticate: true
      }
    })

  /**
     * Admin: Blocks
     */

    .state('billing', {
      parent: 'admin',
      url: '/billing',
      controller: 'BillingIndexController',
      controllerAs: 'vm',
      template: require('../modules/billing/views/index.html')
    })

  /**
     * Admin: Blocks
     */

    .state('blocks', {
      parent: 'admin',
      url: '/widgets',
      abstract: true,
      //controller: 'BlocksIndexController',
      //controllerAs: 'vm',
      template: require('../modules/blocks/views/index.html')
    })

    .state('blocks.list', {
      url: '',
      template: require('../modules/blocks/views/list.html'),
      controller: 'BlocksListController',
      controllerAs: 'vm'
    })

    .state('blocks.create', {
      url: '/create',
      template: require('../modules/blocks/views/create.html'),
      controller: 'BlocksCreateController',
      controllerAs: 'vm'
    })


    .state('blocks.show', {
      url: '/:id/:state?versionId',
      abstract: true,
      template: require('../modules/blocks/views/show.html'),
      controller: 'BlocksShowController',
      controllerAs: 'vm',
      resolve: {
        block: ['$stateParams', 'BlockResource' , 'Constants', function ($stateParams, BlockResource, Constants) {
          var state = Constants.blockStates[$stateParams.state];

          if(state) {
            return BlockResource.getByState({id: $stateParams.id, state: state, blockId: $stateParams.versionId}).$promise
              .then(function (data) {
                return data.response;
              });
          }

          return null;
        }]
      }
    })

  /**
   * Admin: Questions
   */

    .state('blocks.show.setup', {
      url: '/setup',
      template: require('../modules/setup/views/index.html'),
      controller: 'SetupIndexController',
      controllerAs: 'vm'
    })

    /**
     * Admin: Questions
     */

    .state('blocks.show.questions', {
      url: '/questions',
      abstract: true,
      template: require('../modules/questions/views/index.html')
    })
    .state('blocks.show.questions.list', {
      url: '',
      template: require('../modules/questions/views/list.html'),
      controller: 'QuestionsListController',
      controllerAs: 'vm'
    })
    .state('blocks.show.questions.create', {
      url: '/create',
      template: require('../modules/questions/views/create.html'),
      controller: 'QuestionsCreateController',
      controllerAs: 'vm'
    })
    .state('blocks.show.questions.edit', {
      url: '/edit/:questionId',
      template: require('../modules/questions/views/edit.html'),
      controller: 'QuestionsEditController',
      controllerAs: 'vm'
    })

    /**
     * Admin: Answers
     */

    .state('blocks.show.answers', {
      url: '/answers',
      template: require('../modules/answers/views/index.html'),
      controller: 'AnswersListController',
      controllerAs: 'vm'
    })

  /**
     * Admin: Statistic
     */

    .state('blocks.show.statistic', {
      url: '/statistic',
      template: require('../modules/statistic/views/index.html'),
      controller: 'StatisticController',
      controllerAs: 'vm'
    })

  /**
     * Admin: Design
     */

    .state('blocks.show.design', {
      url: '/design',
      template: require('../modules/design/views/index.html'),
      controller: 'DesignController',
      controllerAs: 'vm'
    })

    /**
     * Admin: Versions
     */

    .state('blocks.show.versions', {
      url: '',
      template: require('../modules/versions/views/index.html'),
      controller: 'VersionsIndexController',
      controllerAs: 'vm'
    })

  /**
     * Admin: StartPage
     */

    .state('blocks.show.startPages', {
      url: '/start-pages',
      abstract: true,
      template: require('../modules/startPages/views/index.html')
    })

    .state('blocks.show.startPages.create', {
      url: '/create',
      template: require('../modules/startPages/views/create.html'),
      controller: 'StartPagesCreateController',
      controllerAs: 'vm'
    })

    .state('blocks.show.startPages.edit', {
      url: '/edit/:startPageId',
      template: require('../modules/startPages/views/edit.html'),
      controller: 'StartPagesEditController',
      controllerAs: 'vm'
    })

  /**
     * Admin: EndPage
     */

    .state('blocks.show.endPages', {
      url: '/end-pages',
      abstract: true,
      template: require('../modules/endPages/views/index.html')
    })

    .state('blocks.show.endPages.create', {
      url: '/create',
      template: require('../modules/endPages/views/create.html'),
      controller: 'EndPagesCreateController',
      controllerAs: 'vm'
    })

    .state('blocks.show.endPages.edit', {
      url: '/edit/:endPageId',
      template: require('../modules/endPages/views/edit.html'),
      controller: 'EndPagesEditController',
      controllerAs: 'vm'
    })

    /**
     * Widget View
     */

    .state('review', {
      url: '/review/:widgetId/:blockId',
      controller: 'ReviewIndexController',
      controllerAs: 'vm',
      template: require('../modules/review/views/index.html'),
      data: {
        authenticate: true
      }
    })
}

config.$inject = ['$urlRouterProvider', '$stateProvider'];