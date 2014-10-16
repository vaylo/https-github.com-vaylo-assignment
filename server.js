#!/usr/bin/env node
/**
 * The purpose of this application is created for Telmate assignment on 10/11/2014.
 * 
 * Author: Vay Lo
 *
 */

var debug = require('debug')('telmate');
var app = require('./app');
var path = require('path');
var async = require('async'),
    series = async.series;

app.set('port', process.env.PORT || 3000);

function startServing(callback) {
    var server = app.listen(app.get('port'), function() {
        debug('Express server listening on port ' + server.address().port);
        callback(null);
    });
}

async.series([
    startServing
], function(err) {
    console.log('Server Startup Completed');
});

