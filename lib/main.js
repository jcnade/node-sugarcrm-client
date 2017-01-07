"use strict";

/* SugarCRM REST API module in node.js */

var request = require('request');


/* Global */

var apiURL  = "";
var login   = "";
var passwd  = "";
var sessionID  = "";


/* Config Initialisation */
var init = function (initArray) {
	apiURL = initArray.apiURL;
	login =  initArray.login;
	passwd = initArray.passwd;
}
exports.init = init;


/* Show Config Info */
var configInfo = function (initArray) {

	return {
			apiURL: apiURL
			,login : login
			,passwd : passwd
	}
}
exports.configInfo = configInfo;


/* get a session ID */
exports.login = function (callback) {

	var subargs = { 
					user_auth: {
								"user_name" : login,
				 				"password"  : passwd, 
				 				encryption:'PLAIN'
					 			},
					application: "SugarCRM RestAPI Example"
				   }

	var subargsInString = JSON.stringify(subargs);

	var data = {
		method: "login",
		input_type: "JSON",
		response_type: "JSON",
		rest_data: subargsInString 
	};

	request.post(apiURL, { form: data }, function(e,r,body){
		sessionID = JSON.parse(body).id;
		callback(sessionID);
	});
}



/* pure POST call function */
var call = function (method, parameters, callback) {

	var data = {
		method: method,
		input_type: "JSON",
		response_type: "JSON",
		rest_data: JSON.stringify(parameters)
	};

	request.post(apiURL, { form: data }, function(e,r,body){
		if(r.statusCode !== 200) {
			e = 'Invalid response code from server. 200 exprected';
     			return	callback(e);
		}
  		sessionID = JSON.parse(body).id;
		return callback(e, sessionID);
	});
}
exports.call = call;














