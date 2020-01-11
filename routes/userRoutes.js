const express = require('express');
const router = express.Router();
const {createUser, createPost, getPost} = require('../controller/userController');

//potential url: /api/user/post/
router.post('/post', (req, res) => {
    createPost(req.body.username, req.body.password, req.body.filename, req.body.code)
        .then(codeUrl => {
            res.status(200).send({
                code_url: codeUrl
            });
        })
        .catch(err => {
            res.status(400).send({
                error: err.message
            });
        });
});

router.post('/user/create', (req, res) => {
    createUser(req.body.username, req.body.password)
        .then(user => {
            res
                .status(200)
                .send({
                    msg: "user created succesfully"
                });
        })
        .catch(err => {
            res.status(400).send({
                error: err.message
            });
        });
});

router.get('/:username/:filename', (req, res) => {
    getPost(req.params.username, req.params.filename)
        .then(code => {
            console.log("CODE:  ---> ", code);
            return res.status(200).send({
                code: code
            });
        })
        .catch(err => {
            return res.status(400).send({
                error: err.message
            });
        });
});
module.exports.router = router;