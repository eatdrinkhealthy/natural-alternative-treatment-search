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

var search = require('./search/search.js');

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
	'^/search/.*$ / [L]',
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

// API Routes
server.get('/api/cancer-diets', diets.getAll);
server.get('/api/cancer-diets/:id', diets.getOneById);

server.post('/api/clinics', clinics.add);
server.get('/api/clinics', clinics.getAll);
server.get('/api/clinics/:id', clinics.getOneById);
server.get('/api/clinics/local/:lng/:lat/:miles', clinics.getAllByProximity);

server.post('/api/practitioners', practitioners.add);
server.get('/api/practitioners', practitioners.getAll);
server.get('/api/practitioners/:id', practitioners.getOneById);
server.get('/api/practitioners/local/:lng/:lat/:miles', practitioners.getAllByProximity);

server.get('/api/resources', resources.getAll);
server.get('/api/resources/:id', resources.getOneById);

server.get('/api/treatments', treatments.getAll);
server.get('/api/treatments/:id', treatments.getOneById);

server.get('/api/search', search.all);

http.createServer(server).listen(server.get('port'), function () {
	console.log('Express server listening on port ' + server.get('port'));
});
