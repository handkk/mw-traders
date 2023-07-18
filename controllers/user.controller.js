'use strict';
var userModel = require('../models/user.model');
const { v4: uuidv4 } = require('uuid');

// Get Users
exports.getUsers = (req, res) => {
    userModel.find({}).then(usersData => {
        res.send(usersData);
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
    const uuid = uuidv4();
    req.body['userId'] = uuid;
    console.log('26 create user enters body  ', JSON.stringify(req.body), '\n');
    const user = new userModel(req.body);
    user.save(user)
    .then(data => {
        console.log('user created data ', JSON.stringify(data), '\n');
        res.send(data);
        // userModel.findOne({'username': req.body.username}).then(userinfo => {
        //     res.send(userinfo);
        // }).catch(err => {
        //     res.status(500).send({
        //         message: err.message || 'user not found'
        //     });
        // })
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || 'Save operation is not occured'
        });
    })
}

// Update User Info
exports.updateUser = (req, res) => {
    console.log('update user enters body ', JSON.stringify(req.body), '\n');
    if (!req.body) {
        return res.status(400).send({message: 'Data to update can not be empty'});
    }
    const userid = req.params.id;
    console.log('update user id ', userid, '\n');

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
    console.log('\n login req body ', JSON.stringify(req.body), '\n');
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
            console.log('\n user data ', JSON.stringify(data), '\n');
            const userid = data._id;
            const uuid = uuidv4();
            const session = { sessionId: uuid }
            console.log('\n user id ', userid, '\n');
            console.log('\n user name ', username, '\n');
            console.log('\n sessionid ', JSON.stringify(session), '\n');
            userModel.findOneAndUpdate({'username': username}, session).then(sessionupdated => {
                console.log('\n user updated with session ', JSON.stringify(sessionupdated), '\n');
                userModel.findOne({'username': username}).then(userinfo => {
                    res.send(userinfo);
                }).catch(err => {
                    // console.log('\n user updated with session err ', JSON.stringify(err), '\n');
                    res.status(500).send({
                        message: err.message || 'user not found'
                    });
                })
            }).catch(err => {
                console.log('\n user updated with session err ', JSON.stringify(err), '\n');
                res.status(500).send({
                    message: err.message || 'Invalid credentials'
                });
            })
        }
    })
    .catch(err => {
        console.log('\n user not found catch err ', JSON.stringify(err), '\n');
        res.status(500).send({
            message: err.message || 'not able to get user info'
        });
    })
}

// Logout
exports.logout = (req, res) => {
    console.log('\n logout req body ', JSON.stringify(req.body), '\n');
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
            console.log('\n user data ', JSON.stringify(data), '\n');
            const session = { sessionId: '' };
            console.log('\n sessionid ', JSON.stringify(session), '\n');
            userModel.findOneAndUpdate({'userId': userId}, session).then(sessionout => {
                // console.log('\n user updated with session ', JSON.stringify(sessionupdated), '\n');
                userModel.findOne({'userId': userId}).then(userinfo => {
                    res.send(userinfo);
                }).catch(err => {
                    res.status(500).send({
                        message: err.message || 'user not found'
                    });
                })
            }).catch(err => {
                console.log('\n user updated with session err ', JSON.stringify(err), '\n');
                res.status(500).send({
                    message: err.message || 'Invalid credentials'
                });
            })
        }
    })
    .catch(err => {
        console.log('\n user not found catch err ', JSON.stringify(err), '\n');
        res.status(500).send({
            message: err.message || 'not able to get user info'
        });
    })
}
