var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var Account = new Schema({
    username: String,
    password: String
});
console.log("this is account echo");
Account.plugin(passportLocalMongoose);

module.exports = mongoose.model('Account', Account);