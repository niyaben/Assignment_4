var express = require("express");
var router = express.Router();
let mongoose = require('mongoose');

//connect with course

let Course = require('../models/course');

let CourseController = require('../controller/course')

// helper function
function requireAuth(req,res,next){
    if(!req.isAuthenticated())
    {
        return res.redirect('/login')
    }
    next();
}
/* Get route for the Bio Courses list */
// Read Operation
router.get('/',CourseController.DislayCourselist);
/* Get route for Add Course page --> Create */
router.get('/add',requireAuth,CourseController.AddCourse); 
/* Post route for Add Course page --> Create */
router.post('/add',requireAuth,CourseController.ProcessCourse);
/* Get route for displaying the Edit Course page --> Update */
router.get('/edit/:id',requireAuth,CourseController.EditCourse);
/* Post route for processing the Edit Course page --> Update */
router.post('/edit/:id',requireAuth,CourseController.ProcessEditCourse);
/* Get to perform Delete Operation --> Delete Operation */
router.get('/delete/:id',requireAuth,CourseController.DeleteCourse);

 module.exports = router;
    