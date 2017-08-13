(function () {
    "use strict";

    angular
        .module("Web")
        .config(["$stateProvider", "$urlRouterProvider", "$locationProvider", function ($stateProvider, $urlRouterProvider, $locationProvider) {
            // Index
            $stateProvider.state("mainPage/albums", {
                url: "/albums",
                templateUrl: "Angular/views/albums.html",
                controller: "albumsController"
            });
            $urlRouterProvider.otherwise("/albums");
        }]);
})();