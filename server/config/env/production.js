'use strict';

let path = require('path');

module.exports = {
  http: {
    host: '127.0.0.1',
    port: 3000
  },
  db: {
    user: 'Jonik19',
    password: 'arsenal19',
    database: 'voprosnik_nodejs',
    //host: '178.62.211.92',
    host: '127.0.0.1',
    force: false
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
      sign: 'cacao12001',
      password: 'kori2001-10231/2'
    },
    verificationTokenSalt: 'comsos21',
    adminRedirectUrl: 'http://admin.savevisitor.com',
    homeRedirectUrl: 'http://savevisitor.com',
    loginRedirectUrl: 'http://admin.savevisitor.com/login',
    verifyRedirectUrl: 'http://admin.savevisitor.com/verify'
  },
  redis: {
    //host: '178.62.211.92',
    host: '127.0.0.1',
    port: 6379
  },
  cookieKeys: ['secret', 'secret2'],
  // Create session per every request - false
  // Create session only if using with "yield this.session" - true
  sessionDefer: false,
  cookie: {
    path: '/',
    domain: 'savevisitor.com',
    httpOnly: true,
    maxage: null,
    rewrite: true,
    signed: true
  },
  mail: {
    api_key: 'key-41dd534255b233e9eacee377c7b81ef1',
    domain: 'sandbox357e1317e4dd4dc9838f027f434760c3.mailgun.org',
    from: 'Save Client <team@ssclient.com>',
    verifyUrl: 'http://admin.savevisitor.com/verify/:token'
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