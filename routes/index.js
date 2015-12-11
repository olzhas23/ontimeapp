var express = require('express');
var router = express.Router();

/* GET home page. */


router.get("/", function(req, res){

  res.render("login",{
  	title  : 'Login',
  })

});
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

module.exports = router;
