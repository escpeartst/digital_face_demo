'use strict';

/**
 * @ngdoc function
 * @name ivanChicchonAngularWebApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the ivanChicchonAngularWebApp
 */
var app = angular.module('ivanChicchonAngularWebApp');

app.controller('MainCtrl', ["$scope", 'user_service',
    function($scope, user_service) {
        $scope.user = {};
        $scope.login = function(user) {
            user_service.loginUser(user);
        };
    }
]);

app.controller('PatientCtrl', ['$scope', '$location', 'user_service',
    function($scope, $location, user_service) {
        user_service.get_patients_list().then(function(data) {
            var patients = data.patient_info;
            $scope.patients = [];
            Object.keys(patients).forEach(function(key) {
                $scope.patients[key] = {
                    "uid": patients[key].id,
                    "first_name": patients[key].first_name,
                    "last_name": patients[key].last_name,
                    "gender": patients[key].gender.toUpperCase()
                };
            });
        });
    }
]);

app.controller('PatientUserCtrl', ['$scope', '$routeParams', 'user_service',
    function($scope, $routeParams, user_service) {
        var _id = parseInt($routeParams.user_id);
        $scope.user_orders = {
            "scan": "Scan",
            "plan": "Plan",
            "preview": "Preview",
            "order": "Order"
        };
        user_service.get_patient(_id).then(function(data) {
            data.patient_info.forEach(function(value) {
                if (value.id === _id) {
                    $scope.patient = value;
                }
            });
        });
    }
]);

app.controller('ScanCtrl', ['$scope', '$routeParams',
    function($scope, $routeParams) {
        var links = {
            "nose": "Nose",
            "ear": "Ear",
            "mouth": "Mouth",
            "mask": "Mask",
            "cpap": "CPAP"
        };
        $scope.patient = {};
        $scope.patient.id = $routeParams.user_id;
        $scope.links = links;
    }
]);

app.controller('UploadCtrl', ['$scope', '$routeParams', 'upload_service',
    function($scope, $routeParams, upload_service) {
        $scope.type = $routeParams.scan_type;
        $scope.loading = "hidden";
        $scope.uploadScans = function(scans) {
            $scope.loading = "show";
            upload_service.upload_scans(scans, $routeParams.user_id, $routeParams.scan_type).then(function(data){
                $scope.loading="hidden";
                $scope.upload_completed = "Upload Completed!";
            });
        };
    }
]);

app.controller('EditCtrl', ['$scope', '$routeParams', 'user_service',
    function($scope, $routeParams, user_service) {
    	var _id = $routeParams.user_id;
    	user_service.get_patient(_id).then(function(data){
    		$scope.user_info = data.patient_info[0];
    		$scope.user_info.gender = data.patient_info[0].gender.toUpperCase();
    	});
    }
]);

app.controller('PreviewCtrl', ['$scope', '$routeParams', function($scope, $routeParams){
    
}])