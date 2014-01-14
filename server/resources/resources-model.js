'use strict';

/** Schema for documents **/
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ResourcesSchema = new Schema({
    name: {type: String, default: null},
    alpha_order: {type: String, default: null},
    description: {type: String, default: null}
});

module.exports = mongoose.model('Resources', ResourcesSchema);