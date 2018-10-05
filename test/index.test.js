'use strict';
const { adder, StatefulAdder } = require('../index')
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

    it('custom delimiter limited to one character', () => {
        expect(() => adder('//;;\n1\n2;3')).to.throw(/Delimiters with multiple characters must be wrapped in square brackets/)
    })

    it('throws an exception for negative numbers', () => {
        expect(() => adder('1,2,-3,-4,5')).to.throw(/Negatives not allowed: -3, -4/)
    })

    it('adds the number 1000', () => {
        expect(adder('1,1000')).to.equal(1001)
    })

    it('ignores numbers bigger than 1000', () => {
        expect(adder('1001,1002,3,4')).to.equal(7)
    })

    it('can have delimiters of length > 1 when wrapped in square brackets', () => {
        expect(adder('//[;;]\n1\n2;;3')).to.equal(6)
    })

    it('can have multiple delimiters', () => {
        expect(adder('//[;][%]\n1\n2;3%4')).to.equal(10)
    })

    it('can have multiple multi-character delimiters', () => {
        expect(adder('//[;;][%=]\n1\n2;;3%=4')).to.equal(10)
    })

    it('has a stateful adder', () => {
        const adder = new StatefulAdder('1001,1002,3,4')
        adder.add('//[;;][%=]\n1\n2;;3%=4')
        expect(adder.state).to.equal(17)
        expect(adder.history).to.deep.equal([
            '1001,1002,3,4',
            '//[;;][%=]\n1\n2;;3%=4'
        ])
    })

})