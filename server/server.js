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

server.get('/about', function (req, res) {
    res.sendfile(path.join(__dirname, '../public/static/about.html'));
});

server.get('/cancer-diets', function (req, res) {
    res.sendfile(path.join(__dirname, '../public/static/cancer-diets.html'));
});

server.get('/clinics', function (req, res) {
    res.sendfile(path.join(__dirname, '../public/static/clinics.html'));
});

server.get('/contact-us', function (req, res) {
    res.sendfile(path.join(__dirname, '../public/static/contact-us.html'));
});


server.get('/disclaimer', function (req, res) {
    res.sendfile(path.join(__dirname, '../public/static/disclaimer.html'));
});

server.get('/practitioners', function (req, res) {
    res.sendfile(path.join(__dirname, '../public/static/practitioners.html'));
});

server.get('/privacy-policy', function (req, res) {
    res.sendfile(path.join(__dirname, '../public/static/privacy-policy.html'));
});

server.get('/resources', function (req, res) {
    res.sendfile(path.join(__dirname, '../public/static/resources.html'));
});

server.get('/site-map', function (req, res) {
    res.sendfile(path.join(__dirname, '../public/static/site-map.html'));
});

server.get('/terms-of-use', function (req, res) {
    res.sendfile(path.join(__dirname, '../public/static/terms-of-use.html'));
});

server.get('/treatments', function (req, res) {
    res.sendfile(path.join(__dirname, '../public/static/treatments.html'));
});


http.createServer(server).listen(server.get('port'), function () {
    console.log('Express server listening on port ' + server.get('port'));
});
