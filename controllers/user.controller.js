'use strict';
var userModel = require('../models/user.model');
const { v4: uuidv4 } = require('uuid');

// Get Users
exports.getUsers = (req, res) => {
    const limit = req.body.limit ? req.body.limit : 1000;
    const skip = req.body.skip ? (req.body.skip - 1) : 0;
    userModel.count().then(count => {
        var query = userModel.find({}).sort({'modified_at': -1}).skip(skip * limit).limit(limit);
        query.exec().then(usersData => {
            const result = {
                'data': usersData,
                'total': count
            };
            res.send(result);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Not able to fetch the users'
            })
        })
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || 'Not able to fetch the users'
        })
    })
}

// Create New User
exports.createUser = (req, res) => {
    if (!req.body) {
        res.status(400).send({message: 'payload is required'});
        return;
    }
    if (!req.body.username) {
        res.status(400).send({message: 'username is required'});
        return;
    }
    userModel.find({'username': req.body.username}).then(foundUsers => {
        if (foundUsers && foundUsers.length >= 1) {
            res.status(500).send({
                message: 'username is already exists'
            });
        } else {
            const uuid = uuidv4();
            req.body['userId'] = uuid;
            const user = new userModel(req.body);
            user.save(user)
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || 'Save operation is not occured'
                });
            })
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message || 'user not found'
        });
    });
}

// Update User Info
exports.updateUser = (req, res) => {
    if (!req.body) {
        return res.status(400).send({message: 'Data to update can not be empty'});
    }
    const userid = req.params.id;

    userModel.findOneAndUpdate({'_id': userid}, req.body, { returnDocument: "after" })
    .then(updatedUserData => {
        if (!updatedUserData) {
            res.status(404).send({
                message: `Cannot update user with id ${userid}`
            });
        } else {
            res.send(updatedUserData);
        }
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || 'Update operation is not occured'
        });
    })
}

// Delete User
exports.deleteUser = (req, res) => {
    if (!req.params.id) {
        return res.status(400).send({message: 'User id param is required'});
    }
    const userid = req.params.id;
    const user_id = req.body.userId;
    const sessionId = req.body.sessionId;
    const userreq = {
        'userId': user_id,
        'sessionId': sessionId
    }
    if (userid === user_id) {
        return res.status(400).send({message: 'You do not have permission for delete user'});
    }
    userModel.findOne(userreq).then(user => {
        if (user) {
            userModel.findOneAndRemove({'_id': userid})
            .then(removedUser => {
                if (!removedUser) {
                    res.status(404).send({
                        message: `Cannot delete user with id ${userid}`
                    });
                } else {
                    res.send({ success: true, message: "User Deleted Successfully" });
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || 'delete operation is not occured'
                });
            })
        } else {
            res.status(500).send({
                message: 'User session ended, Please login again'
            })
        }
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || 'delete operation is not occured'
        });
    })   
}

// Get User Info
exports.getUserInfo = (req, res) => {
    if (!req.params.id) {
        return res.status(400).send({message: 'User id is required'});
    }
    const userid = req.params.id;

    userModel.findOne({'_id': userid})
    .then(data => {
        if (!data) {
            res.status(404).send({
                message: `User not found with id: ${userid}`
            });
        } else {
            res.send(data);
        }
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || 'not able to get user info'
        });
    })
}

// Login
exports.login = (req, res) => {
    if (!req.body.username && req.body.password) {
        return res.status(400).send({message: 'Username & Password is required'});
    }
    const username = req.body.username;
    const pwd = req.body.password;

    userModel.findOne({'username': username, 'password': pwd})
    .then(data => {
        if (!data) {
            res.status(404).send({
                message: `Invalid credentials`
            });
        } else {
            const userid = data._id;
            const uuid = uuidv4();
            const session = { sessionId: uuid }
            userModel.findOneAndUpdate({'username': username}, session).then(sessionupdated => {
                userModel.findOne({'username': username}).then(userinfo => {
                    res.send(userinfo);
                }).catch(err => {
                    res.status(500).send({
                        message: err.message || 'user not found'
                    });
                })
            }).catch(err => {
                res.status(500).send({
                    message: err.message || 'Invalid credentials'
                });
            })
        }
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || 'not able to get user info'
        });
    })
}

// Logout
exports.logout = (req, res) => {
    if (!req.body.userId && !req.body.sessionId) {
        return res.status(400).send({message: 'userid & sessionid is required'});
    }
    const userId = req.body.userId;
    const sessionId = req.body.sessionId;

    userModel.findOne({'userId': userId, 'sessionId': sessionId})
    .then(data => {
        if (!data) {
            res.status(404).send({
                message: `User not found`
            });
        } else {
            const session = { sessionId: '' };
            userModel.findOneAndUpdate({'userId': userId}, session).then(sessionout => {
                userModel.findOne({'userId': userId}).then(userinfo => {
                    res.send(userinfo);
                }).catch(err => {
                    res.status(500).send({
                        message: err.message || 'user not found'
                    });
                })
            }).catch(err => {
                res.status(500).send({
                    message: err.message || 'Invalid credentials'
                });
            })
        }
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || 'not able to get user info'
        });
    })
}
