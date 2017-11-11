var fs = require('fs')
var buffer = fs.readFileSync('/Users/amartherus/Documents/cs499A/statusReport07.txt')

var str = buffer.toString()
str.split('\n')

console.log(str.length-1)
