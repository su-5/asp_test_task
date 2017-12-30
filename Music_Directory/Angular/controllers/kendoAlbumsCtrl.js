(function () {
    "use strict";

    // controller class definintion
    var kendoAlbumsController = function ($scope, $rootScope, albumService, uiGridConstants, $window, $uibModal, $state) {
        $rootScope.loadingShow();

        $scope.openTreePage = function () {
            $state.go("mainPage/tree");
        }

        $scope.openDoksPage = function () {
            $state.go("mainPage/groupOfDocument");
        }

        $scope.openAlbums = function () {
            $state.go("mainPage/albums");
        }
        //openAlbums
        //фильтр по таблице
        var filter = {
            operator: "contains",
            template: function (args) {
                args.element.css("width", "100%").css("height", "25px").addClass("k-textbox").keydown(function (e) {
                    setTimeout(function () {
                        $(e.target).trigger("change");
                    });
                });
            },
            showOperators: false
        }

        //инициализация грида mainGridOptions
        $scope.mainGridOptions = {
            dataSource: new kendo.data.DataSource({
                data: $scope.data,
                batch: true,
                autoSync: false,
                schema: {
                    model: {
                        id: "ProductID"
                    }
                }
            }),
           
        
            height: 590,
            filterable: { mode: "row" },
            selectable: "row",
            persistSelection: true,
            sortable: true,
            resizable: false,
            columns: [
                {
                    field: "Name",
                    title: "Альбом",
                    width: "21%",
                    attributes: {
                        "class": "position-text"
                    },
                    filterable: {
                        cell: filter
                    }
                }, {
                    field: "Year",
                    title: "Год",
                    width: "21%",
                    attributes: {
                        "class": "position-text"
                    },
                    filterable: {
                        cell: filter
                    }
                },
               
                { command: ["edit", "destroy"], title: "&nbsp;", width: "250px" }
            ], editable: "popup"
        };
    


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
                        $scope.comboBoxOptions[i] = years--;
                    }
                    $scope.AlbumYears = $scope.comboBoxOptions[0];

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


                    $scope.addAlbum = function () {
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

            albumService.getListAlbums().then(function (value) {
                var listAlbums = angular.copy(value);
                $scope.mainGridOptions.dataSource.data(listAlbums);
                   // $scope.data = listAlbums;
                },
                function (errorObject) {
                    $rootScope.toaster('error', errorObject.ExceptionMessage, 15000);
                }).finally(function () {
                $rootScope.loadingHide();
            });
        }
        albumsLoading();
    };

    // register your controller into a dependent module 
    angular
        .module("Web.Controllers")
        .controller("kendoAlbumsController", ["$scope", "$rootScope", "albumService", "uiGridConstants", "$window", "$uibModal", "$state", kendoAlbumsController]);

})();