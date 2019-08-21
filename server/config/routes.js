'use strict';

var config = require('../config');

var mount = require('koa-mount');
var cors = require('koa-cors');
var compose = require('koa-compose');
var bodyParser = require('koa-bodyparser');
var session = require('koa-generic-session');
var redisStore = require('koa-redis');
var passport = require('koa-passport');
var passportStrategy = require('./passport-strategy');

function init(app) {
  var router = require('koa-router')();

  /**
   * Errors handling
   */

  var errorsController = require('../app/modules/errors/controllers/errors_controller');

  app.use(errorsController.catchAll);

  /**
   * Helper middlewares:
   */

  /**
   * CORS middleware
   */

  app.use(cors({
    maxAge: config.cors.maxAge,
    methods: config.cors.methods,
    headers: config.cors.headers,
    origin: config.cors.origin,
    credentials: config.cors.credentials
  }));

  /**
   * Parses requested body to req.body field
   */

  app.use(bodyParser());


  /**
   * Sets session on request
   */

  app.keys = config.cookieKeys;

  router.use(session({
    store: redisStore(config.redis),
    defer: config.sessionDefer,
    cookie: config.cookie
  }));

  /**
   * Passport middleware
   */

  var authenticationService = require('../app/modules/authentication/services/authentication_service');

  passport.serializeUser(authenticationService.serializeUser);
  passport.deserializeUser(authenticationService.deserializeUser);
  passport.use(passportStrategy());

  router.use(passport.initialize());
  router.use(passport.session());

  /**
   * Your routes go here
   */

  /**
   * Routes: Authentication
   */

  var accessController = require('../app/modules/access/controllers/access_controller');

  var landingController = require('../app/modules/landing/controllers/landing_controller');

  router.use(mount('/', landingController.setLanguage));

  router.get('/landing/:lang', landingController.getIndex);
  router.get('/landing/:lang/features', landingController.getFeatures);
  router.get('/landing/:lang/pricing', landingController.getPricing);

  /**
   * Routes: Authentication
   */

  var authenticationController = require('../app/modules/authentication/controllers/authentication_controller');

  router.get('/', authenticationController.getAdminPage);

  router.get('/login', compose([authenticationController.onlyNotAuthenticated, authenticationController.getLogin]));
  router.get('/signup', compose([authenticationController.onlyNotAuthenticated, authenticationController.getSignUp]));
  router.get('/verify', compose([authenticationController.onlyNotAuthenticated, authenticationController.getVerify]));

  router.get('/verify/:token', compose([authenticationController.onlyNotAuthenticated, authenticationController.verify]));
  router.post('/login', compose([authenticationController.onlyNotAuthenticated, authenticationController.login]));
  router.post('/signup', compose([authenticationController.onlyNotAuthenticated, authenticationController.signUp]));
  router.get('/logout', compose([authenticationController.onlyAuthenticated, authenticationController.logout]));

  /**
   * Routes: Blocks
   */

  var widgetsController = require('../app/modules/admin/widgets/controllers/widgets_controller');

  router.use(mount('/widgets', authenticationController.onlyAuthenticated));

  router.get('/widgets', widgetsController.index);
  router.get('/widgets/:id', widgetsController.get);
  router.post('/widgets', compose([accessController.onlyActive, widgetsController.create]));


  /**
   * Routes: Blocks
   */

  var blocksController = require('../app/modules/admin/blocks/controllers/blocks_controller');

  router.use(mount('/blocks', authenticationController.onlyAuthenticated));

  router.get('/widgets/:widgetId/blocks/state/:state', blocksController.getByState);
  router.post('/widgets/:widgetId/blocks/activate', compose([accessController.onlyActive, blocksController.activate]));
  router.post('/widgets/:widgetId/blocks/edit', compose([accessController.onlyActive, blocksController.edit]));
  router.get('/widgets/:widgetId/blocks/versions', blocksController.getVersions);
  router.get('/widgets/:widgetId/pages/:state', blocksController.getPages);

  router.get('/blocks', blocksController.index);
  router.get('/blocks/:blockId', blocksController.get);
  router.post('/blocks', compose([accessController.onlyActive, blocksController.create]));
  router.post('/blocks/:blockId', compose([accessController.onlyActive, blocksController.update]));
  router.get('/blocks/:blockId/pages', blocksController.getPages);
  router.post('/blocks/:blockId/status', compose([accessController.onlyActive, blocksController.updateStatus]));

  /**
   * Contacts
   */

  var contactsController = require('../app/modules/admin/contacts/controllers/contacts_controller');

  router.post('/contacts', contactsController.createContact);

  /**
   * Generator
   */

  var generatorController = require('../app/modules/admin/generator/controllers/generator_controller');

  router.get('/loader/:id', generatorController.getLoader);

  /**
   * ADD USER CHECKING FOR SECURITY
   */
  router.get('/loader/:widgetId/:blockId', generatorController.getAdminLoader);

  /**
   * Routes: Questions
   */

  var questionsController = require('../app/modules/admin/questions/controllers/questions_controller');

  router.get('/blocks/:blockId/questions', questionsController.index);
  router.get('/blocks/:blockId/questions/:id', questionsController.get);
  router.post('/blocks/:blockId/questions', compose([accessController.onlyActive, questionsController.create]));
  router.delete('/blocks/:blockId/questions/:id', compose([accessController.onlyActive, questionsController.delete]));
  router.post('/blocks/:blockId/questions/updatePosition', compose([accessController.onlyActive, questionsController.updatePosition]));
  router.post('/blocks/:blockId/questions/:id', compose([accessController.onlyActive, questionsController.update]));

  /**
   * Routes: StartPages
   */

  var startPagesController = require('../app/modules/admin/start_pages/controllers/start_pages_controller');

  router.get('/blocks/:blockId/start_pages/:id', startPagesController.get);
  router.post('/blocks/:blockId/start_pages', compose([accessController.onlyActive, startPagesController.create]));
  router.post('/blocks/:blockId/start_pages/:id', compose([accessController.onlyActive, startPagesController.update]));

  /**
   * Routes: StartPages
   */

  var endPagesController = require('../app/modules/admin/end_pages/controllers/end_pages_controller');

  router.get('/blocks/:blockId/end_pages/:id', endPagesController.get);
  router.post('/blocks/:blockId/end_pages', compose([accessController.onlyActive, endPagesController.create]));
  router.post('/blocks/:blockId/end_pages/:id', compose([accessController.onlyActive, endPagesController.update]));


  /**
   * Routes: Templates
   */

  var templatesController = require('../app/modules/admin/templates/controllers/templates_controller');

  router.use(mount('/templates', authenticationController.onlyAuthenticated));
  router.get('/templates', templatesController.index);

  /**
   * Routes: Tariffs
   */

  var tariffsController = require('../app/modules/admin/tariffs/controllers/tariffs_controller');

  router.get('/tariffs', tariffsController.index);

  /**
   * Routes: Billing
   */

  var billingController = require('../app/modules/admin/billing/controllers/billing_controller');

  router.use(mount('/billing', authenticationController.onlyAuthenticated));
  router.post('/billing/purchase', billingController.purchase);
  router.get('/billing/reviews', billingController.getReviews);

  /**
   * Routes: Billing
   */

  var userController = require('../app/modules/admin/user/controllers/user_controller');

  router.use(mount('/user', authenticationController.onlyAuthenticated));
  router.get('/user', userController.get);

  /**
   * Routes: Statistic
   */

  var statisticController = require('../app/modules/admin/statistic/controllers/statistic_controller');

  router.post('/statistic', statisticController.calc);

  router.get('/statistic/:blockId', compose([
    authenticationController.onlyAuthenticated,
    statisticController.get
  ]));


  /**
   * Routes: Answers
   */

  var answersController = require('../app/modules/admin/answers/controllers/answers_controller');

  router.post('/answers/collections', answersController.createCollection);
  router.post('/answers/collections/complete', answersController.completeCollection);
  router.post('/answers', answersController.createAnswer);

  router.get('/blocks/:blockId/answers', answersController.getAnswers);

  /**
   * Routes: Answers
   */

  var exportController = require('../app/modules/admin/export/controllers/export_controller');

  router.use(mount('/export', authenticationController.onlyAuthenticated));

  router.post('/export/:type', compose([accessController.onlyActive, exportController.exportType]));
  router.get('/export/:key.:type', exportController.getType);

  /**
   * Return instance of router. Don't delete it.
   */

  return router;
}

module.exports = {
  init: init
};