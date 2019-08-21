var path = require('path');

var response = require('../../../../helpers/response');
var redisHelper = require('../../../../helpers/redis');
var fileHelper = require('../../../../helpers/file');
var config = require('../../../../../config');

var Setting = require('../../../../repositories/setting');
var Block = require('../../../../repositories/block');
var Widget = require('../../../../repositories/widget');
var Redis = require('../../../../repositories/redis');
var Review = require('../../../../repositories/review');

let constants = require('../../../../../../client/admin/constants');
let widgetPackage = require('../../../../../../client/widget/package');

/**
 * Methods definition:
 */

var controller = {};

/**
 * Returns list of user's rooms.
 *
 * @param next
 */

controller.getLoader = function *(next) {
  let widgetId = this.params.id;

  //let data = {
  //  widgetId: widgetId,
  //  widgetVersion: config.widgetVersion,
  //  loaderVersion: config.loaderVersion
  //};

  // 1. If data in cache is actual, i.e. version was not changed and
  // widget was not changed after the data was posted to cache.

  //let cacheKey = redisHelper.generateCacheKey(data);
  //let cache = yield Redis.getCacheForBlock({id: widgetId, key: cacheKey});

  //if(cache !== null) {
  //  _sendCodeResponse(this, cache);
  //
  //  return ;
  //}

  // 2. Get data from DB

  Review.incReviewByWidgetId(widgetId);

  let block = yield Setting.getSettingsByWidgetId(widgetId);

  if(!block) {
    // Send empty file to user
    _sendCodeResponse(this, '');

    return ;
  }

  let settings = block;

  settings.constants = constants;

  // 3. Generate template

  let renderData = {
    settings: JSON.stringify(settings),
    windowConfigField: constants.windowConfigField,
    widgetVersion: config.widgetVersion
  };

  let code = yield fileHelper.render(config.views.widget.template, renderData);

  // 4. Add to a cache
  //Redis.set(cacheKey, code);
  //Widget.markAsCachedById(widgetId);

  // 5. Send to current user
  _sendCodeResponse(this, code);
};

/**
 * Returns list of user's rooms.
 *
 * @param next
 */

controller.getAdminLoader = function *(next) {
  let data = {
    blockId: this.params.blockId
  };

  // 2. Get data from DB

  let settings = yield Setting.getSettingsByBlockId(data);

  settings.constants = constants;

  // 3. Generate template

  let renderData = {
    settings: JSON.stringify(settings),
    windowConfigField: constants.windowConfigField,
    widgetVersion: config.widgetVersion
  };

  let code = yield fileHelper.render(config.views.widget.template, renderData);

  // 5. Send to current user
  _sendCodeResponse(this, code);
};

/**
 * Returns list of user's rooms.
 *
 * @param next
 */

function _sendCodeResponse(ctx, data) {
  response.file(ctx, {
    content: data,
    type: 'application/javascript'
  });
}

module.exports = controller;