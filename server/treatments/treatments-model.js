'use strict';

/** Schema for documents **/
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TreatmentsSchema = new Schema({
	resource_url: {type: String, default: 'treatments'},
	name: {type: String, default: null},
	cancer_type: [
		{type: String, default: null}
	],
	stage: [
		{type: String, default: null}
	],
	overview: {type: String, default: null},
	description: {type: String, default: null}
});

module.exports = mongoose.model('Treatments', TreatmentsSchema);