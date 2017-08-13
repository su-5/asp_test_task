(function() {
    "use strict";

    function albumService($cookies, $http, $rootScope, $q) {
        this.getListAlbums = function() {
            var deferred = $q.defer();
            $http.get('api/album/GetAlbums')
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function onError(response) {
                    deferred.reject(response.data);
                });

            return deferred.promise;
        };
        
    


    this.getTracksFromAlbum = function (albumId) {
            var deferrred = $q.defer();
            $http.get("api/track/getTracksFromAlbum?id= " + albumId).success(function (data) {
                deferrred.resolve(data);
            }).error(function (data) {
                deferrred.reject(data);
            });
            return deferrred.promise;
        };


    };

    angular
        .module("Web.Services")
        .service("albumService", ["$cookies", "$http", "$rootScope", "$q", albumService]);

})();