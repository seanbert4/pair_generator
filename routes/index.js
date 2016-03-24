var express = require('express'),
	router = express.Router(),
	Student = require('../models'),
	getPairs = require('../get_pairs');


router.get('/newpairs', function(req, res) {
	
	var getResults = new Promise(function(resolve, reject) {
		var outputString = getPairs();
		while (!outputString) {
			// Do nothing!
		}
		try {
			resolve(outputString);	
		} catch(err) {
			reject(err);
		}
	});

	getResults
	.then(function(outputString) {
		res.send(outputString);
	})
	.catch(function(err) {
		console.error(err);
		res.send(err);
	})
});

module.exports = router;