(function () {
    "use strict";

    // controller class definintion
    var albumsController = function ($scope, $rootScope, albumService, uiGridConstants, $window, $uibModal, IntegralUITreeViewService,$timeout) {

        //$scope.treeName = "treeSample";
        //$scope.data = [];

        //initTheme($scope, IntegralUITreeViewService, $scope.treeName);

        //$scope.customItemTemplate = { url: "'item-template.html'" };

        //var changeExpandBox = function (item) {
        //    if (item && item.templateObj)
        //        item.templateObj.expandBox = item.expanded != false ? 'item-expand-box item-expand-box-close' : 'item-expand-box item-expand-box-open';
        //}

        //var expandBoxClick = function (obj) {
        //    if (obj) {
        //        var item = IntegralUITreeViewService.findItemById($scope.treeName, obj.itemId);
        //        if (item) {
        //            IntegralUITreeViewService.toggle($scope.treeName, item);
        //        }
        //    }
        //}

        //$scope.onAfterCollapse = function (e) {
        //    if (e.item)
        //        changeExpandBox(e.item);
        //}

        //$scope.onAfterExpand = function (e) {
        //    if (e.item)
        //        changeExpandBox(e.item);
        //}

        //var trashClick = function (obj) {
        //    if (obj) {
        //        var item = IntegralUITreeViewService.findItemById($scope.treeName, obj.itemId);
        //        if (item) {
        //            IntegralUITreeViewService.removeItem($scope.treeName, item);
        //            updateExpandBoxAppearance();
        //            updateItemSubText();
        //        }
        //    }
        //}

        //var editClick = function (obj) {
        //    if (obj) {
        //        obj.edit = true;
        //        obj.editText = obj.text;
        //    }
        //}

        //var editorKeyDown = function (e, obj) {
        //    switch (e.keyCode) {
        //    case 13: // ENTER
        //        obj.text = obj.editText;
        //        obj.edit = false;
        //        break;

        //    case 27: // ESCAPE
        //        obj.edit = false;
        //        break;
        //    }
        //}

        //var editorLostFocus = function (obj) {
        //    if (obj)
        //        obj.edit = false;
        //}

        //var objEvents = {
        //    expandBoxClick: function (obj) { return expandBoxClick(obj) },
        //    editClick: function (obj) { return editClick(obj) },
        //    editorKeyDown: function (e, obj) { return editorKeyDown(e, obj) },
        //    editorLostFocus: function (obj) { return editorLostFocus(obj) },
        //    trashClick: function (obj) { return trashClick(obj) }
        //}

        //var isThereVisibleChildren = function () {
        //    var found = false;

        //    var list = IntegralUITreeViewService.getFlatList($scope.treeName, true);
        //    if (list) {
        //        for (var i = 0; i < list.length; i++) {
        //            if (list[i].items && list[i].items.length > 0) {
        //                found = true;
        //                break;
        //            }
        //        }
        //    }

        //    return found;
        //}

        //var updateExpandBoxAppearance = function () {
        //    var isThereChildren = isThereVisibleChildren();
        //    var list = IntegralUITreeViewService.getFlatList($scope.treeName, true);
        //    if (list) {
        //        for (var i = 0; i < list.length; i++) {
        //            if (list[i].items && list[i].items.length > 0)
        //                changeExpandBox(list[i]);
        //            else
        //                list[i].templateObj.expandBox = isThereChildren ? 'item-expand-box' : '';
        //        }
        //    }
        //}

        //var updateItemSubText = function () {
        //    var list = IntegralUITreeViewService.getFlatList($scope.treeName, true);
        //    if (list) {
        //        for (var i = 0; i < list.length; i++) {
        //            var currentItem = list[i];
        //            var numFolders = 0;
        //            var numFiles = 0;

        //            if (currentItem.items && currentItem.items.length > 0) {
        //                for (var k = 0; k < currentItem.items.length; k++) {
        //                    var childItem = currentItem.items[k];
        //                    if (childItem.items && childItem.items.length > 0)
        //                        numFolders++;
        //                    else
        //                        numFiles++;
        //                }

        //                var itemSubText = "( ";
        //                if (numFolders > 0 && numFiles > 0) {
        //                    itemSubText += numFolders + " folder";
        //                    if (numFolders > 1)
        //                        itemSubText += "s";
        //                    itemSubText += " and " + numFiles + " file";
        //                    if (numFiles > 1)
        //                        itemSubText += "s";
        //                }
        //                else if (numFolders > 0) {
        //                    itemSubText += numFolders + " folder";
        //                    if (numFolders > 1)
        //                        itemSubText += "s";
        //                }
        //                else if (numFiles > 0) {
        //                    itemSubText += numFiles + " file";
        //                    if (numFiles > 1)
        //                        itemSubText += "s";
        //                }

        //                itemSubText += " )";

        //                list[i].templateObj.subText = itemSubText;
        //            }
        //            else
        //                list[i].templateObj.subText = '';
        //        }
        //    }
        //}

        //$scope.customItems = [
        //    {
        //        id: 1,
        //        expanded: false,
        //        templateObj: { itemId: 1, text: "Favorites", events: objEvents },
        //        items: [
        //            { id: 11, pid: 1, templateObj: { itemId: 11, text: "Desktop", events: objEvents } },
        //            { id: 12, pid: 1, templateObj: { itemId: 12, text: "Downloads", events: objEvents } }
        //        ]
        //    },
        //    {
        //        id: 2,
        //        expanded: false,
        //        templateObj: { itemId: 2, text: "Libraries", events: objEvents },
        //        items: [
        //            {
        //                id: 21,
        //                pid: 2,
        //                templateObj: { itemId: 21, text: "Documents", events: objEvents }, expanded: false,
        //                items: [
        //                    { id: 211, pid: 21, templateObj: { itemId: 211, text: "My Documents", events: objEvents } },
        //                    { id: 212, pid: 21, templateObj: { itemId: 212, text: "Public Documents", events: objEvents } }
        //                ]
        //            },
        //            { id: 22, pid: 2, templateObj: { itemId: 22, text: "Music", events: objEvents } },
        //            { id: 23, pid: 2, templateObj: { itemId: 23, text: "Pictures", events: objEvents } },
        //            { id: 24, pid: 2, templateObj: { itemId: 24, text: "Videos", events: objEvents } }
        //        ]
        //    },
        //    {
        //        id: 3,
        //        templateObj: { itemId: 3, text: "Computer", events: objEvents },
        //        expanded: false,
        //        items: [
        //            { id: 31, pid: 3, templateObj: { itemId: 31, text: "Local Disk (C:)", events: objEvents } },
        //            { id: 32, pid: 3, templateObj: { itemId: 32, text: "Storage (D:)", events: objEvents } }
        //        ]
        //    },
        //    { id: 4, expanded: false, templateObj: { itemId: 4, text: "Network", events: objEvents } },
        //    { id: 5, expanded: false, templateObj: { itemId: 5, text: "Recycle Bin", events: objEvents } }
        //];

        //var initTimer = $timeout(function () {
        //    IntegralUITreeViewService.loadData($scope.treeName, $scope.customItems);

        //    $timeout.cancel(initTimer);
        //}, 1);

        //$scope.onUpdateComplete = function () {
        //    updateExpandBoxAppearance();
        //    updateItemSubText();
        //}

        //$scope.showButtonsOnHover = false;
        //$scope.toggleButtons = function () {
        //    $scope.showButtonsOnHover = !$scope.showButtonsOnHover;

        //    var list = IntegralUITreeViewService.getFlatList($scope.treeName, true);
        //    if (list) {
        //        for (var i = 0; i < list.length; i++) {
        //            list[i].templateObj.showButtonsOnHover = $scope.showButtonsOnHover;
        //            list[i].templateObj.showButtons = !$scope.showButtonsOnHover;
        //        }
        //    }
        //}





        $rootScope.loadingShow();
        $scope.mh = $window.innerHeight - 160 + 'px';

        angular.element($window).bind('resize', function () {
            $scope.mh = $window.innerHeight - 160 + 'px';
            $scope.$digest();
        });

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
        .controller("albumsController", ["$scope", "$rootScope", "albumService", "uiGridConstants", "$window", "$uibModal", "IntegralUITreeViewService", "$timeout", albumsController]);

})();