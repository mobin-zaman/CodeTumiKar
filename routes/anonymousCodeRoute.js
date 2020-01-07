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
                code:code
            })
        })
        .catch(err =>{
            res.status(400);
            res.send({
                error:err
            })
        })
});

module.exports.router = router;