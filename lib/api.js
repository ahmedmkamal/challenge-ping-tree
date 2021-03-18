var cuid = require('cuid')
var body = require('body/json')
var send = require('send-data/json')

var redis = require('./redis')

var targetsKey = 'TARGETS'

module.exports = {
  createTarget: createTarget
}

function createTarget (req, res, opts, cb) {
  body(req, res, function (err, data) {
    if (err) return cb(err)

    var id = cuid()
    var val = JSON.stringify(Object.assign(data, { id: id }))

    redis.hset(targetsKey, id, val, function (err) {
      if (err) return cb(err)

      send(req, res, data)
    })
  })
}