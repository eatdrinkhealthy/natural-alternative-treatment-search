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
	geo: {type: [Number], index: '2d'}
});

ClinicsSchema.statics.findNearby= function(lat,lon,cb){
        this.find({geo:{$near:[Number(lat),Number(lon)],$maxDistance: 0.1}}).populate('Clinics').exec(function(err,col){
                cb(err,col);
        });
};



module.exports = mongoose.model('Clinics', ClinicsSchema);
