
// Module dependencies

var express = require('express');
var http = require('http');
var path = require('path');

// Route dependencies
var diets = require('./cancer-diets/cancer-diets-routes.js');
var clinics = require('./clinics/clinics-routes.js');
var practitioners = require('./practitioners/practitioners-routes.js');
var resources = require('./resources/resources-routes.js');
var treatments = require('./treatments/treatments-routes.js');

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

// Static Routes
server.get('/', function (req, res) {
    res.sendfile(path.join(__dirname, '../public/static/index.html'));
});

server.get('/about', function (req, res) {
    res.sendfile(path.join(__dirname, '../public/static/about.html'));
});

server.get('/cancer-diets', function (req, res) {
    res.sendfile(path.join(__dirname, '../public/static/cancer-diets.html'));
});

server.get('/cancer-diet', function (req, res) {
    res.sendfile(path.join(__dirname, '../public/static/cancer-diet.html'));
});

server.get('/clinics', function (req, res) {
    res.sendfile(path.join(__dirname, '../public/static/clinics.html'));
});

server.get('/clinic', function (req, res) {
    res.sendfile(path.join(__dirname, '../public/static/clinic.html'));
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

server.get('/practitioner', function (req, res) {
    res.sendfile(path.join(__dirname, '../public/static/practitioner.html'));
});

server.get('/privacy-policy', function (req, res) {
    res.sendfile(path.join(__dirname, '../public/static/privacy-policy.html'));
});

server.get('/resources', function (req, res) {
    res.sendfile(path.join(__dirname, '../public/static/resources.html'));
});

server.get('/resource', function (req, res) {
    res.sendfile(path.join(__dirname, '../public/static/resource.html'));
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

server.get('/treatment', function (req, res) {
    res.sendfile(path.join(__dirname, '../public/static/treatment.html'));
});

// API Routes
server.get('/api/cancer-diets', diets.getAll);
server.get('/api/cancer-diets/:id', diets.getOneById);

server.get('/api/clinics', clinics.getAll);
server.get('/api/clinics/:id', clinics.getOneById);

server.get('/api/practitioners', practitioners.getAll);
server.get('/api/practitioners/:id', practitioners.getOneById);

server.get('/api/resources', resources.getAll);
server.get('/api/resources/:id', resources.getOneById);

server.get('/api/treatments', treatments.getAll);
server.get('/api/treatments/:id', treatments.getOneById);








http.createServer(server).listen(server.get('port'), function () {
    console.log('Express server listening on port ' + server.get('port'));
});
