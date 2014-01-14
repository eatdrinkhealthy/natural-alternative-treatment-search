'use strict';

/** Schema for documents **/
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PractitionersSchema = new Schema({
    name: {type: String, default: null},
    cancer_type: [
        {type: String, default: null}
    ],
    stage: [
        {type: String, default: null}
    ],
    treatment_type: [
        {type: String, default: null}
    ],
    description: {type: String, default: null},
    link: {
        description: {type: String, default: null},
        url: {type: String, default: null}
    },
    address:{
        street: {type: String, default: null},
        city: {type: String, default: null},
        state: {type: String, default: null},
        zip: {type: String, default: null}
    },
    geolocation: {
        latitude: {type: String, default: null},
        longitude: {type: String, default: null}
    }
});

module.exports = mongoose.model('Practitioners', PractitionersSchema);