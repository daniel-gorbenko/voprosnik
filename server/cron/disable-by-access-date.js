var schedule = require('node-schedule');

var models = require('../app/models');
var constants = require('../../client/admin/constants');
var config = require('../config');

schedule.scheduleJob('*/10 * * * * *', disableUsers);

function disableUsers() {
  models.User.findAll({
    raw: true,
    where: {
      active: true,
      accessTo: {$lt: new Date()}
    }
  })
    .then(function (users) {
      let ids = users.map(user => user.id);

      if(!ids.length) return;

      models.User.update({
        active: false
      }, {where: {id: ids}});

      models.Block.update({
        status: constants.status.disabled
      }, {where: {userId: ids}});
    });
}