let express = require('express');
let router = express.Router();
let Course = require('../models/course');

// Display the list of courses
module.exports.DislayCourselist = async (req, res, next) => {
    try {
        // Fetch the list of courses from the database
        const CourseList = await Course.find();

        // Render the 'list' view with the retrieved course data
        res.render('course/list', {
            title: 'Course List',
            displayName: req.user ? req.user.displayName:'',
            CourseList: CourseList
        });
    } catch (err) {
        console.error(err);
        // Handle errors and render the 'list' view with an error message
        res.render('course/list', {
            error: 'Error on the server'
        });
    }
};

// Render the form to add a new course
module.exports.AddCourse = async (req, res, next) => {
    try {
        res.render('course/add', {
            title: 'Add Course',
            displayName: req.user ? req.user.displayName:''
        });
    } catch (err) {
        console.error(err);
        res.render('course/list', {
            error: 'Error on the server',
        });
    }
};

// Process the form data to add a new course
module.exports.ProcessCourse = async (req, res, next) => {
    try {
        // Create a new Course instance with data from the form
        let newCourse = Course({
            "course_name": req.body.course_name,
            "course_number": req.body.course_number,
            "Prof_name": req.body.Prof_name,
            "Description": req.body.Description,
            "intake": req.body.intake
        });

        // Save the new course to the database and redirect to the course list
        Course.create(newCourse).then(() => {
            res.redirect('/course-list');
        });
    } catch (error) {
        console.error(err);
        res.render('course/list', {
            error: 'Error on the server',
        });
    }
};

// Render the form to edit an existing course
module.exports.EditCourse = async (req, res, next) => {
    try {
        // Retrieve the course to edit from the database using the provided ID
        const id = req.params.id;
        const courseToEdit = await Course.findById(id);

        // Render the 'edit' view with the retrieved course data
        res.render('course/edit', {
            title: 'Edit Course',
            displayName: req.user ? req.user.displayName:'',
            Course: courseToEdit
        });
    } catch (error) {
        console.error(err);
        res.render('course/list', {
            error: 'Error on the server'
        });
    }
};

// Process the form data to edit an existing course
module.exports.ProcessEditCourse = (req, res, next) => {
    try {
        const id = req.params.id;

        // Create an updated Course instance with data from the form
        let updatedCourse = Course({
            "_id": id,
            "course_name": req.body.course_name,
            "course_number": req.body.course_number,
            "Prof_name": req.body.Prof_name,
            "Description": req.body.Description,
            "intake": req.body.intake
        });

        // Update the course in the database and redirect to the course list
        Course.findByIdAndUpdate(id, updatedCourse).then(() => {
            res.redirect('/course-list');
        });
    } catch (error) {
        console.error(err);
        res.render('course/list', {
            error: 'Error on the server'
        });
    }
};

// Delete a course
module.exports.DeleteCourse = (req, res, next) => {
    try {
        let id = req.params.id;

        // Delete the course from the database and redirect to the course list
        Course.deleteOne({ _id: id }).then(() => {
            res.redirect('/course-list');
        });
    } catch (error) {
        console.error(err);
        res.render('course/list', {
            error: 'Error on the server'
        });
    }
}
