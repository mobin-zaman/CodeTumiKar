const User = require('../models/user');
const Code = require('../models/code');

/**
 * it takes username as argument
 * if the user exists it returns the user.id
 * else return false
 * @param username
 * @return user || False
 */
function checkUserExists(username) {
    return new Promise((resolve, reject) => {
        User.findOne({
            where: {
                username: username
            }
        }).then(user => {
            if (user === null) {
                reject(new Error('no user exists by this name'));
            } else {
                resolve(user);
            }
        }).catch(err => {
            console.log("checkUserExists", err);
        })
    });
}

function checkFileNameExists(username, filename) {
    return new Promise(((resolve, reject) => {
        checkUserExists(username)
            .then(user => {
                Code.findOne({
                    where: {
                        userId: user.id,
                        fileName: filename
                    }
                }).then(code => {
                    if (code !== null) {
                        resolve(true);
                    } else {
                        reject(false);
                    }
                }).catch(err => {
                    reject(err);
                })
            })
            .catch(err => {
                reject(new Error('user doesnt exist'));
            })
    }));
}

/**
 *
 * @param username => to check the if the user exists
 * @param password => to check the password with the user
 * @returns .then=> user, .catch=> error object
 */

function checkPassword(username, password) {
    return new Promise((resolve, reject) => {
        checkUserExists(username)
            .then(user => {
                if (user.password === password) {
                    resolve(user);
                } else {
                    reject(new Error('password error'));
                }
            })
            .catch(err => {
                reject(new Error('user doesnt exist'));
            })

    })
}

/**
 *
 * @param username
 * @param password
 * @returns //FIXME: write the doc properly
 */
function createUser(username, password) {
    return new Promise((resolve, reject) => {
        checkUserExists(username)
            .then(user => {
                reject(new Error('the username already exists'));
            })
            .catch(err => {
                User.create({
                    username: username,
                    password: password
                })
                    .then(user => {
                        console.log('users auto-genrated id', user.id);
                        resolve(user);
                    })
                    .catch(err => {
                        reject(err);
                    })
            });
    });
}

const DOMAIN_NAME = "http://localhost:4000/api/user/";

function createPost(username, password, filename, code) {
    return new Promise(((resolve, reject) => {
        checkPassword(username, password)
            .then(userReturned => {
                var user = userReturned;

                checkFileNameExists(user.username, filename)
                    .then(result => {
                        console.log(result);
                        if (result) {
                            reject(new Error('filename already exists'));
                        }
                    })
                    .catch(err => {
                        Code.create({
                            userId: user.id,
                            body: code,
                            fileName: filename
                        }).then(code => {
                            resolve(DOMAIN_NAME + user.username + '/' + code.fileName);
                        }).catch(err => {
                            reject(err);
                        })
                    })
            })
            .catch(err => {
                reject(err);
            })
    }));
}

function getPost(username, filename) {
    return new Promise((resolve, reject) => {
        User.findOne({
            where: {
                username: username
            }
        }).then(user => {
            console.log("USER:++++", user);
            console.log("filename: ",filename);
            Code.findOne({
                where: {
                    userId: user.id,
                    fileName: filename
                }
            }).then(code => {
                console.log('CODE=====>', code);
                resolve(code);
            }).catch(err => {
                reject(err);
            });
        }).catch(err => {
            reject(err);
        });
    });
}

//     var user = userReturned;
//
//     Code.create({
//         fileName: filename,
//         userId: user.id,
//         body: code
//     }).then(code => {
//     }).catch(err => {
//         reject(err);
//     })
// })
// .catch(err => {
//     reject(err);
// })
// }));

module.exports.createUser = createUser;
module.exports.createPost = createPost;
module.exports.getPost = getPost;
