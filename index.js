'use strict'

module.exports = {
    adder,
    StatefulAdder
}

function adder(string) {
    if (!string) return 0
    const negativeNumbers = []

    const lines = string.split('\n')
    const hasDelimiterLine = lines[0] && lines[0].startsWith('//')
    const delimiterLine = hasDelimiterLine ? lines.shift().substr(2) : ','
    if (delimiterLine.length === 0) throw Error('Invalid delimiter')

    const delimiters = []
    if (delimiterLine.length === 1) {
        delimiters.push(delimiterLine)
    } else {
        const rxDelimiters = /\[([^\]]+)]/g
        let match
        while (match = rxDelimiters.exec(delimiterLine)) delimiters.push(match[1])
        if (!delimiters.length) throw Error(/Delimiters with multiple characters must be wrapped in square brackets/)
    }

    const rxString = delimiters.reduce((prev, curr) => prev + '|' + escapeRegExp(curr), '\n')
    const rx = RegExp(rxString)
    const numbers = lines.join('\n').split(rx)

    let result = 0
    numbers.forEach(v => {
        const num = +v
        if (num < 0) {
          negativeNumbers.push(num)
        } else if (num <= 1000) {
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

function StatefulAdder(string) {
    this.add = string => {
        this.history.push(string)
        this.state += adder(string)
    }
    this.history = [ string || '' ]
    this.state = adder(string)
}