var express = require('express');

 

//NPM Module to integrate Handlerbars UI template engine with Express

var exphbs  = require('express-handlebars');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
 

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

//routes

app.use('/', routes);
app.use('/users', users);
//

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
