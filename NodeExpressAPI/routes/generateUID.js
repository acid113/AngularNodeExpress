var express = require('express');
var uid = require('uid-safe');

var router = express.Router();

router.get('/', function(req, res, next) {
    var guidVal = uid.sync(18);
    res.json(
        {
            guid: guidVal
        }
    );
});

module.exports = router;