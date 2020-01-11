const express = require('express');
const logger = require('morgan'); //FIXME: remove in deployment
const app = express();
// const User = require('./models/user');
// const Code = require('./models/code');
// const anonymousCode= require('./models/anonymousCode');

const {sequelize} = require('./models/connection');
const userController = require('./controller/userController');
const anonymousCodeController = require('./controller/anonymousCodeController');
const anonymousCodeRoute = require('./routes/anonymousCodeRoute');
const userRoute = require('./routes/userRoutes');

// view engine setup

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/api', anonymousCodeRoute.router);
app.use('/api/user', userRoute.router);
// catch 404 and forward to error handler

// error handler
// app.use(function (err, req, res, next) {
//     // set locals, only providing error in development
//     res.locals.message = err.message;
//     res.locals.error = req.app.get('env') === 'development' ? err : {};
//
//     // render the error page
//     res.status(err.status || 500);
//     res.render('error');
//
// });

sequelize.sync({
    force: false
}).then(() => {
    //tests
    /*
    console.log('test init');
    // userController.checkUserExists('test')
    //     .then(user => {
    //         console.log("userid", user.id);
    //         console.log('username', user.username);
    //     })
    //     .catch(err => {
    //         console.log('error', err.message);
    //     });
    //
    // userController.checkPassword('test', 'test')
    //     .then(result => {
    //         console.log('check password result: ', result);
    //     })
    //     .catch(err => {
    //         console.log(err.message);
    //     });
    //
    // userController.checkPassword('test','test22')
    //     .then(result =>{
    //         console.log('should fail');
    //     })
    //     .catch(err =>{
    //         console.log(err.message);
    //     });
    //
    //
    // userController.checkPassword('teeest','test22')
    //     .then(result =>{
    //         console.log('should fail');
    //     })
    //     .catch(err =>{
    //         console.log(err.message);
    //     });    console.log('test close');

    console.log('create user function');

    userController.createUser('anonymous','anonymous')
        .then(user =>{
            console.log('done: ',user.username, user.id, user.password);
        })
        .catch(err =>{
            console.log(err.message);
        });

    console.log('create anonymous post function');

     */
    anonymousCodeController.createAnonymousPost('python.py', `
// console.log('Before');
// getUser(1, (user) => {
//     console.log('User', user);
//     getRepositories(user.gitHubUserName, displayCommits);
// });
// console.log('After');

getUser(1)
    .then(user => {
        getRepositories(user.gitHubUserName);
    })
    .then(repos => console.log(repos))
    .catch(err => console.log('Error', err.message)); //single error handler for handling the errors of any of the async operation


function displayCommits(commits) {
    console.log(commits);
}

// Callbacks
// Promises
// Async / await


function getUser(id) {
    return new Promise((resolve, reject) => {
        //kick off some async work
        setTimeout(() => {
            console.log('Reading user from a database');
            resolve({id: id, gitHubUserName: 'mosh'});
        }, 2000);
    });

}

function getRepositories(username) {
    console.log("working");
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('reading repos from a database');
            resolve(['repo1', 'repo2', 'repo3']);
        }, 2000);
    });
}`)
        .then(result => {
            console.log("fucking link: ",result);
        });

    //test EOF

    app.listen(4000, () => {
        console.log('server listening on 4000');
    })

}).catch(err => {
    console.log('ERROR ==> ', err);
});

