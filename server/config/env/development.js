'use strict';

let path = require('path');

module.exports = {
  http: {
    host: '127.0.0.1',
    port: 8099
  },
  db: {
    user: 'root',
    password: '',
    database: 'voprosnik_nodejs',
    host: 'localhost',
    force: true
  },
  cors: {
    maxAge: 60 * 60 * 24 * 7, // one week,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'UPDATE'],
    headers: ['Accept', 'Content-type', 'Authorization'],
    origin: true,
    credentials: true
  },
  defaultTariffId: 1,
  defaultTariffName: 'trial',
  authentication: {
    //tokenExpiration: 20, // one week
    tokenExpiration: 60 * 60 * 24 * 356, // one year
    secrets: {
      sign: 'cosmos21',
      password: 'cosmos21'
    },
    verificationTokenSalt: 'comsos21',
    adminRedirectUrl: 'http://localhost:8088',
    homeRedirectUrl: 'http://localhost:8088',
    loginRedirectUrl: 'http://localhost:8088/login',
    verifyRedirectUrl: 'http://localhost:8088/verify'
  },
  redis: {
    host: 'localhost',
    port: 6379
  },
  cookieKeys: ['secret', 'secret2'],
  // Create session per every request - false
  // Create session only if using with "yield this.session" - true
  sessionDefer: false,
  cookie: {
    path: '/',
    domain: 'localhost',
    httpOnly: true,
    maxage: null,
    rewrite: true,
    signed: true
  },
  mail: {
    api_key: 'key-41dd534255b233e9eacee377c7b81ef1',
    domain: 'sandbox357e1317e4dd4dc9838f027f434760c3.mailgun.org',
    from: 'Save Client <team@ssclient.com>',
    verifyUrl: 'http://localhost:8088/verify/:token'
  },
  views: {
    landing: {
      index: path.resolve(__dirname, '../../../client/landing/dist/index.html'),
      features: path.resolve(__dirname, '../../../client/landing/dist/features.html'),
      pricing: path.resolve(__dirname, '../../../client/landing/dist/pricing.html')
    },
    auth: {
      signup: path.resolve(__dirname, '../../../client/auth/dist/signup.html'),
      login: path.resolve(__dirname, '../../../client/auth/dist/login.html'),
      verify: path.resolve(__dirname, '../../../client/auth/dist/verify.html')
    },
    admin: path.resolve(__dirname, '../../../client/admin/dist/index.html'),
    widget: {
      template: path.resolve(__dirname, '../../app/modules/admin/generator/templates/widget.template')
    }
  },
  defaultLanguage: 'en'
};