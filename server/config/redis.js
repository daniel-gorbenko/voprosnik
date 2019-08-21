'use strict';

var config = require('../config');
var redis = require("redis");

var client = redis.createClient(config.redis);
//var client = null;

module.exports = client;