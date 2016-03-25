var models = require('../models'),
	Pair = models.pair,
	Student = models.student;

function getPairs() {
	//Get all possible pairs
	Pair.find()
	.populate('partners')
	.sort('date')
	.exec()
	// Pick the pairs
	.then(function pickPairs(sortedPairs) {
		var numPairs = 12,
			pickPairsRecursively = function(index, pickedPairs) {
				if (pickedPairs.length === numPairs) return pickedPairs;

				var possiblePair,
					notYetAssigned,
					studentA,
					studentB;

				// Get the next element of sortedPairs
				possiblePair = sortedPairs[index];
				studentA = possiblePair.partners[0];
				studentB = possiblePair.partners[1];

				// Check that neither student has already been assigned a pair
				notYetAssigned = pickedPairs.every(function(pair) {
					var partnerIds = pair.partners.map(function(partner) {
						return partner._id;
					})
					return partnerIds.indexOf(studentA._id) === -1 && partnerIds.indexOf(studentB._id) === -1;
				});

				if (notYetAssigned) {
					possiblePair.date = new Date();
					pickedPairs.push(possiblePair);
				}
				return pickPairsRecursively(++index, pickedPairs);
			},
			pickedPairs = pickPairsRecursively(0, []),
			savePromises = pickedPairs.map(function(pair) {
				return pair.save();
			});
		return Promise.all(savePromises);
	})

	// Convert array to string and export
	.then(function(pickedPairs) {

		var studentsString, outputString;

		outputString = pickedPairs.reduce(function(finalString, nextPair) {
			
			studentsString = nextPair.partners.map(function(student) {
				return student.name;
			}).join('<br>');

			return finalString + studentsString + '<br><br>';
		}, "");

		module.exports.outputString = outputString;

	}).catch(function(err) {
		console.error('A ' + err.message + ' occured in logic/index.js');
		console.error(err);
	});
};

module.exports = {
	run: getPairs
};






