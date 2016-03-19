Student = require('../models');

Student.find({ 
	cohort: 1602	
})
.then(students) {
	for (var i = 0; i < students.length; i++) {
		for (var j = i + 1; j < students.length; j++) {

		}
	}
}