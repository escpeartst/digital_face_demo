'use strict';

var app = angular
    .module('ivanChicchonAngularWebApp', [
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngTouch',
        'user_module',
        'ngFileUpload',
        'upload_module'
    ]);

app.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'views/main.html',
            controller: 'MainCtrl',
            controllerAs: 'main'
        })
        .when('/about', {
            templateUrl: 'views/about.html',
            controller: 'AboutCtrl',
            controllerAs: 'about'
        })
        .when("/sign-up", {
            templateUrl: 'views/signup.html',
            controller: "MainCtrl",
            controllerAs: 'signup'
        })
        .when("/patient-list", {
            templateUrl: 'views/patientOrderList.html',
            controller: "PatientCtrl",
            controllerAs: 'patientOrders'
        })
        .when("/patient/:user_id", {
            templateUrl: 'views/patient.html',
            controller: "PatientUserCtrl"
        })
        .when("/scan/:user_id", {
            templateUrl: 'views/scanHome.html',
            controller: "ScanCtrl"
        })
        .when("/scan/:user_id/:scan_type", {
            templateUrl: 'views/scanUpload.html',
            controller: "UploadCtrl"
        })
        .when("/plan/:user_id", {
            template: "<div class='jumbotron text-center'><h3>Plans coming soon! Please check back </h3></div>"
        })
        .when("/preview/:user_id", {
            templateUrl: "views/previewScans.html",
            controller: "PreviewCtrl"
        })
        .when("/order/:user_id", {
            templateUrl: "views/orderView.html",
            controller: ['$scope', '$routeParams', '$location',
                function($scope, $routeParams, $location) {
                    $scope.submit = function(instruct) {
                        if (instruct === 'cancel') {
                            alert("Your order has been cancelled");
                        }
                        if(instruct === 'order'){
                          alert("Your order has been submitted, Thank you");
                        }

                        $location.path("/patient/"+$routeParams.user_id);
                    }
                }
            ]
        })
        .when('/patient/edit/:user_id', {
            templateUrl: 'views/edit.html',
            controller: 'EditCtrl',
            controllerAs: 'edit'
        })
        .otherwise({
            redirectTo: '/'
        });
});
app.constant('myUrl', settings.get_params());
app.constant('myJson', settings.get_mock_data());