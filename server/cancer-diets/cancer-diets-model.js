'use strict';

/** Schema for documents **/
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CancerDietsSchema = new Schema({
    name: {type: String, default: null},
    cancer_type: [
        {type: String, default: null}
    ],
    stage: [
        {type: String, default: null}
    ],
    author: [
        {type: String, default: null}
    ],
    overview: {type: String, default: null},
    description: {type: String, default: null},
    link: {
        description: {type: String, default: null},
        url: {type: String, default: null}
    }
});

module.exports = mongoose.model('CancerDiets', CancerDietsSchema);