'use strict';

var app = require('../server');
var models = require('../app/models');
var config = require('../config');
var seeds = require('../app/seeds');

models.sequelize.sync({ force: config.db.force }).then(function () {

  app.listen(config.http.port, config.http.host, function () {
    console.log('Server is listening on ', config.http.port, ' port');

    if(config.env === 'development') {
      seeds.seed();
    }
  });

});