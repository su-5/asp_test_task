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

            ////groupOfDocument
            $stateProvider.state("mainPage/groupOfDocument", {
                url: "/groupOfDocument",
                templateUrl: function () { return 'Angular/catalogs/groupOfDocument/groupOfDocument.html?' + new Date(); },
                controller: "groupOfDocumentController",
              //  roles: "Admin_MZX;Admin_ZBT;Supervisor;Payment"
            });

            $urlRouterProvider.otherwise("/albums");
        }]);
})();