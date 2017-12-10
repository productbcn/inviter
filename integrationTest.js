var fs = require('fs')
var index = require('./index')

var sampleJson = JSON.parse(fs.readFileSync('sample.json'))

index.handler(sampleJson, {}, console.log)