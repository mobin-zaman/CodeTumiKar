const express = require('express');
const router = express.Router();
const {createAnonymousPost, retrieveAnonymousPost} = require('../controller/anonymousCodeController');

router.get('/anonymous-er/:uuid', (req, res) => {
    //TODO: is it necessary to check if the uuid is empty or not?
    //nope, it is already handled in the controller
    console.log("GOT HIT");
    retrieveAnonymousPost(req.params.uuid)
        .then(code => {
            res.status(200).body(code).send();
        })
        .catch(err =>{
            res.status(400).body(err.message).send();
        })
});

module.exports.router = router;