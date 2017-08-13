(function () {
    "use strict";

    // controller class definintion
    var albumsController = function ($scope, $rootScope, albumService, uiGridConstants, $window, $uibModal) {
        $rootScope.loadingShow();
        $scope.mh = $window.innerHeight - 134 + 'px';

        angular.element($window).bind('resize', function () {
            $scope.mh = $window.innerHeight - 134 + 'px';
            $scope.$digest();
        });

        //Modal Window
        function openModalWindow(row) {
            $scope.asideState = {
                open: true
            };

            function postClose() {
                $scope.asideState.open = false;
            }
            $uibModal.open({
                templateUrl: function () {
                    return 'Angular/modalWindows/trackModalWin.html?' + new Date();
                },
                size: 'lg',
                controller: ['$rootScope', '$scope', '$uibModalInstance', function ($rootScope, $scope, $uibModalInstance) {
                    $scope.nameAlbum = row.Name;
                    $scope.height = $window.innerHeight - 300 + 'px';

                    angular.element($window).bind('resize', function () {
                        $scope.height = $window.innerHeight - 300 + 'px';
                        $scope.$digest();
                    });
                    $scope.gridTrack = {
                        enableColumnResizing: true,
                        showGridFooter: false,
                        enableHorizontalScrollbar: 0,
                        enableVerticalScrollbar: 1,
                        enableColumnMenus: false,
                        showColumnFooter: false,
                        enableFiltering: true,
                        gridColumnFooterHeight: 20,
                        enableRowSelection: true,
                        enableRowHeaderSelection: false,
                        noUnselect: true,
                        multiSelect: false,
                        rowHeight: 22,
                        columnDefs: [
                            { field: 'Name', width: '40%', displayName: 'Название', cellTemplate: '<p style="margin-left:15px;">{{row.entity.Name}}</p>' },
                            { field: 'Performer', width: '40%', displayName: 'Исполнитель', cellTemplate: '<p style="margin-left:15px;" >{{row.entity.Performer}}</p>' },
                            { field: 'Time', displayName: 'Продолжительность', cellTemplate: '<p style="margin-left:15px;" >{{row.entity.Time}}</p>' }
                        ],
                        onRegisterApi: function (gridApi) {
                            $scope.gridApi = gridApi;
                            $scope.gridApi.selection.on.rowSelectionChanged($scope, function (row) {
                            });
                        }
                    };

                    albumService.getTracksFromAlbum(row.Id).then(function (value) {                       
                            $rootScope.loadingShow();
                           var listTracks = angular.copy(value);
                            $scope.gridTrack.data = listTracks;
                        



                    }, function (errorObject) {
                        $rootScope.toaster('error', errorObject.ExceptionMessage ? errorObject.ExceptionMessage : '' + errorObject.Message, 15000);
                    }).finally(function () {
                        $rootScope.loadingHide();
                    });
                    $scope.cancel = function () {
                        $uibModalInstance.dismiss({ $value: 'cancel' });
                    };
                }]
            }).result.then(postClose, postClose);

        }

        // gridAlbums
        $scope.gridAlbums = {
            enableColumnResizing: true,
            showGridFooter: false,
            enableHorizontalScrollbar: 0,
            enableVerticalScrollbar: 1,
            enableColumnMenus: false,
            showColumnFooter: false,
            enableFiltering: true,
            gridColumnFooterHeight: 20,
            enableRowSelection: true,
            enableRowHeaderSelection: false,
            noUnselect: true,
            multiSelect: false,
            rowHeight: 22,
            columnDefs: [
                { field: 'Name', width: '80%', displayName: 'Название альбома', cellTemplate: '<p style="margin-left:15px;">{{row.entity.Name}}</p>' },
                { field: 'Year', displayName: 'Год', cellTemplate: '<p style="margin-left:15px;" >{{row.entity.Year}}</p>' }
            ],

            onRegisterApi: function (gridApi) {
                $scope.gridApi = gridApi;
                $scope.gridApi.selection.on.rowSelectionChanged($scope, function (row) {
                    var selectedRow = row.entity;
                    openModalWindow(selectedRow);
                });
            }
        };

        albumService.getListAlbums().then(function (value) {
            var listAlbums = angular.copy(value);
            $scope.gridAlbums.data = listAlbums;
        },
            function (errorObject) {
                $rootScope.toaster('error', errorObject.ExceptionMessage, 15000);
            }).finally(function () {
                $rootScope.loadingHide();
            });
    };

    // register your controller into a dependent module 
    angular
        .module("Web.Controllers")
        .controller("albumsController", ["$scope", "$rootScope", "albumService", "uiGridConstants", "$window", "$uibModal", albumsController]);

})();