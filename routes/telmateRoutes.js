var express = require('express');
var router = express.Router();
var request = require('request');
var querystring = require('querystring');

var slideshow = require('../slideshow.json');
var messages = require('../messages.json');

var requestHost = null;

// Configurable items;
router.requestHost = function(val) {
    if (arguments.length > 0) {
        requestHost = val;
        return this;
    }
    return requestHost;
};

router.get('/slideshow', function(req, res) {    
    res.json(slideshow);
});

router.get('/messages', function(req, res) {   
	res.json(messages);
});

module.exports = router;
