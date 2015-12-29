var express = require('express');

 

//NPM Module to integrate Handlerbars UI template engine with Express

var exphbs  = require('express-handlebars');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var compression = require('compression');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var validator = require('express-validator');
var passport = require('passport');
var flash = require('connect-flash');
var session = require('express-session');
var errorHandler = require('errorhandler');
var LocalStrategy = require('passport-local').Strategy;
var configDB = require('./config/database.js');
var app = express();

// need to set new routes
var routes = require('./routes/index');
var users = require('./routes/users'); 


//Declaring Express to use Handlerbars template engine with main.handlebars as

//the default layout

app.engine('handlebars', exphbs({defaultLayout: 'main'}));



app.set('view engine', 'handlebars');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/static',express.static(path.join(__dirname, 'public'))); 

//Defining middleware to serve static files
//
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

//
//
// passport config
var Account = require('./models/account');
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());
//

app.use(session({ secret: 'olzhas' })); // session secret
    app.use(passport.initialize());
    app.use(passport.session()); // persistent login sessions
    app.use(flash()); // use connect-flash for flash messages stored in session
//
//connect DB
//mongoose.connect(configDB.url);
console.log(configDB);


mongoose.connect(configDB.url, function (err, db) {

    if (err) {
        console.error (err)
        procesdds.exit(1)  // check if error
    }
    
    app.use(bodyParser.urlencoded({extended: true})) // parse incoming requests
    app.use(bodyParser.json()) 
    app.use(compression())  //middleware functions
    app.use(logger('combined'))  //logger combined
    app.use(errorHandler()) //

    app.use(validator())  // validate requests
    

    app.use(function(req, res, next){
        req.messages = db.collection('messages')
        console.log(req.messages)
        return next()
    })

//APP GET   
    app.get('/aaa', function(req,res,next){

        req.messages.find({}, {sort: {id: -1}}).toArray(function(err, docs){
            if (err) return next(err)
                return res.json(docs) 

        })
    })
//APP POST

    app.post('/aaa', function(req, res, next){
        console.log('REQ',req.body)
        req.checkBody('message', 'Invalid message in body').notEmpty()
        req.checkBody('name', 'Invalid name in body').notEmpty()
        var errors = req.validationErrors()

        if (errors) return next(errors)
        req.messages.insert(req.body, function (err, result){
            if (err) return next (err)
            return res.json(result.ops[0])
            console.log(res.json)
        })
    })

    app.get ('*', function (req, res, next) {
        res.send('Server provides two endpoints GET / message and POST / messages. \n Use Postman, curl or another client to make HTTP requests')
    })
    app.listen(process.env.PORT)
    
})
//

//routes

app.use('/', routes);
app.use('/users', users);
//





// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}


app.listen(3000, function(){

  console.log('Server up: http://localhost:3000');

});
