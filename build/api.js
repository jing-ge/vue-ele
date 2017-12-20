var express = require('express')
var app = express()

var appData = require('../data.json')
var seller = appData.seller
var goods = appData.goods
var ratings = appData.ratings

var apiRouters = express.Router()

apiRouters.get('/seller',function (req,res) {
  var _callback = req.query.callback;
  res.type('text/javascript');
  res.send(_callback + '(' + JSON.stringify({errno:0,"data":seller}) + ')');
})

apiRouters.get('/goods',function (req,res) {
  var _callback = req.query.callback;
  res.type('text/javascript');
  res.send(_callback + '(' + JSON.stringify({errno:0,"data":goods}) + ')');
})

apiRouters.get('/ratings',function (req,res) {
  var _callback = req.query.callback;
  res.type('text/javascript');
  res.send(_callback + '(' + JSON.stringify({errno:0,"data":ratings}) + ')');
})

app.use('/api',apiRouters);

app.listen(8083)