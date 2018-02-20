import router = require("plugins/router");
import ko = require("knockout");
import activtor =require("durandal/activator");

interface IactivateData {
	currentPage: KnockoutObservable<number>,
	pageNumbers: KnockoutObservableArray<number>,
	selectedUser:  KnockoutObservable<IUserFullData>,
	totalPages: KnockoutObservable<number>,
	loadPreviews: (pageNumbers) => void,
}

class Pagination {
	router = router;
	currentPage: KnockoutObservable<number>;
	totalPages: KnockoutObservable<number>;
	pageNumbers: KnockoutObservableArray<number>;

	loadPreviews = (loadPreviews: number) => {};

	getActivePageNumberFlag = (pageNumber) => {
		return (pageNumber === this.currentPage())
	};

	goToPage = (numberPage: number) => {
		this.loadPreviews(numberPage)
	};

	goToPrevPage = () => {
		if (this.currentPage() > 1) {
			this.loadPreviews(this.currentPage() - 1)
		}
	};

	goToNextPage = () => {
		if (this.currentPage() < this.totalPages()) {
			this.loadPreviews(this.currentPage() + 1)
		}
	};

	activate(data:IactivateData) {
		if (!data) {
			return null
		}
		this.currentPage = data.currentPage;
		this.totalPages = data.totalPages;
		this.pageNumbers = data.pageNumbers;
		this.loadPreviews = data.loadPreviews
	}
}

export = Pagination;