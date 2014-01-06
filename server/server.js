/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');

var server = express();

// all environments
server.set('port', process.env.PORT || 80);
server.set('view engine', 'jade');
server.use(express.favicon());
server.use(express.logger('dev'));
server.use(express.json());
server.use(express.urlencoded());
server.use(express.methodOverride());
server.use(server.router);
server.use(express.static(path.join(__dirname, '../public')));

// development only
if ('development' == server.get('env')) {
    server.use(express.errorHandler());
}

server.get('/', function (req, res) {
    res.sendfile(path.join(__dirname, '../public/static/index.html'));
});

http.createServer(server).listen(server.get('port'), function () {
    console.log('Express server listening on port ' + server.get('port'));
});
