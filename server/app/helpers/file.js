let fs = require('fs');
var mu2 = require('mu2');

var helper = {};

/**
 *
 */

helper.render = function (templatePath, data) {
  return new Promise(function (resolve) {
    // TODO: cleaCache in specific place. Delete it in future.

    mu2.clearCache();
    resolve(mu2.compileAndRender(templatePath, data));
  });
};

module.exports = helper;