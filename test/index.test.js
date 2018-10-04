'use strict';
const adder = require('../index')
const expect = require('chai').expect

describe('adder', () => {

    it('can parse 0 numbers', () => {
        expect(adder.parse('')).to.equal(0)
    })

})