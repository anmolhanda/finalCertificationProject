var Promise = require("bluebird");
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var logger = require('../../logger');
var userSchema = new Schema({
    // "employeeId": {
    //     type: String,
    //     required: true,
    //     unique: true
    // },
    "name": {
        type: String,
        required: true
    },
    "email": {
        type: String,
        required: true,
        unique:true
    },
    "dob": {
        type: Date,
        required: true
    },
    "department": {
        type: String,
        required: true
    },
    "gender": {
        type: String,
        required: true
    },
},
    { timestamps: { createdAt: 'created_at', updatedAt: "updated_at" } });

var User = mongoose.model('user', userSchema);

var userDao = {
    getUsers: getUsers,
    editUser: editUser,
    deleteUser: deleteUser,
    createUser: createUser
};
module.exports = userDao;


/*
 getting all users
*/
function getUsers() {
    return new Promise(function (resolve, reject) {
        User.find({}, function (err, user) {
            if (!err) {
                logger.info("get the users");
                resolve(user);
            } else {
                reject(err);
            }
        });
    });
};


/*
 editing a user
*/
function editUser(id,user) {
    return new Promise(function (resolve, reject) {
        User.findOneAndUpdate({
            _id: id
        }, user, {
                upsert: true,
                new: false
            }, function (err, data) {
                if (!err) {
                    logger.info("edited the user");
                    resolve(data);
                } else {
                    reject(err);
                }
            });
    });
}

/*
  creating a user
*/
function createUser(user) {
    return new Promise(function (resolve, reject) {
        User.create(user, function (err, data) {
            if (!err) {
                logger.info("created the user");
                resolve(data);
            } else {
                reject(err);
            }
        });
    });
}

/*
deleting a user
*/
function deleteUser(id) {
    return new Promise(function (resolve, reject) {
        User.findOne({ _id: id }, function (err, user) {
            if (err) throw err;
            User.remove(user, function (err, data) {
                if (!err) {
                    logger.info("deleted user");
                    resolve(data);
                } else {
                    reject(err);
                }
            });

        });
    });
}





