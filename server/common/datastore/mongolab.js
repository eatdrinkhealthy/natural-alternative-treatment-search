'use strict';

// Load modules
var mongo = require('mongodb')
    , mongoose = require('mongoose')
    , Schema = mongoose.Schema
    , ObjectId = mongoose.SchemaTypes.ObjectId
    , mongooseTypes = require('mongoose-types');

// Load models
var Treatments = require('../../treatments/treatments-model.js');
var Resources = require('../../resources/resources-model.js');
var Practitioners = require('../../practitioners/practitioners-model.js');

function Models() {
    var self = this;
    this.Treatments = Treatments;
    this.Resources = Resources;
    this.Practitioners = Practitioners;

    var options = {
        user: 'web-app',
        pass: '36hjd;pq24y-kgasw-035uad',
        server: {keepAlive: 1}
    }
    mongoose.connect('mongodb://@ds053178.mongolab.com:53178/steve-marsh', options);
    this.connection = mongoose.connection;
};

module.exports = new Models();



