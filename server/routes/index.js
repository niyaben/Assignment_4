let express = require('express');
let router = express.Router();
const passport = require('passport');
let DB = require('../config/db');
let userModel = require('../models/user');
let User = userModel.User;

router.get('/login',function(req,res,next){
  if(!req.user)
  {
    res.render('auth/login',
    {
      title:'Login',
      message: req.flash('loginMessage'),
      displayName: req.user ? req.user.displayName:''
    })
  }
  else{
    return res.redirect('/home')
  }
})

router.post('/login',function(req,res,next){
  passport.authenticate('local',function(err,User,info){
      // server error
      if(err)
      {
        return next(err);
      }
      // login error
      if(!User)
      {
        req.flash('loginMessage',
        'AuthenticationError');
        return res.redirect('/login')
      }
      req.login(User,(err)=>{
        if(err)
        {
          return next(err)
        }
        return res.redirect('/course-list');
      })
  })(req,res,next)
})

router.get('/register',function(req,res,next){
  if(!req.user)
  {
    res.render('auth/register',
    {
      title:'Register',
      message: req.flash('registerMessage'),
      displayName: req.user ? req.user.displayName: ''
    })
  }
  else{
    return res.redirect('/home')
  }
})

router.post('/register', function(req,res,next){
  let newUser = new User({
    username: req.body.username,
    // password: req.body.password,
    email: req.body.email,
    displayName: req.body.displayName
  })
  User.register(newUser, req.body.password,(err) => {
    if(err)
    {
      console.log("Error in inserting new User");
      if(err.name =='UserExistError')
      {
        req.flash('registerMessage',
        'Registration Error : User already Exist'
      )}
      return res.render('auth/register',
      {
        title:'Register',
        message: req.flash('registerMessage'),
        displayName: req.user ? req.user.displayName:''
      })
    }
    else{
      return passport.authenticate('local')(req,res,()=>{
        res.redirect('/course-list');
      })
    }
  })
})

router.get('/logout',function(req,res,next){
  req.logout(function(err){
    if(err)
    {
      return next(err);
    }
  })
  res.redirect('/home')
})



let indexController = require('../controller/index')

// GET home page. 
router.get('/',indexController.displayHomePage);

// GET home page. 
router.get('/home',indexController.displayHomePage);

// GET About me page. 
router.get('/aboutme',indexController.displayAboutPage);


// GET project page. 
router.get('/projects',indexController.displayProjectPage) ;

// GET contact us page. 
router.get('/contactus',indexController.displayContactPage);

// GET route for login page 
//router.get('/login',indexController.displayLoginPage);

//POST route for login page 
//router.post('/login',indexController.processLoginPage);

// GET route for registeration page 
//router.get('/register',indexController.displayRegisterPage);

//POST route for login page
//router.post('/register',indexController.processRegisterPage);

//GET route for logout page 
//router.get('/logout',indexController.performLogout);

module.exports = router;

