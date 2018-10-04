'use strict'

module.exports = adder

function adder(string) {
    if (!string) return 0

    const ar = string.split(',')
    if (ar.length > 2) throw Error('Too many numbers')

    let result = 0
    ar.forEach(v => {
        result += +v
    })

    return result
}