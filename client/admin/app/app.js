import bootstrap from './style/bootstrap/bootstrap.css';
import style from './style/style.css';

/**
 * Assets
 */

import angular from 'angular';
import uiRouter from 'angular-ui-router';
import resource from 'angular-resource';
import dnd from 'angular-drag-and-drop-lists';
import translate from 'angular-translate';
import notify from 'ng-notify';

require('ng-notify/dist/ng-notify.min.css');

require('angular-bootstrap-colorpicker');
require('../node_modules/angular-bootstrap-colorpicker/css/colorpicker.css');

/**
 * Config middlewares
 */

import routes from './config/routes';
import interceptors from './config/interceptors';
import http from './config/http';
import run from './config/run';
import html5mode from './config/html5mode';
import translateConfig from './config/translate';

/**
 * Main config file
 */

import config from './config/index';

/**
 * Custom modules
 */

import blocks from './modules/blocks';
import questions from './modules/questions';
import setup from './modules/setup';
import answers from './modules/answers';
import common from './modules/common';
import statistic from './modules/statistic';
import design from './modules/design';
import authentication from './modules/authentication';
import admin from './modules/admin';
import startPages from './modules/startPages';
import endPages from './modules/endPages';
import review from './modules/review';
import versions from './modules/versions';
import billing from './modules/billing';

/**
 * Definition
 */

angular.module('app', [
    resource,
    uiRouter,
    blocks,
    questions,
    setup,
    answers,
    common,
    statistic,
    design,
    authentication,
    admin,
    startPages,
    endPages,
    review,
    versions,
    translate,
    billing,
    'dndLists',
    'ngNotify',
    'colorpicker.module'
])
  .constant('config', config)
  .config(interceptors)
  .config(http)
  .config(html5mode)
  .config(translateConfig)
  .config(routes)

  .run(run);