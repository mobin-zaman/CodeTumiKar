const User = require('../models/user');

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

/**
 *
 * @param username => to check the if the user exists
 * @param password => to check the password with the user
 * @returns .then=> true, .catch=> error object
 */

function checkPassword(username, password) {
    return new Promise((resolve, reject) => {
        checkUserExists(username)
            .then(user => {
                if (user.password === password) {
                    resolve(true);
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

module.exports.checkUserExists = checkUserExists;
module.exports.checkPassword = checkPassword;
module.exports.createUser = createUser;