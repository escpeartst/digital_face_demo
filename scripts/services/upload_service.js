"use strict";

var app = angular.module('upload_module', []);

app.factory('upload_service', ['$http', '$q', 'myUrl', 'Upload',
    function($http, $q, myUrl, Upload) {

        var upload_scans = function(files, user_id, type) {
            return __ajax(myUrl.upload + "upload.php", "POST", user_id, files, type);
        };

        var __ajax = function(url, method, user_id, files, type, callback) {
            var defer = $q.defer();
            var formData = new FormData();
            formData.append('file', files);
            formData.append('userid', user_id);
            Upload.upload({
                url: url,
                data: {
                    file: files,
                    userid: user_id,
                    type: type
                }
            }).success(function(data) {
                if (typeof callback === 'function') {
                    callback();
                }
                defer.resolve(data);
            }).error(function(s) {
                console.log(s);
            });
            return defer.promise;
        };

        return {
            "upload_scans": upload_scans
        };
    }
]);