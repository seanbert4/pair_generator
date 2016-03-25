var mongoose = require('mongoose'),
	models = require('./models'),
	Student = models.student,
	Pair = models.pair;

// Populate the Mongo database with student information
// and remove all pair history.
Student.remove({}, console.error.bind(console));
Pair.remove({}, console.error.bind(console));

var studentNames = [
	'Edward Liew',
	'Matthew Starr',
	'Henry Nguye',
	'Jeff Fenster',
	'Nate Chastain',
	'Laura Weiner',
	'massimo crapanzano',
	'Ari Levin',	
	'Justin Isaf',
	'Brian McGough',
	'Jason Unger',
	'Immad Mohamed',
	'Eric Traub',
	'Yuning Liu',
	'David Zausner',
	'Sean Bert',
	'Navjot Singh',
	'Dane Tomseth',
	'Teaseung Kim',
	'Hannah Wood',
	'Iris Chang',
	'Debanshi Bheda',
	'Bryan Gergen',
	'Anthony Velli'
];

studentNames.forEach(function(name) {
	var newStudent = new Student({
		name: name,
		cohort: 1602,
		pastPartners: []
	});
	newStudent.save()
	.then(function(student) {
		console.log(student.name + ' has been added to the database.')
	})
	.catch(function(err) {
		console.error(student.name + ' was not added to the database because of');
		console.error(err);
	})
})

Student.find({ 
	cohort: 1602	
})
.then(function getPossiblePairs (students) {
	
	// All of the .save() promises will be pushed here
	var savePromises = [];

	// These variables will store temporary data during the forEach below
	var studentB, possiblePair;

	students.forEach(function(studentA, idx) {
		for (var j = idx + 1; j < students.length; j++) {
			studentB = students[j];
			possiblePair = new Pair({
				partners: [studentA, studentB]
			});
			savePromises.push(possiblePair.save());
		}
	})
	return Promise.all(savePromises);
})
.then(function() {
	console.log('The pairs have been generated and saved.');
})
.catch(function(err) {
	console.error('A ' + err.message + ' error occured while generating or saving pairs');
	throw err;
});