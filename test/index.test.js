'use strict';
const adder = require('../index')
const expect = require('chai').expect

describe('adder', () => {

    it('can parse 0 numbers', () => {
        expect(adder('')).to.equal(0)
    })

    it('can parse one number', () => {
        expect(adder('1')).to.equal(1)
    })

    it('can parse two numbers', () => {
        expect(adder('1,2')).to.equal(3)
    })

    it('can delimit on new line too', () => {
        expect(adder('1\n2,3')).to.equal(6)
    })

    it('can add custom delimiter', () => {
        expect(adder('//;\n1\n2;3')).to.equal(6)
    })

    it('throws an exception for negative numbers', () => {
        expect(() => adder('1,2,-3,-4,5')).to.throw(/Negative numbers not allowed: -3, -4, -5/)
    })

})