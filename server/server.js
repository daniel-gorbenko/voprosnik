'use strict';

var koa = require('koa');
var app = koa();

var router = require('./config/routes').init(app);

/**
 * Routes middlewares
 */

app
  .use(router.routes())
  .use(router.allowedMethods());

module.exports = app;