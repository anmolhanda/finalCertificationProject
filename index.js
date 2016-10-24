var express = require('express');
var config = require("./config/config");
var path = require('path');
var bodyParser = require("body-parser");
var Response = require("./app/response.js");
var db = require('./db.js');
var logger = require("./logger");
var fs = require('fs');
var PORT =  process.env.PORT ||config.app.port;
var app = express();

var router = express.Router();
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', "extended": false }));

app.use(express.static(path.join('./public')));
app.use('/employee-services', router);

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something is broken!');
});


if (!fs.existsSync(config.logs.location)) {
  // Create the directory if it does not exist
  fs.mkdirSync(config.logs.location);
}

var userRoute = require("./app/routes/user.route.js").init(router);

app.listen(PORT, function () {
	console.log('Express listening on port ' + PORT + '!');
});

