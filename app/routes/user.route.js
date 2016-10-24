var userService = require('../services/user.service.js');

var Response = require('../response.js');

var logger = require('../../logger.js');
var Promise = require("bluebird");

function init(router) {
  router.route('/employee')
    .post(createUser)
    .get(getUsers);
  router.route('/employee/:id')
    .delete(deleteUser)
    .put(editUser);
};

function getUsers(req, res) {
  console.log("inside getUsers controller")
  var response = new Response();
  logger.info("##Received request for fetching all Users");
  userService.getUsers().then(function (users) {
    response.data.users = users;
    response.status.statusCode = 200;
    response.status.message = "users retrieved successfully";
    logger.info("##users retrieved ::: BACK IN controller ");
    res.status(200).json(response);
  }).then(undefined, function (err) {
    console.log(err);
    response.status.statusCode = '500';
    response.status.message = "Users cannot be fetched ";
    logger.error("In Controller with error for all Users fetching  ");
    res.status(500).json(response);
  })
};

function createUser(req, res) {
  var response = new Response();
  logger.info("##Received request for creating user");
  console.log("user in controller is", req.body);
  userService.createUser(req.body).then(function (user) {
    response.status.data = user;
    response.status.statusCode = "200";
    response.status.message = "user created successfully";
    logger.info("##user created ::: BACK IN controller ");
    res.status(200).json(response);
  }).catch(function (err) {
    response.status.statusCode = '500';
    response.status.message = "User cannot be created";
    logger.error("In Controller with error for user addition  ");
    res.status(500).json(response);
  })
}


function editUser(req, res) {
  var response = new Response();
  logger.info("##Received request for editing user");
  id=req.params.id;
  userService.editUser(id,req.body).then(function (user) {
    response.status.data = user;
    response.status.statusCode = "200";
    response.status.message = "user edited successfully";
    logger.info("##user edited ::: BACK IN controller ");
    res.status(200).json(response);
  }).catch(function (err) {
    response.status.statusCode = '500';
    response.status.message = "User cannot be edited";
    logger.error("In Controller with error for editing user  ");
    res.status(500).json(response);
  })
}

function deleteUser(req, res) {
  var response = new Response();
  logger.info("##Received request for deleitng user");
  var id = req.params.id;
  userService.deleteUser(id, req.body).then(function (user) {
    response.status.data=user;
    response.status.message = "deleting the user";
    response.status.statusCode = "200";
    logger.info("##User deleted");
    res.status(200).send(response);
  }).catch(function () {
    response.status.message = "no user found";
    response.status.statusCode = "404";
    res.status(404).send(response);
  })
}


module.exports.init = init;
