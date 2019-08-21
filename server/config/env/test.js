'use strict';

module.exports = {
  http: {
    port: 8080
  },
  db: {
    user: 'purchases_admin',
    password: 'dadada',
    database: 'purchases_test',
    host: 'localhost',
    force: true
  },
  cors: {
    maxAge: 60 * 60 * 24 * 7, // one week,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'UPDATE'],
    headers: ['Accept', 'Content-type', 'Authorization'],
    origin: true
  },
  authentication: {
    //tokenExpiration: 20, // one week
    tokenExpiration: 60 * 60 * 24 * 7, // one week
    secrets: {
      sign: 'secret',
      password: 'secret'
    }
  },
  models: {
    roomLinks: {
      secrets: {
        token: 'secret'
      }
    }
  },
  tests: {
    authentication: {
      user: {
        name: 'Danil',
        username: 'Jonik',
        password: 'dadada'
      }
    },
    rooms: {
      room: {
        name: 'My room'
      },
      user: {
        name: 'Danil2',
        username: 'Jonik2',
        password: 'dadada2'
      }
    },
    users: {
      user: {
        name: 'Danil3',
        username: 'Jonik3',
        password: 'dadada3'
      }
    },
    purchases: {
      user: {
        name: 'Danil4',
        username: 'Jonik4',
        password: 'dadada4'
      },
      purchase: {
        name: 'Purchase name',
        amount: 100,
        users: [1]
      }
    }
  }
};