'use strict'

const rxInit = /^(?:\/\/(.+)$)?([\s\S]*)/m

module.exports = adder

function adder(string) {
    if (!string) return 0
    const negativeNumbers = []

    const match = rxInit.exec(string)
    const delimiter = match[1] || ','
    const numbersString = match[2] || ''

    const rx = RegExp(escapeRegExp(delimiter) + '|\n')
    const numbers = numbersString.split(rx)

    let result = 0
    numbers.forEach(v => {
        const num = +v
        if (num < 0) {
          negativeNumbers.push(num)
        } else {
            result += num
        }
    })

    let errMessage = ''
    if (negativeNumbers.length) errMessage += 'Negatives not allowed: ' + negativeNumbers.join(', ')
    if (errMessage) throw Error(errMessage)

    return result
}

function escapeRegExp(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
}