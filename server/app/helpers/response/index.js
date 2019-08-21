'use strict';

var response = {};

/**
 * Sends successful(you can change status) response to client
 * with 'success' format of response.
 * Use it when you need to send any kind of data
 *
 * @param {Object} ctx Context of koa
 * @param {Object} data Data to return to client
 * @param {Number} status HTTP status to send to client
 */

response.success = function (ctx, data, status) {
  ctx.body = {
    response: data
  };

  ctx.status = status || 200;
};

/**
 * Sends file to client
 * with 'success' status(changeable).
 * Use it when you need to send any kind of file to user
 *
 * @param {Object} ctx Context of koa
 * @param {Object} options Data to return to client
 * @param {String} options.content Content of the file to return
 * @param {Object} [options.headers] Object of headers to set on response object
 * @param {Object} [options.type] Type of response. Default is 'text/plain'
 * @param {Number} status HTTP status to send to client
 */

response.file = function (ctx, options, status) {
  options = options || {};
  options.headers = options.headers || {};

  ctx.body = options.content;

  ctx.response.set(options.headers);
  ctx.response.type = options.type || 'text/plain';

  ctx.status = status || 200;
};

/**
 * Sends successful(you can change status) response to client
 * with 'success-items' format of response.
 * Use it when you need to send list of data: array
 *
 * @param {Object} ctx Context of koa
 * @param {Object} data Data to return to client
 * @param {Number} status HTTP status to send to client
 */

response.items = function (ctx, data, status) {
  let result = {
    items: data || []
  };

  this.success(ctx, result, status);
};

/**
 * Sends response to client
 * with 'error' format of response.
 * Use it when you need to send an error
 *
 * @param {Object} ctx Context of koa
 * @param {Number} data Data to return to client
 * @param {Number} status HTTP status to send to client
 */

response.error = function (ctx, data, status) {
  ctx.body = {
    error: data
  };

  ctx.status = status || 500;
};


module.exports = response;