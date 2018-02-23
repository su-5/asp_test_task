﻿(function () {
    "use strict";

    angular.module("Web.Services", []);
    angular.module("Web.Controllers", []);
    angular.module("Web.Externals", ["ui.router", "ngCookies", "ui.grid", "ui.grid.selection", 'ui.grid.resizeColumns', 'ui.grid.moveColumns', 'ui.grid.cellNav', 'ui.grid.autoResize', 'ui.grid.pagination', 'ui.grid.grouping', 'ui.grid.expandable', 'ui.grid.edit', 'ui.grid.rowEdit', 'ui.grid.saveState', "ngTouch", "ngAnimate", "integralui","kendo.directives"]);

    var app = angular.module("Web", ["Web.Services", "Web.Externals", "Web.Controllers", "ui.bootstrap"]);

    app.run(["$rootScope", "$location", "$http", "$state", "$stateParams", "$sce", "loadingService",
        function ($rootScope, $location, $http, $state, $stateParams, $sce, loadingService) {
            $rootScope.loadingShow = function () {
                $rootScope.loadingIsShow = loadingService.show(); // loading show
            };

            $rootScope.loadingHide = function () {
                $rootScope.loadingIsShow = loadingService.hide();
            };
        }
    ]);

})();