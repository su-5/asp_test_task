(function () {
    "use strict";

    // controller class definintion
    var albumsController = function ($scope, $rootScope, albumService, uiGridConstants, $window, $uibModal, $state) {
        $rootScope.loadingShow();
        $scope.mh = $window.innerHeight - 160 + 'px';

        angular.element($window).bind('resize', function () {
            $scope.mh = $window.innerHeight - 160 + 'px';
            $scope.$digest();
        });

        $scope.openTreePage = function() {
            $state.go("mainPage/tree");
        }

        albumsLoading();

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
                    $scope.height = $window.innerHeight - 350 + 'px';

                    angular.element($window).bind('resize', function () {
                        $scope.height = $window.innerHeight - 350 + 'px';
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

        //Modal Window Add New Album
        $scope.windowAddNewAlbum = function () {
            $scope.asideState = {
                open: true
            };

            function postClose() {
                $scope.asideState.open = false;
            }
            $uibModal.open({
                templateUrl: function () {
                    return 'Angular/modalWindows/addNewAlbum.html?' + new Date();
                },
                size: 'lg',
                controller: ['$rootScope', '$scope', '$uibModalInstance', function ($rootScope, $scope, $uibModalInstance) {
                    $scope.height = $window.innerHeight - 350 + 'px';

                    angular.element($window).bind('resize', function () {
                        $scope.height = $window.innerHeight - 350 + 'px';
                        $scope.$digest();
                    });

                    var years = 2017;
                    $scope.comboBoxOptions = [];
                    for (var i = 0; i < 150; i++) {
                        $scope.comboBoxOptions[i] = years --;
                    }
                    $scope.AlbumYears =  $scope.comboBoxOptions[0];

                    $scope.gridTracksforTheNewalbum = {
                        enableColumnResizing: true,
                        showGridFooter: false,
                        enableHorizontalScrollbar: 0,
                        enableVerticalScrollbar: 2,
                        enableColumnMenus: false,
                        showColumnFooter: true,
                        enableFiltering: true,
                        enableRowSelection: true,
                        enableSelectAll: true,
                        multiSelect: true,
                        enableRowHeaderSelection: true,
                        noUnselect: false,
                        enableSorting: true,
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

                    albumService.getAllTracks().then(function (value) {
                        $rootScope.loadingShow();
                        var listTracks = angular.copy(value);
                        $scope.gridTracksforTheNewalbum.data = listTracks;
                    }, function (errorObject) {
                        $rootScope.toaster('error', errorObject.ExceptionMessage ? errorObject.ExceptionMessage : '' + errorObject.Message, 15000);
                    }).finally(function () {
                        $rootScope.loadingHide();
                        });

                    $scope.cancel = function () {
                        $uibModalInstance.dismiss({ $value: 'cancel' });
                    };

                  
                    $scope.addAlbum = function() {
                        var getSelectedRows = $scope.gridApi.selection.getSelectedRows();
                        albumService.addAlbum($scope.NameAlbum, $scope.AlbumYears, getSelectedRows).then(function (value) {
                            $scope.cancel();
                            alert("Альбом успешно добавлен");
                            albumsLoading();
                        }, function (errorObject) {
                            $rootScope.toaster('error', errorObject.ExceptionMessage ? errorObject.ExceptionMessage : '' + errorObject.Message, 15000);
                        }).finally(function () {
                            $rootScope.loadingHide();
                        });
                    }
                }]
            }).result.then(postClose, postClose);

        }


        function albumsLoading() {
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
                    { field: 'Name', width: '95%', displayName: 'Название альбома', cellTemplate: '<p style="margin-left:15px;">{{row.entity.Name}}</p>' },
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
        }
       
    };

    // register your controller into a dependent module 
    angular
        .module("Web.Controllers")
        .controller("albumsController", ["$scope", "$rootScope", "albumService", "uiGridConstants", "$window", "$uibModal","$state", albumsController]);

})();