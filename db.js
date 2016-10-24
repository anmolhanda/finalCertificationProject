var mongoose= require("mongoose");
var userModel=require('./app/dao/user.model');
var config = require("./config/config.json");
var dbURI=config.db.url;
module.exports.connect=mongoose.connect(dbURI);

mongoose.connection.on('connected',function(){
console.log('mongoose connected');
})

mongoose.connection.on('error',function(err){
console.log('mongoose error'+JSON.stringify(err));
})

mongoose.connection.on('disconnected',function(){
console.log("mongoose disconnected");
})