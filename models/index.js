var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/pairsdb');

var Schema = mongoose.Schema;

var studentSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	cohort: {
		type: Number,
		required: true
	}
});



studentSchema.statics.getNumStudents = function getNumStudents(cohort) {
	var result;

	Student.find({
		cohort: cohort
	})
	.exec()
	.then(function(students) {
		result = students.length;
	})
	.catch(function(err) {
		throw err;
	});

	return result;
}

var Student = mongoose.model('Student', studentSchema);

var pairSchema = new Schema({

	// An array with two elements,
	// each element is a Student instance
	partners: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Student' 
	}],

	// The date when the two students were paired, or a default date
	// if they haven't been paired yet
	date: {
		type: Date,
		default: new Date(2016, 01, 01)
	}
});

var Pair = mongoose.model('Pair', pairSchema);

module.exports = {
	pair: Pair,
	student: Student
};




//Populate the Mongo database with student information

// Student.remove();
// Pair.remove();

// var studentNames = [
// 	'Edward Liew',
// 	'Matthew Starr',
// 	'Henry Nguye',
// 	'Jeff Fenster',
// 	'Nate Chastain',
// 	'Laura Weiner',
// 	'massimo crapanzano',
// 	'Ari Levin',	
// 	'Justin Isaf',
// 	'Brian McGough',
// 	'Jason Unger',
// 	'Immad Mohamed',
// 	'Eric Traub',
// 	'Yuning Liu',
// 	'David Zausner',
// 	'Sean Bert',
// 	'Navjot Singh',
// 	'Dane Tomseth',
// 	'Teaseung Kim',
// 	'Hannah Wood',
// 	'Iris Chang',
// 	'Debanshi Bheda',
// 	'Bryan Gergen',
// 	'Anthony Velli'
// ];



// studentNames.forEach(function(name) {
// 	var newStudent = new Student({
// 		name: name,
// 		cohort: 1602,
// 		pastPartners: []
// 	});
// 	newStudent.save()
// 	.then(function(student) {
// 		console.log(student.name + ' has been added to the database.')
// 	})
// 	.catch(function(err) {
// 		console.error(student.name + ' was not added to the database because of');
// 		console.error(err);
// 	})
// })

// Student.find({ 
// 		cohort: 1602	
// })
// .then(function getPossiblePairs (students) {
	
// 	// All of the .save() promises will be pushed here
// 	var savePromises = [];

// 	// These variables will store temporary data during the forEach below
// 	var studentB, possiblePair;

// 	students.forEach(function(studentA, idx) {
// 		for (var j = idx + 1; j < students.length; j++) {
// 			studentB = students[j];

// 			console.dir([studentA.name, studentB.name]);
// 			possiblePair = new Pair({
// 				partners: [studentA, studentB]
// 			});
// 			savePromises.push(possiblePair.save());
// 		}
// 	})
// 	return Promise.all(savePromises);
// })
// .catch(function(err) {
// 	console.error('A ' + err.message + ' error occured while generating or saving pairs');
// 	throw err;
// });


