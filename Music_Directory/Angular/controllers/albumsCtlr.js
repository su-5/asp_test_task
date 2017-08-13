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
        //function openModalWindow(row) {
        //    $scope.asideState = {
        //        open: true
        //    };

        //    function postClose() {
        //        $scope.asideState.open = false;
        //    }
        //    $uibModal.open({
        //        templateUrl: function () {
        //            return 'Angular/modalWindow/goodsModalWin.html?' + new Date();
        //        },
        //        size: 'lg',
        //        controller: ['$rootScope', '$scope', '$uibModalInstance', function ($rootScope, $scope, $uibModalInstance) {
        //            $scope.nameStore = row.Name;
        //            $scope.height = $window.innerHeight - 300 + 'px';

        //            angular.element($window).bind('resize', function () {
        //                $scope.height = $window.innerHeight - 300 + 'px';
        //                $scope.$digest();
        //            });
        //            $scope.gridGoods = {
        //                enableColumnResizing: true,
        //                showGridFooter: false,
        //                enableHorizontalScrollbar: 0,
        //                enableVerticalScrollbar: 1,
        //                enableColumnMenus: false,
        //                showColumnFooter: false,
        //                enableFiltering: true,
        //                gridColumnFooterHeight: 20,
        //                enableRowSelection: true,
        //                enableRowHeaderSelection: false,
        //                noUnselect: true,
        //                multiSelect: false,
        //                rowHeight: 22,
        //                columnDefs: [
        //                    { field: 'Name', width: '60%', displayName: 'Название', cellTemplate: '<p style="margin-left:15px;">{{row.entity.Name}}</p>' },
        //                    { field: 'Description', displayName: 'Описание', cellTemplate: '<p style="margin-left:15px;" >{{row.entity.Description}}</p>' }
        //                ],
        //                onRegisterApi: function (gridApi) {
        //                    $scope.gridApi = gridApi;
        //                    $scope.gridApi.selection.on.rowSelectionChanged($scope, function (row) {
        //                    });
        //                }
        //            };

        //            storesService.getGoodsOfStore(row.Id).then(function (value) {
        //                if (value.length === 0) {
        //                    $scope.cancel();
        //                    bootbox.alert({
        //                        message: "В данном магазине нет товара! :(",
        //                        size: 'small'
        //                    });
        //                } else {
        //                    $rootScope.loadingShow();
        //                    var listGoods = angular.copy(value);
        //                    for (var i = 0; i < listGoods.length; i++) {
        //                        if (listGoods[i].Description == null || listGoods[i].Description == undefined) {
        //                            listGoods[i].Description = "нет описания";
        //                        }
        //                    }

        //                    $scope.gridGoods.data = listGoods;
        //                }



        //            }, function (errorObject) {
        //                $rootScope.toaster('error', errorObject.ExceptionMessage ? errorObject.ExceptionMessage : '' + errorObject.Message, 15000);
        //            }).finally(function () {
        //                $rootScope.loadingHide();
        //            });
        //            $scope.cancel = function () {
        //                $uibModalInstance.dismiss({ $value: 'cancel' });
        //            };
        //        }]
        //    }).result.then(postClose, postClose);

        //}

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
                { field: 'Name', width: '80%', displayName: 'Название', cellTemplate: '<p style="margin-left:15px;">{{row.entity.Name}}</p>' },
                { field: 'Year', displayName: 'Год', cellTemplate: '<p style="margin-left:15px;" >{{row.entity.Year}}</p>' }
            ],

            onRegisterApi: function (gridApi) {
                $scope.gridApi = gridApi;
                $scope.gridApi.selection.on.rowSelectionChanged($scope, function (row) {
                    var selectedRow = row.entity;
                   // openModalWindow(selectedRow);
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