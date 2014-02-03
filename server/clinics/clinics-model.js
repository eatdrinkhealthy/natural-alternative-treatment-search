'use strict';

/** Schema for documents **/
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ClinicsSchema = new Schema({
	resource_url: {type: String, default: 'clinics'},
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
	address: {
		street: {type: String, default: null},
		city: {type: String, default: null},
		state: {type: String, default: null},
		zip: {type: String, default: null}
	},
	geo: {type: [Number], index: '2dsphere'}
});

ClinicsSchema.statics.findNearby= function(lat,lon,radius,cb){
	var miles = radius / 3963.192;
        this.find({geo: {"$within": {"$centerSphere": [[lon, lat], miles]} }}).populate('Clinics').exec(function (err, col) {
        	cb(err, col);
        });
};



module.exports = mongoose.model('Clinics', ClinicsSchema);
