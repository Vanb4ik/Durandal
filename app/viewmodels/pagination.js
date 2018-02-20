define(["require", "exports", "plugins/router"], function (require, exports, router) {
    "use strict";
    var Pagination = (function () {
        function Pagination() {
            var _this = this;
            this.router = router;
            this.loadPreviews = function (loadPreviews) { };
            this.getActivePageNumberFlag = function (pageNumber) {
                return (pageNumber === _this.currentPage());
            };
            this.goToPage = function (numberPage) {
                _this.loadPreviews(numberPage);
            };
            this.goToPrevPage = function () {
                if (_this.currentPage() > 1) {
                    _this.loadPreviews(_this.currentPage() - 1);
                }
            };
            this.goToNextPage = function () {
                if (_this.currentPage() < _this.totalPages()) {
                    _this.loadPreviews(_this.currentPage() + 1);
                }
            };
        }
        Pagination.prototype.activate = function (data) {
            if (!data) {
                return null;
            }
            this.currentPage = data.currentPage;
            this.totalPages = data.totalPages;
            this.pageNumbers = data.pageNumbers;
            this.loadPreviews = data.loadPreviews;
        };
        return Pagination;
    }());
    return Pagination;
});
//# sourceMappingURL=pagination.js.map