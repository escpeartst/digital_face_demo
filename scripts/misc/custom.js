'use strict';
var settings = (function(){
	var _params = {
		"upload" : "../../php/"
	};

	var _mock_data = {
		"user" : "json/user.json",
		"patient_list" : "json/patient_list.json"
	};

	var get_params = function(){
		return _params;
	};

	var get_mock_data = function(){
		return _mock_data;
	};
	return {
		"get_params" : get_params,
		"get_mock_data" : get_mock_data
	};
}());