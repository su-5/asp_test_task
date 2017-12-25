(function () {
    "use strict";

    function groupOfDocumentService($cookies, $http, $rootScope, $q) {
        var service = {};

        service.getActivitiCategory = function () {
            var deferrred = $q.defer();

            $http({ url: 'api/activityCategory/GetTreeActivityCategory', method: "GET" })
                .then(function (response) {
                    deferrred.resolve(response.data);
                }).catch(function onError(response) {
                    deferrred.reject(response.data);
                });
            return deferrred.promise;
        };

        service.getGroupDocument = function (idActivityCategory) {
            var deferrred = $q.defer();
            $http.get('api/activityCategory/getGroupDocument?idActivityCategory=' + idActivityCategory)
                .then(function (response) {
                    deferrred.resolve(response.data);
                }).catch(function onError(response) {
                    deferrred.reject(response.data);
                });
            return deferrred.promise;
        };


        service.getAccountingParameters = function () {
            var deferrred = $q.defer();
            $http.get('api/activityCategory/getAccountingParameters')
                .then(function (response) {
                    deferrred.resolve(response.data);
                }).catch(function onError(response) {
                    deferrred.reject(response.data);
                });
            return deferrred.promise;
        };


            //// addActivityCategory 
        service.addActivityCategory = function (activityCategory) {
            var deferred = $q.defer();
            var data = { "Description": activityCategory.Description, "ShortDescription": activityCategory.ShortDescription }
            $http.post("api/ActivityCategory/AddActivityCategory",data)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function onError(response) {
                    deferred.reject(response.data);
                });
            return deferred.promise;
        };

        //// AddDocumentType 
        service.addNewDocumentType = function (documentType) {
            var deferred = $q.defer();
            var data = { "Name": documentType.Description, "Description": documentType.ShortDescription }
            $http.post("api/document/AddDocumentType", data)
                .success(function (data) {
                    deferred.resolve(data);
                }).
                error(function (data) {
                    deferred.reject(data);
                });
            return deferred.promise;
        };

        //this.addAlbum = function (name, year, trackList) {
        //    var newAlbum = { Album: { 'Name': name, 'Year': year }, TrackList: trackList };
        //    var deferred = $q.defer();
        //    $http.post("api/album/AddNewAlbum", newAlbum)
        //        .then(function (response) {
        //            deferred.resolve(response.data);
        //        }).catch(function onError(response) {
        //            deferred.reject(response.data);
        //        });
        //    return deferred.promise;
        //};

        return service;
    };

    angular
        .module("Web.Services")
        .service("groupOfDocumentService", ["$cookies", "$http", "$rootScope", "$q", groupOfDocumentService]);
})();



