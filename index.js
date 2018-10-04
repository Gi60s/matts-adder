'use strict'

const rxInit = /^(?:\/\/(.+)$)?([\s\S]*)/m

module.exports = adder

function adder(string) {
    if (!string) return 0

    const match = rxInit.exec(string)
    const delimiter = match[1] || ','
    const numbersString = match[2] || ''

    const rx = RegExp(escapeRegExp(delimiter) + '|\n');
    const numbers = numbersString.split(rx)

    let result = 0
    numbers.forEach(v => {
        result += +v
    })

    return result
}

function escapeRegExp(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}