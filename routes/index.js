var express = require('express');
var router = express.Router();
var passport = require('passport');
var Account = require('../models/account');


/* GET home page. */

router.get("/", function(req, res){

  res.render("login",{
  	title  : 'Login',
  	user: req.user
  })

});
//register
router.get('/register', function(req, res) {
    res.render('register', { });
});
router.post('/register', function(req, res) {
    Account.register(new Account({ username : req.body.username }), req.body.password, function(err, account) {
        if (err) {
          return res.render("register", {info: "Sorry. That username already exists. Try again."});
        }

        passport.authenticate('local')(req, res, function () {
            res.redirect('/');
        });
    });
});

router.get('/login', function(req, res) {
    res.render('login', { 
    	user : req.user,
      message: 'message'
    });
});

router.post('/login', passport.authenticate('local'), function(req, res) {
    res.redirect('/customer');
});

router.get('/logout', function(req, res) {
    
  req.session.destroy(function (err) {
    res.redirect('/'); //Inside a callback… bulletproof!
  });
});

function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}

//sales login
router.get('/saleslogin', function(req, res) {
    res.render('saleslogin', { 
      user : req.user,
      message: 'message'
    });
});

router.post('/saleslogin', passport.authenticate('local'), function(req, res) {

    res.render('sales');
});

router.get('/logout', function(req, res) {
  req.session.destroy(function (err) {
    res.redirect('/'); //Inside a callback… bulletproof!
  });
});

function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}

//

//tech login
router.get('/techlogin', function(req, res) {
    res.render('techlogin', { 
      user : req.user,
      message: 'message'
    });
});

router.post('/techlogin', passport.authenticate('local'), function(req, res) {
    res.redirect('/tech');
});

router.get('/logout', function(req, res) {
  req.session.destroy(function (err) {
    res.redirect('/'); //Inside a callback… bulletproof!
  });
});

function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}
//

//admin login
router.get('/adminlogin', function(req, res) {
    res.render('adminlogin', { 
      user : req.user,
      message: 'message'
    });
});

router.post('/adminlogin', passport.authenticate('local'), function(req, res) {
    res.redirect('/home');
});

router.get('/logout', function(req, res) {
  req.logOut(function (err) {
    res.redirect('/'); //Inside a callback… bulletproof!
  });
});

function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}

//


router.get("/home", function(req, res){

  res.render("home",{
  	title  : 'Home',
  })

});
router.get("/tech", function(req, res){

  res.render("tech",{
  	title: 'Tech',
  })

});

router.get("/sales", function(req, res){

  res.render("sales")

});
router.get("/manager", function(req, res){

  res.render("manager")

});

router.get("/customer", function(req, res){

  res.render("customer")


});


module.exports = router
