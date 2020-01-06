const express = require('express');
const logger = require('morgan'); //FIXME: remove in deployment
const app = express();
const User = require('./models/user');
const Code = require('./models/code');

const {sequelize} = require('./models/connection');
const userController = require('./controller/userController');


// view engine setup

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));


// catch 404 and forward to error handler

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');

});

sequelize.sync({
    force: false
}).then(() => {
    //tests
    console.log('test init');
    userController.checkUserExists('test')
        .then(user => {
            console.log("userid", user.id);
            console.log('username', user.username);
        })
        .catch(err => {
            console.log('error', err.message);
        });

    userController.checkPassword('test', 'test')
        .then(result => {
            console.log('check password result: ', result);
        })
        .catch(err => {
            console.log(err.message);
        });

    userController.checkPassword('test','test22')
        .then(result =>{
            console.log('should fail');
        })
        .catch(err =>{
            console.log(err.message);
        });


    userController.checkPassword('teeest','test22')
        .then(result =>{
            console.log('should fail');
        })
        .catch(err =>{
            console.log(err.message);
        });    console.log('test close');

    console.log('create user function');

    userController.createUser('test3','test3')
        .then(user =>{
            console.log('done: ',user.username, user.id, user.password);
        })
        .catch(err =>{
            console.log(err.message);
        })
    //test EOF
    // app.listen(4001, () => {
    //     console.log('server listening on 4000');
    // })

}).catch(err => {
    console.log('ERROR ==> ', err);
});

