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
	},
	pastPartners: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	}],
	dates: [Object];
});

var Student = mongoose.model('Student', studentSchema);







































//Populate the Mongo database with student information
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















module.exports = Student;

