'use strict';

var helper = {};

/**
 *
 */

helper.generateCacheKey = function (options) {
  return ':v-widget_:v-loader_:widgetId'
    .replace(':v-widget', options.widgetVersion)
    .replace(':v-loader', options.loaderVersion)
    .replace(':widgetId', options.widgetId);
};

module.exports = helper;