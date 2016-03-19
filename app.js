var express = require('express'),
	app = express();
	port = process.env.PORT || 8080,
	router = require('./routes');


app.use('/', function(req, res, next) {
	console.log('Request received on port ' + port);
	next();
})

app.use('/', router);

app.listen(port);
console.log('Listening on port ' + port);
