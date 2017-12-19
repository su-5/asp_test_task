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

            // tree
            $stateProvider.state("mainPage/tree", {
                url: "/tree",
                templateUrl: "Angular/views/tree.html",
                controller: "treeController"
            });
            $urlRouterProvider.otherwise("/albums");
        }]);
})();