'use strict';
var userModel = require('../models/user.model');
const { v4: uuidv4 } = require('uuid');
const CryptoJS = require("crypto-js");

// Get Users
exports.getUsers = (req, res) => {
    const limit = req.body.limit ? req.body.limit : 1000;
    const skip = req.body.skip ? (req.body.skip - 1) : 0;
    const user_id = req.body.userId;
    const sessionId = req.body.sessionId;
    const userreq = {
        'userId': user_id,
        'sessionId': sessionId
    }
    userModel.count().then(count => {
        var query = userModel.find({}).sort({'modified_at': -1}).skip(skip * limit).limit(limit);
        query.exec().then(usersData => {
            const result = {
                'data': usersData,
                'total': count
            };
            // const encryptText = 'U2FsdGVkX18ufMzT3PJLyMutnEEss1xCvurID/kG8bg=';
            // const hashedPassword = decrypt(encryptText);
            // console.log('\n hashedPassword: ', hashedPassword);
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

function decrypt(textToDecrypt) {
    const key = process.env.PASS_SEC;
    return CryptoJS.AES.decrypt(textToDecrypt, key.trim()).toString(CryptoJS.enc.Utf8);
}

function encrypt(value) {
    const key = process.env.PASS_SEC;
    return CryptoJS.AES.encrypt(value, key.trim()).toString();
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
    const userreq = {
        'userId': req.body.userId,
        'sessionId': req.body.sessionId
    }
    userModel.findOne(userreq).then(user => {
        if (user) {
            userModel.find({'username': req.body.username}).then(foundUsers => {
                if (foundUsers && foundUsers.length >= 1) {
                    res.status(500).send({
                        message: 'username is already exists'
                    });
                } else {
                    const uuid = uuidv4();
                    req.body['userId'] = uuid;
                    // const pwd = req.body['password'];
                    // req.body['password'] = encrypt(pwd);
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
        } else {
            res.status(500).send({
                success: false,
                code: 1000,
                message: 'User session ended, Please login again'
            })
        }
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || 'Not able to fetch the collections'
        })
    })
}

// Update User Info
exports.updateUser = (req, res) => {
    if (!req.body) {
        return res.status(400).send({message: 'Data to update can not be empty'});
    }
    const userid = req.params.id;
    const user_id = req.body.userId;
    const sessionId = req.body.sessionId;
    const userreq = {
        'userId': user_id,
        'sessionId': sessionId
    }
    userModel.findOne(userreq).then(user => {
        if (user) {
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
        } else {
            res.status(500).send({
                success: false,
                code: 1000,
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
                success: false,
                code: 1000,
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
    const user_id = req.body.userId;
    const sessionId = req.body.sessionId;
    const userreq = {
        'userId': user_id,
        'sessionId': sessionId
    }
    userModel.findOne(userreq).then(user => {
        if (user) {
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
        } else {
            res.status(500).send({
                success: false,
                code: 1000,
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

// Forgot password
exports.resetpassword = (req, res) => {
    if (!req.body.username) {
        return res.status(400).send({message: 'username is required'});
    }
    if (!req.body.new_password) {
        return res.status(400).send({message: 'New Password is required'});
    }
    if (!req.body.confirm_password) {
        return res.status(400).send({message: 'Confirm Password is required'});
    }
    const username = req.body.username;
    const new_password = req.body.new_password;
    const confirm_password = req.body.confirm_password;

    if (new_password !== confirm_password) {
        return res.status(500).send({ message: 'New password & confirm password is not matched' })
    }

    userModel.findOne({'username': username})
    .then(data => {
        if (!data) {
            res.status(404).send({
                message: `User not found`
            });
        } else {
            const password = { 'password': new_password, 'modified_at': new Date(), 'sessionId': '' };
            userModel.findOneAndUpdate({'username': data.username}, password).then(sessionout => {
                userModel.findOne({'username': data.username}).then(userinfo => {
                    res.status(200).send({ message: 'Password Reset Successfully' })
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

// Update User Permissions
exports.updateUserPermissions = (req, res) => {
    if (!req.body) {
        return res.status(400).send({message: 'Data to update can not be empty'});
    }
    if (req.body && !req.body.id) {
        return res.status(400).send({message: 'User id is required'});
    }
    const userid = req.body.id;
    const user_id = req.body.userId;
    const sessionId = req.body.sessionId;
    const userreq = {
        'userId': user_id,
        'sessionId': sessionId
    }
    userModel.findOne(userreq).then(user => {
        if (user) {
            if (user.username === 'admin') {
                userModel.findOneAndUpdate({'_id': userid}, { 'apps': req.body.apps }, { returnDocument: "after" })
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
            } else {
                res.status(403).send({
                    message: 'User does not have permissions to update'
                });
            }
        } else {
            res.status(500).send({
                success: false,
                code: 1000,
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
