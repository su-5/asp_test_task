(function () {
    "use strict";

    // controller class definintion

    var groupOfDocumentController = function ($scope, $rootScope, groupOfDocumentService, IntegralUITreeViewService, $window, $uibModal, $timeout) {
        $scope.currentPage = "Комплект документов";
        // $rootScope.loadingShow();

        // регулеговка страницы по высоте
        $scope.heightBlock = $window.innerHeight - 300;
        $scope.heightGrid = ($window.innerHeight - 310) / 2 + 'px';

        angular.element($window).bind('resize', function () {

            if ($window.innerHeight < 735) {
                $scope.heightBlock = 390;
                $scope.heightGrid = 105 + 'px';
            } else {
                $scope.heightBlock = $window.innerHeight - 300;
                $scope.heightGrid = ($window.innerHeight - 310) / 2 + 'px';
            }
            $scope.$digest();
        });

        // получаем параметры бухгалтерского учета
        //groupOfDocumentService.getAccountingParameters().then(function (data) {
        //    $scope.AccountingParameters = angular.copy(data);
        //    $scope.AccountingParameters = $scope.AccountingParameters.reverse();
        //},

        //    function (errorObject) {
        //        $rootScope.toaster('error', errorObject.ExceptionMessage, 15000);
        //    }).finally(function () {
        //    });      

        $scope.treeName = "treeSample";
        $scope.data = [];
        $scope.customItems = [];

        //  initTheme($scope, IntegralUITreeViewService, $scope.treeName);

        $scope.customItemTemplate = { url: "'item-template.html'" };

        var changeExpandBox = function (item) {
            if (item && item.templateObj)
                item.templateObj.expandBox = item.expanded != false ? 'item-expand-box item-expand-box-close' : 'item-expand-box item-expand-box-open';
        }

        var expandBoxClick = function (obj) {
            if (obj) {
                var item = IntegralUITreeViewService.findItemById($scope.treeName, obj.itemId);
                if (item) {
                    IntegralUITreeViewService.toggle($scope.treeName, item);
                }
            }
        }

        $scope.onAfterCollapse = function (e) {
            if (e.item)
                changeExpandBox(e.item);
        }

        $scope.onAfterExpand = function (e) {
            if (e.item)
                changeExpandBox(e.item);
        }

        var trashClick = function (obj) {
            if (obj) {
                var item = IntegralUITreeViewService.findItemById($scope.treeName, obj.itemId);
                if (item) {
                    IntegralUITreeViewService.removeItem($scope.treeName, item);
                    updateExpandBoxAppearance();
                    updateItemSubText();
                }
            }
        }

        var editClick = function (obj) {
            if (obj) {
                obj.edit = true;
                obj.editText = obj.text;
            }
        }

        var editorKeyDown = function (e, obj) {
            switch (e.keyCode) {
                case 13: // ENTER
                    obj.text = obj.editText;
                    obj.edit = false;
                    break;

                case 27: // ESCAPE
                    obj.edit = false;
                    break;
            }
        }

        var editorLostFocus = function (obj) {
            if (obj)
                obj.edit = false;
        }

        var objEvents = {
            expandBoxClick: function (obj) { return expandBoxClick(obj) },
            editClick: function (obj) { return editClick(obj) },
            editorKeyDown: function (e, obj) { return editorKeyDown(e, obj) },
            editorLostFocus: function (obj) { return editorLostFocus(obj) },
            addChild: function (obj) { return addChild(obj) }
        }

        var isThereVisibleChildren = function () {
            var found = false;

            var list = IntegralUITreeViewService.getFlatList($scope.treeName, true);
            if (list) {
                for (var i = 0; i < list.length; i++) {
                    if (list[i].items && list[i].items.length > 0) {
                        found = true;
                        break;
                    }
                }
            }

            return found;
        }

        var updateExpandBoxAppearance = function () {
            var isThereChildren = isThereVisibleChildren();
            var list = IntegralUITreeViewService.getFlatList($scope.treeName, true);
            if (list) {
                for (var i = 0; i < list.length; i++) {
                    if (list[i].items && list[i].items.length > 0)
                        changeExpandBox(list[i]);
                    else
                        list[i].templateObj.expandBox = isThereChildren ? 'item-expand-box' : '';
                }
            }
        }

        var updateItemSubText = function () {
            var list = IntegralUITreeViewService.getFlatList($scope.treeName, true);
            if (list) {
                for (var i = 0; i < list.length; i++) {
                    var currentItem = list[i];
                    var numFolders = 0;
                    var numFiles = 0;

                    if (currentItem.items && currentItem.items.length > 0) {
                        for (var k = 0; k < currentItem.items.length; k++) {
                            var childItem = currentItem.items[k];
                            if (childItem.items && childItem.items.length > 0)
                                numFolders++;
                            else
                                numFiles++;
                        }

                        var itemSubText = "( ";
                        if (numFolders > 0 && numFiles > 0) {
                            itemSubText += numFolders + " папка";
                            if (numFolders > 1)
                                itemSubText += "а";
                            itemSubText += " и " + numFiles + " файл";
                            if (numFiles > 1)
                                itemSubText += "а";
                        }
                        else if (numFolders > 0) {
                            itemSubText += numFolders + " папка";
                            if (numFolders > 1)
                                itemSubText += "а";
                        }
                        else if (numFiles > 0) {
                            itemSubText += numFiles + " файл";
                            if (numFiles > 1)
                                itemSubText += "а";
                        }

                        itemSubText += " )";

                        list[i].templateObj.subText = itemSubText;
                    }
                    else
                        list[i].templateObj.subText = '';
                }
            }
        }
        var getCurrentSelection = function () {

            return IntegralUITreeViewService.selectedItem($scope.treeName);

        }

        var createNewItem = function (data,id) {
            var object =
                {
                    id: id,
                    // pid: 2,
                    // expanded: obj.ex,
                    //items: addItem(obj.items),
                    templateObj: { itemId: id, text: data.Description, ShortDescription : data.ShortDescription, events: objEvents, expandBox: "item-expand-box" }
                };
            return object;

        }

        var rr = {
            id: 100,

            templateObj: { itemId: 100, text: "Favorites", events: objEvents, expandBox: "item-expand-box item-expand-box-close" },

            items: [

                { id: 11332, pid: 1020, templateObj: { itemId: 14331, text: "Desktop", events: objEvents } },

                { id: 12334, pid: 1030, templateObj: { itemId: 1442, text: "Downloads", events: objEvents } }

            ]

        }
        var addChild = function (e) {
            $uibModal.open({
                templateUrl: function () { return 'Angular/catalogs/groupOfDocument/modals/AddActivityCategortToTree.html?' + new Date(); },
                size: 'sm',
                scope: $scope,
                controller: ['$rootScope', '$scope', '$uibModalInstance', function ($rootScope, $scope, $uibModalInstance) {

                    $scope.cancel = function () {
                        $uibModalInstance.dismiss({ $value: 'cancel' });
                    };

                    $scope.addActivityCategory = function (activityCategory, form) {
                        if (!form.$valid) {
                            return;
                        }

                        var element = IntegralUITreeViewService.selectedItem($scope.treeName);
                        if (element.templateObj.expandBox === 'item-expand-box') {
                            element.templateObj.expandBox = "item-expand-box item-expand-box-close";
                            element.expanded = true;
                        }

                        groupOfDocumentService.addActivityCategory(activityCategory).then(function (activityCategoryId) {
                           // $rootScope.toaster('success', "Вид деятельности успешно добавлен!", 15000);
                            $scope.cancel();
                            IntegralUITreeViewService.addItem($scope.treeName, createNewItem(activityCategory,activityCategoryId), getCurrentSelection());
                        },
                           // прописать ф-цию редактирования
                            //  var list = IntegralUITreeViewService.getFlatList($scope.treeName, true);
                            //  IntegralUITreeViewService.clearItems($scope.treeName); //($scope.treeName, list);
                            // IntegralUITreeViewService.loadData($scope.treeName, list);
                            // IntegralUITreeViewService.ItemAdded(е);
                            function (errorObject) {
                                $rootScope.toaster('error', errorObject.ExceptionMessage, 15000);
                            }).finally(function () {
                                $rootScope.loadingHide();
                            });
                    }

                }]
            });

        }
        // формируем обьект под новые требования
        function createItem(obj) {
            var object =
                {
                    id: obj.id,
                    // pid: obj.pid,
                    expanded: obj.expanded,
                    items: addItem(obj.items),
                    templateObj: { text: obj.text, events: objEvents }
                };
            return object;
        }

        function addItem(objData) {
            if (objData == null) {
                return null;
            }
            var items = [];
            for (var j = 0; j < objData.length; j++) {
                var branch = createItem(objData[j]);
                items.push(branch);
            }
            return items;
        }
        //  groupOfDocumentService.getActivitiCategory().then(function (data) {
        //var objData = angular.copy(data);
        //for (var e = 0; e < objData.length; e++) {
        //    var branch = createItem(objData[e]);
        //    $scope.customItems.push(branch);
        //}


        // return $scope.customItems;


        $scope.blockDocs = true;
        $scope.blockActivity = true;// блок тревью on


        $scope.customItems = [

            {

                id: 1,

                templateObj: { itemId: 1, text: "Favorites", events: objEvents },

                items: [

                    { expanded:false, id: 11, pid: 1, templateObj: { itemId: 11, text: "Desktop", events: objEvents } },

                    { id: 12, pid: 1, templateObj: { itemId: 12, text: "Downloads", events: objEvents } }

                ]

            },

            {

                id: 2,

                templateObj: { itemId: 2, text: "Libraries", events: objEvents },

                items: [

                    {

                        id: 21,

                        pid: 2,

                        templateObj: { itemId: 21, text: "Documents", events: objEvents }, expanded: false,

                        items: [

                            { id: 211, pid: 21, templateObj: { itemId: 211, text: "My Documents", events: objEvents } },

                            { id: 212, pid: 21, templateObj: { itemId: 212, text: "Public Documents", events: objEvents } }

                        ]

                    },

                    { id: 22, pid: 2, templateObj: { itemId: 22, text: "Music", events: objEvents } },

                    { id: 23, pid: 2, templateObj: { itemId: 23, text: "Pictures", events: objEvents } },

                    { id: 24, pid: 2, templateObj: { itemId: 24, text: "Videos", events: objEvents } }

                ]

            },

            {

                id: 3,

                templateObj: { itemId: 3, text: "Computer", events: objEvents },

                expanded: false,

                items: [

                    { id: 31, pid: 3, templateObj: { itemId: 31, text: "Local Disk (C:)", events: objEvents } },

                    { id: 32, pid: 3, templateObj: { itemId: 32, text: "Storage (D:)", events: objEvents } }

                ]

            },

            { id: 4, templateObj: { itemId: 4, text: "Network", events: objEvents } },

            { id: 5, templateObj: { itemId: 5, text: "Recycle Bin", events: objEvents } }

        ];

        var initTimer = $timeout(function () {
            IntegralUITreeViewService.loadData($scope.treeName, $scope.customItems);

            $timeout.cancel(initTimer);
        }, 1);

        $scope.onUpdateComplete = function () {
            updateExpandBoxAppearance();
            updateItemSubText();
        }

        $scope.showButtonsOnHover = false;
        $scope.toggleButtons = function () {
            $scope.showButtonsOnHover = !$scope.showButtonsOnHover;

            var list = IntegralUITreeViewService.getFlatList($scope.treeName, true);
            if (list) {
                for (var i = 0; i < list.length; i++) {
                    list[i].templateObj.showButtonsOnHover = $scope.showButtonsOnHover;
                    list[i].templateObj.showButtons = !$scope.showButtonsOnHover;
                }
            }
        }
        // пример данных тревью ('text' - должен быть с маленькой буквы)
        //var   datas = [{text: "PC"},{id: 2,text: "Xbox One"},{id: 3,text: "PlayStation"}];



        // выбод информации в первый блок
        //  IntegralUITreeViewService.suspendLayout($scope.treeName);
        //  IntegralUITreeViewService.addItem($scope.treeName, $scope.treeViewData, null);
        //  IntegralUITreeViewService.resumeLayout($scope.treeName);
        //trreeview template
        //  $scope.customItemTemplate = { url: "'item-template-treeview.html'" };
        //  },
        //function (errorObject) {
        //    $rootScope.toaster('error', errorObject.ExceptionMessage, 15000);
        //}).finally(function () {
        //    $scope.loadingInfoData = false;
        //    $rootScope.loadingHide();
        //});

        $scope.treeEvents = {
            afterSelect: function (e) {
                var flag = false;
                for (var key in e.item) {
                    if (e.item.hasOwnProperty(key)) {
                        if (key === "items") {
                            if (e.item[key] == null) {
                                flag = true;
                            }
                            break;
                        }
                    }
                }

                if (flag) {
                    $scope.blockDocs = false;
                    $rootScope.loadingShow();
                    groupOfDocumentService.getGroupDocument(e.item.id).then(function (data) {
                        $scope.kitDocuments = angular.copy(data);
                        $scope.gridOptionskitDocuments.data = $scope.kitDocuments;
                    },
                        function (errorObject) {
                            $rootScope.toaster('error', errorObject.ExceptionMessage, 15000);
                        }).finally(function () {
                            $rootScope.loadingHide();
                        });
                }

            }
        }


        // добавление нового вида деетельности
        $scope.addActivityCaregor = function () {
            $uibModal.open({
                templateUrl: function () { return 'Angular/catalogs/groupOfDocument/modals/AddActivityCategor.html?' + new Date(); },
                size: 'sm',
                scope: $scope,
                controller: ['$rootScope', '$scope', '$uibModalInstance', function ($rootScope, $scope, $uibModalInstance) {

                    $scope.cancel = function () {
                        $uibModalInstance.dismiss({ $value: 'cancel' });
                    };

                    $scope.addActivityCategory = function (activityCategory, form) {
                        if (!form.$valid) {
                            return;
                        }
                        groupOfDocumentService.addActivityCategory(activityCategory).then(function (data) {
                            $rootScope.toaster('success', "Вид деятельности успешно добавлен!", 15000);
                            $scope.cancel();
                        },
                            function (errorObject) {
                                $rootScope.toaster('error', errorObject.ExceptionMessage, 15000);
                            }).finally(function () {
                                $rootScope.loadingHide();
                            });
                    }

                }]
            });
        }

        //блокировка - разблокировка кнопок
        $scope.saveDocd = true;
        $scope.optionsBtn = function (btn) {
            if (btn === 'editDocs') {
                $scope.saveDocd = false;
            } else {
                //if (bnb === ) {

                //}
            }
        }

        //добавление нового документа в комплект документов
        $scope.addNewDocument = function () {
            $uibModal.open({
                templateUrl: function () { return 'Angular/catalogs/groupOfDocument/modals/addNewDocumentToGroupOfDocuments.html?' + new Date(); },
                //  size: 'sm',
                scope: $scope,
                controller: ['$rootScope', '$scope', '$uibModalInstance', function ($rootScope, $scope, $uibModalInstance) {

                    $scope.cancel = function () {
                        $uibModalInstance.dismiss({ $value: 'cancel' });
                    };

                    $scope.addActivityCategory = function (activityCategory, form) {
                        if (!form.$valid) {
                            return;
                        }
                        groupOfDocumentService.addActivityCategory(activityCategory).then(function (data) {
                            $rootScope.toaster('success', "Вид деятельности успешно добавлен!", 15000);
                            $scope.cancel();
                        },
                            function (errorObject) {
                                $rootScope.toaster('error', errorObject.ExceptionMessage, 15000);
                            }).finally(function () {
                                $rootScope.loadingHide();
                            });
                    }

                }]
            });
        }

        // добавление нового типа документа
        $scope.addDocumentType = function () {
            $uibModal.open({
                templateUrl: function () { return 'Angular/catalogs/groupOfDocument/modals/AddDocumentType.html?' + new Date(); },
                size: 'sm',
                scope: $scope,
                controller: ['$rootScope', '$scope', '$uibModalInstance', function ($rootScope, $scope, $uibModalInstance) {

                    $scope.cancel = function () {
                        $uibModalInstance.dismiss({ $value: 'cancel' });
                    };
                    $scope.addNewDocumentType = function (documentType, form) {
                        if (!form.$valid) {
                            return;
                        }
                        groupOfDocumentService.addNewDocumentType(documentType).then(function (data) {
                            $rootScope.toaster('success', "Тип документа успешно добавлен!", 15000);
                            $scope.cancel();
                        },
                            function (errorObject) {
                                $rootScope.toaster('error', errorObject.ExceptionMessage, 15000);
                            }).finally(function () {
                                $rootScope.loadingHide();
                            });
                    }

                }]
            });
        }


        $scope.gridOptionskitDocuments = {
            enableColumnResizing: true,
            enableColumnMenus: false,
            showGridFooter: false,
            enableHorizontalScrollbar: 0,
            enableVerticalScrollbar: 1,
            showColumnFooter: false,
            enableFiltering: true,
            selectionRowHeaderWidth: 35,
            enableRowSelection: false,
            enableSelectAll: false,
            multiSelect: false,
            rowHeight: 22,
            headerRowHeight: 25,
            minRowsToShow: 35,
            columnDefs: [
                { name: 'Name', displayName: 'Тип документа', width: 100, enableFiltering: false, headerTooltip: true },
                { name: 'AccountingParam', width: 390, displayName: 'Параметры', enableFiltering: false, headerTooltip: true, cellTemplate: 'Angular/catalogs/groupOfDocument/templates/accountingParam.html?' + new Date() },
                {
                    field: 'buttons_edit_del',
                    displayName: '',
                    visible: true,
                    // width: '6%',
                    cellTemplate: "<div class=\"ui-grid-cell-contents\" align=\"center\">" +
                    //"<button type=\"button\" class=\"btn btn-default btn-xs\" style=\"height: 20px; width: 24px;\" ng-click=\"grid.appScope.update(row.entity)\" uib-tooltip=\"{{grid.appScope.placement.update}}\" ng-disabled=\"isAdding\"><span class=\"ng-buttons glyphicon glyphicon-pencil\"></span></button>" +
                    "<button type=\"button\" class=\"btn btn-danger btn-xs\" style=\"margin-left: 4px; margin-right: 4px; height: 20px; width: 24px;\" ng-click=\"grid.appScope.delete(row.entity.Id)\" uib-tooltip=\"{{grid.appScope.placement.delete}}\" ng-disabled=\"grid.appScope.saveDocd\" ng-disabled=\"isAdding\"><span class=\"ng-buttons glyphicon glyphicon-trash\"></span></button>" +
                    "</div>",
                    filterHeaderTemplate: "<div align=\"center\"style=\"margin-top: -21px;\"><button ng-disabled=\"grid.appScope.saveDocd\"  type=\"button\" class=\"btn btn-xs btn-primary\" style=\"margin-left: 4px;\" tooltip-placement=\"left\" uib-tooltip=\"Добавить запись\" ng-click=\"grid.appScope.addNewDocument()\" ><span class=\"glyphicon glyphicon-plus\"></span></button></div>",
                    enableCellEdit: false,
                    enableFiltering: true,
                    enableSorting: false,
                    showSortMenu: false,
                    enableColumnMenu: false
                }
            ]
        };


        $scope.$on("$destroy", function () {
            angular.element($window).off();
        });
    };

    // register your controller into a dependent module 
    angular
        .module("Web.Controllers")
        .controller("groupOfDocumentController", ["$scope", "$rootScope", "groupOfDocumentService", "IntegralUITreeViewService", "$window", "$uibModal", "$timeout", groupOfDocumentController]);

})();
