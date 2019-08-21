import angular from 'angular';

/**
 * Controllers
 */

import VersionsIndexController from './controllers/versions_index_controller';

/**
 * Definition
 */

export default angular.module('app.blocks.versions', [])

  .controller('VersionsIndexController', VersionsIndexController)

  .name;