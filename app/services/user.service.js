var userModel = require("../dao/user.model.js");
var Promise = require("bluebird");
var logger = require('../../logger.js');

var userService = {
getUsers:getUsers,
editUser:editUser,
deleteUser:deleteUser,
createUser:createUser
}

/*
service for creating user
*/
function createUser(user) {
    return new Promise(function (resolve, reject) {
        userModel.createUser(user).then(function (data) {
            resolve(data);
        }).catch(function (err) {
            logger.error("could not create user", err.stack);
            reject(err);
        });
    });
}


/*
service for editing user
*/
function editUser(id,user) {
    return new Promise(function (resolve, reject) {
        userModel.editUser(id,user).then(function (data) {
            resolve(data);
        }).catch(function (err) {
            logger.error("could not edit user", err.stack);
            reject(err);
        });
    });
}

/*
service for deleting user
*/
function deleteUser(id) {

    return new Promise(function (resolve, reject) {
        userModel.deleteUser(id).then(function (data) {
            resolve(data);
        }).catch(function (err) {
            logger.error("could not delete user", err.stack);
            reject(err);
        });
    });
}

/*
service for getting users
*/
function getUsers() {
    return new Promise(function (resolve, reject) {
        userModel.getUsers().then(function (users) {
            resolve(users);
        }).catch(function (err) {
            logger.error("could not get users", err.stack);
            reject(err);
        });
    })
}

module.exports = userService;
