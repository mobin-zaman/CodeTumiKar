const userController = require('../controller/userController');


test('should check if an user exists', () => {
    userController.checkUserExists('test')
        .then(user => {
            expect(user.id).toBe(1);
            expect(user.username).toBeEqual('testi');
        });

    userController.checkUserExists('doesntexist')
        .then(user => {
            console.log("userval: ", user);
        })
        .catch(err => {
            console.log("error message: ", err.message);
        })
});

test('should check the password if the user exists', () => {
    userController.checkPassword('test', 'test')
        .then(result => {
            expect(result).toBe(true);
        })

    userController.checkPassword('test', 'teste')
        .then(result => {
        })
        .catch(result => {
            console.log(result.message);
        })

});
// it('should create an user if password is provided', () => {
//
// });
