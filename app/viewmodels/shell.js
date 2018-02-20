define(["require", "exports", "knockout", "jquery", "plugins/router"], function (require, exports, ko, jquery, router) {
    "use strict";
    var ShellViewModel = (function () {
        function ShellViewModel() {
            var _this = this;
            this.router = router;
            this.previews = ko.observableArray([]);
            this.currentPage = ko.observable(1);
            this.totalPages = ko.observable(0);
            this.selectedUser = ko.observable(null);
            this.countries = ko.observableArray([]);
            this.pageNumbers = ko.observableArray([]);
            // pagination =ko.observable( new Pagination(this.currentPage(), this.totalPages(), this.pageNumbers(), this.selectedUser())) ;
            this.addNewUser = function () {
                var newUser = {
                    address: "",
                    birthday: "",
                    country: "",
                    email: "",
                    fullInfo: "",
                    fullName: "",
                    id: "",
                    photo: "",
                    profession: "",
                    shortInfo: "",
                };
                console.dir(newUser);
                _this.selectedUser(newUser);
            };
            this.removeSelectedUser = function () {
                if (!_this.canRemoveSelectedUser()) {
                    return null;
                }
                var url = "/api/users/" + _this.selectedUser().id;
                jquery.ajax(url, {
                    type: "delete",
                }).done(function () {
                    _this.loadPreviews(1);
                });
            };
            this.canRemoveSelectedUser = function () {
                return (_this.selectedUser() && _this.selectedUser().id);
            };
            this.getSelectedUser = function (userData) {
                if (!userData.id) {
                    return null;
                }
                var url = "/api/users/" + userData.id;
                jquery.getJSON(url).done(function (response) {
                    console.dir(response);
                    // console.dir(this.pagination().getSelectedUser());
                    _this.selectedUser(response);
                });
            };
            this.getActiveUserFlag = function (dataUser) {
                if (!dataUser || !_this.selectedUser()) {
                    return null;
                }
                return (dataUser.id === _this.selectedUser().id);
            };
            this.dataDelete = function (userDat, event) {
                event.stopPropagation();
                var url = "/api/users/" + userDat.id;
                jquery.ajax(url, {
                    type: "delete",
                }).done(function () {
                    _this.loadPreviews(1);
                });
            };
            this.mainScript = function (context) {
                jquery(function (f) {
                    var element = f('#fixedTop');
                    // console.dir(f(context).scrollTop());
                    /*
                        const scrollHeight = 190;
                    if (f().scrollTop() < scrollHeight) {
                        element.css({
                            position:"relative"
                        })
                    } else if(f().scrollTop() === scrollHeight) {
                        element.css({
                            position:"relative",
                            top:0
                        })
                    }
                    else if (f().scrollTop() > scrollHeight) {
                        element.css({
                            position:"relative",
                            top: () => f().scrollTop()
                        })
                    }*/
                });
            };
            this.handleSaveUser = function () {
                var url = "/api/users";
                var type = _this.selectedUser && _this.selectedUser().id
                    ? "put" : "post";
                jquery.ajax(url, {
                    data: JSON.stringify(_this.selectedUser()),
                    type: type,
                    contentType: "application/json"
                }).done(function () {
                    _this.initialLoad();
                }).fail(function (err) { return console.dir(err); });
            };
            this.onCancel = function () {
                if (_this.selectedUser() && _this.selectedUser().id) {
                    _this.getSelectedUser(_this.selectedUser());
                }
                else {
                    _this.addNewUser();
                }
            };
            this.loadCountries = function () {
                var url = "/api/countries";
                jquery.getJSON(url).done(function (response) {
                    _this.countries(response);
                });
            };
            this.getPageNumbers = function (totalelement) {
                var dataList = [];
                for (var i = 0; i < Number(totalelement); i++) {
                    dataList.push(i + 1);
                }
                _this.pageNumbers(dataList);
            };
            this.loadPreviews = function (pageNumber) {
                if (pageNumber === void 0) { pageNumber = 1; }
                var url = "/api/users/" + pageNumber + "/10/preview";
                jquery.getJSON(url).done(function (response) {
                    _this.previews(response.data);
                    _this.currentPage(response.page);
                    _this.totalPages(response.totalPages);
                    _this.getPageNumbers(response.totalPages);
                    if (response.data.length > 0) {
                        _this.getSelectedUser(response.data[0]);
                    }
                });
            };
            this.initialLoad = function () {
                _this.loadCountries();
                _this.loadPreviews(1);
            };
            this.initialRout = function () {
                router.map([
                    { route: "", title: "Welcome", moduleId: 'viewmodels/pagination', nav: true }
                ]).buildNavigationModel();
                router.activate();
            };
            this.activate = function () {
                _this.initialLoad();
                _this.initialRout();
            };
        }
        return ShellViewModel;
    }());
    return ShellViewModel;
});
//# sourceMappingURL=shell.js.map