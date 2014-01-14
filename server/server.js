// Module dependencies

var express = require('express');
var http = require('http');
var path = require('path');
var modRewrite = require('connect-modrewrite');

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
server.use(express.bodyParser());
server.use(express.methodOverride());
server.use(express.cookieParser());
server.use(express.static(path.join(__dirname, '../public')));

// development only
if ('development' == server.get('env')) {
    server.use(express.errorHandler());
}

/* These are rewrite rules so that when a user does browser page reload they URL is passed back to Angular */
server.use(modRewrite([
    '^/treatments$ / [L]',
    '^/treatments/.*$ / [L]',
    '^/clinics$ / [L]',
    '^/clinics/.*$ / [L]',
    '^/practitioners$ / [L]',
    '^/practitioners/.*$ / [L]',
    '^/resources$ / [L]',
    '^/resources/.*$ / [L]',
    '^/cancer-diets$ / [L]',
    '^/cancer-diets/.*$ / [L]',
    //static routes
    '^/about$ / [L]',
    '^/contact-us$ / [L]',
    '^/disclaimer$ / [L]',
    '^/privacy-policy / [L]',
    '^/site-map$ / [L]',
    '^/terms-of-use$ / [L]'
]));

/* This is the IE cache issue solution */
server.use(function (req, res, next) {
    //TODO: move this to a separate file
    res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.header('Pragma', 'no-cache');
    res.header('Expires', 0);
    next();
});

server.use(server.router);

// Static Routes
server.get('/', function (req, res) {
    res.sendfile(path.join(__dirname, '../public/app/app.html'));
});

/**
 server.get('/about', function (req, res) {
    res.sendfile(path.join(__dirname, '../public/static/about.html'));
});

 server.get('/contact-us', function (req, res) {
    res.sendfile(path.join(__dirname, '../public/static/contact-us.html'));
});

 server.get('/disclaimer', function (req, res) {
    res.sendfile(path.join(__dirname, '../public/static/disclaimer.html'));
});

 server.get('/privacy-policy', function (req, res) {
    res.sendfile(path.join(__dirname, '../public/static/privacy-policy.html'));
});

 server.get('/site-map', function (req, res) {
    res.sendfile(path.join(__dirname, '../public/static/site-map.html'));
});

 server.get('/terms-of-use', function (req, res) {
    res.sendfile(path.join(__dirname, '../public/static/terms-of-use.html'));
});
 /*

 /**
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

 server.get('/practitioners', function (req, res) {
    res.sendfile(path.join(__dirname, '../public/static/practitioners.html'));
});

 server.get('/practitioner', function (req, res) {
    res.sendfile(path.join(__dirname, '../public/static/practitioner.html'));
});

 server.get('/resources', function (req, res) {
    res.sendfile(path.join(__dirname, '../public/static/resources.html'));
});

 server.get('/resource', function (req, res) {
    res.sendfile(path.join(__dirname, '../public/static/resource.html'));
});

 server.get('/treatments', function (req, res) {
    res.sendfile(path.join(__dirname, '../public/static/treatments.html'));
});

 server.get('/treatment', function (req, res) {
    res.sendfile(path.join(__dirname, '../public/static/treatment.html'));
});
 **/

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
