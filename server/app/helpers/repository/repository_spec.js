'use strict';

var repository = require('../repository');
var expect = require('chai').expect;

describe('Repository', function () {

  describe('#pickPublic', function () {

     it('returns object with only specified fields', function () {
       expect(repository.pickPublic({a:1, b:2}, ['b'])).to.have.property('b');
       expect(repository.pickPublic({a:1, b:2}, ['b'])).to.not.have.property('a');
     });

    it('returns null when passed null instead object', function () {
      expect(repository.pickPublic(null, ['b'])).to.be.a('null');
     });

  });

});