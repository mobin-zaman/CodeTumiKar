const express = require('express');
const router = express.Router();
const {createUser, createPost} = require('../controller/userController');

//potential url: /api/user/post/
router.post('/post', (req, res) => {
    createPost(req.body.username, req.body.password, req.body.filename, req.body.code)
        .then(codeUrl => {
            res.status(200).send({
                code_url: codeUrl
            });
        })
        .catch(err =>{
            res.status(400).send({
                error:err.message
            });
        });
});

module.exports.router = router;