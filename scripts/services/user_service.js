"use strict";

var user = angular.module("user_module", ['ngCookies']);

user.factory("user_service", ["$rootScope", "$http", "$q", "$cookieStore", "$location", "myJson",
    function($root, $http, $q, cookies, $location, myJson ) {

        var _logoutSuccess = function() {
            localStorage.removeItem("current_user");
        };

        var _loginSuccess = function(data) {
            var userObj = {
                "id": data.user.objectId,
                "email": data.user.email,
            };

            localStorage.setItem("current_user", JSON.stringify(userObj));
            $root.$broadcast("login-success");
        };

        var get_patient = function(id){
            return _ajax(myJson.patient_list, "GET", id);
        };

        var createUser = function(user) {
            _ajax(myJson.createUser, "POST", user).then(function(response) {
                _loginSuccess(response);
            });
        };

        //Login user to parse, retrieve session token and store in cookie
        var loginUser = function(user) {
            _ajax(myJson.user, "GET", user).then(function(data) {
                if (user.email === data.user.email && user.password === data.user.password) {
                    $location.path("/patient-list");
                }
                // _loginSuccess(response.data);
            }, function(status) {
                console.log(status);
            });
        };

        // Destroy cookie and logout user from parse
        var logoutUser = function() {
            var current_user = JSON.parse(localStorage.getItem("current_user"));
            if (Object.keys(current_user).length === 0) {
                _logoutSuccess();
                return false;
            }

            var session = {
                "session": current_user.session
            };
            _ajax(myJson.logoutUser, "POST", session).then(function() {
                _logoutSuccess();
            });
        };

        var isLoggedIn = function() {
            var loggedIn = false;
            if (localStorage.getItem("current_user")) {
                loggedIn = true;
            }
            return loggedIn;
        };

        var get_patients_list = function(user) {
            return _ajax(myJson.patient_list, "GET", user);
        };

        var _ajax = function(url, method, data) {
            var defer = $q.defer();
            $http({
                url: url,
                method: method,
                data: data,
            }).success(function(data) {
                defer.resolve(data);
            }).error(function(s, r) {
                console.log(r);
            });
            return defer.promise;
        };

        return {
            'createUser': createUser,
            'loginUser': loginUser,
            'isLoggedIn': isLoggedIn,
            'logoutUser': logoutUser,
            "get_patients_list": get_patients_list,
            "get_patient" : get_patient
        };
    }
]);