const AnonymousCode = require('../models/anonymousCode');
const uuidV1 = require('uuid/v1');

/**
 * this functions creates a new uuid for the code
 * just as a precaution and in order to practise how to make a code modular, the logic was added
 * @returns a new uuid
 */
/*
function createUUID() {
    return new Promise(((resolve) => {
        let uuid = uuidV1();
        console.log(uuid);

        Code.findOne({
            where: {
                uuid: uuid
            }
        }).then(code => {
            if (code === null) {
                resolve(uuid);
            } else {
                resolve(uuidV1());
            }
        })

    }));
}
*/

const DOMAIN_NAME = 'http://localhost:4001/anonymus-er/';

function createAnonymousPost(filename, code) {
    return new Promise((resolve, reject) => {
        if (code === undefined) {
            reject(new Error('the code body is empty'));
        }

        AnonymousCode.create({
            uuid: uuidV1(),
            fileName: filename,
            body: code
        }).then(code => {
            resolve(DOMAIN_NAME + code.uuid);
        }).catch(err => {
            console.log('is it even possible?');
            anonymousCode.crate({
                uuid: uuidV1(),
                fileName: filename,
                body: code
            }).then(code => {
                resolve(DOMAIN_NAME + code.uuid);
            })
        })
    });
}
//FIXME: below function needs to be check later on
function retrieveAnonymousPost(uuid) {
    return new Promise((resolve, reject) => {
        if (!uuid) {
            reject(new Error('uuid is not given'));
        }
        AnonymousCode.findOne({
            where: {
                uuid: uuid
            }
        }).then(code => {
            resolve(code);
        }).catch(err => {
            reject(new Error('the code doesnt exist'));
        });
    });
}

module.exports = {
    createAnonymousPost: createAnonymousPost,
    retrieveAnonymousPost: retrieveAnonymousPost
};
