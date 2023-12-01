const { name } = require('ejs');
let mongoose = require('mongoose');
//create a course model
//schema for database
let Courses = mongoose.Schema({
    course_name: String,
    course_number: String,
    intake: String,
    Prof_name: String,
    Description: String,

},{
    collection: "data"
}
);
module.exports = mongoose.model('Course',Courses);