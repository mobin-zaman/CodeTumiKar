const express = require('express');
const router = express.Router();
const {createAnonymousPost, retrieveAnonymousPost} = require('../controller/anonymousCodeController');

router.get('/ojanar/:uuid', (req, res) => {
    //TODO: is it necessary to check if the uuid is empty or not?
    //nope, it is already handled in the controller
    console.log("GOT HIT");
    retrieveAnonymousPost(req.params.uuid)
        .then(code => {
            res.send({
                code: code
            })
        })
        .catch(err => {
            res.status(400);
            res.send({
                error: err
            })
        })
});

router.post('/ojanar', (req, res) => {
    createAnonymousPost(req.body.filename, req.body.code)
        .then(codeUrl => {
            res.status(200).send({
                code_url: codeUrl
            });
        })
        .catch(err => {
            res.status(400).send({
                error: err.message
            })
        });
});

module.exports.router = router;