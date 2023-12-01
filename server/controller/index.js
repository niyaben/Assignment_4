let express = require('express');
let router = express.Router();

// Display the home page
module.exports.displayHomePage = (req, res, next) => {
    res.render('index', {
        title: 'Home',
        displayName: req.user ? req.user.displayName:''
    });
}

// Display the about page
module.exports.displayAboutPage = (req, res, next) => {
    res.render('index', {
        title: 'About me',
        displayName: req.user ? req.user.displayName:''
    });
}

// Display the projects page
module.exports.displayProjectPage = (req, res, next) => {
    res.render('index', {
        title: 'Projects',
        displayName: req.user ? req.user.displayName:''
    });
}

// Display the contact page
module.exports.displayContactPage = (req, res, next) => {
    res.render('index', {
        title: 'Contact us',
        displayName: req.user ? req.user.displayName:''
    });
}
