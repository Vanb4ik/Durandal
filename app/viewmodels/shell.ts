import ko = require("knockout");
import  jquery = require("jquery");

interface previewsResponse {
	data: IPreviewsData[],
	limit: number,
	page: number,
	totalItems: number,
	totalPages: number,
}

interface IPreviewsData {
	country: string,
	fullName: string,
	id: string,
	photo: string,
}

interface IUserFullData {
	address: string,
	birthday: string,
	country: string,
	email: string,
	fullInfo: string,
	fullName: string,
	id: string,
	photo: string,
	profession: string,
	shortInfo: string,
}

class ShellViewModel {
	previews: KnockoutObservableArray<IPreviewsData> = ko.observableArray([]);
	currentPage: KnockoutObservable<number> = ko.observable(1);
	totalPages: KnockoutObservable<number> = ko.observable(0);
	selectedUser: KnockoutObservable<IUserFullData> = ko.observable(null);
	countries: KnockoutObservableArray<string> = ko.observableArray([]);
	pageNumbers: KnockoutObservableArray<number> = ko.observableArray([]);

	addNewUser = () => {
		const newUser = {
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
		this.selectedUser(newUser)
	};

	removeSelectedUser = () => {
		if (!this.canRemoveSelectedUser()) {
			return null
		}
		const url = `/api/users/${this.selectedUser().id}`;
		jquery.ajax(url, {
			type: "delete",
		}).done(() => {
			this.loadPreviews(1)
		})
	};

	canRemoveSelectedUser = () => {
		return (this.selectedUser() && this.selectedUser().id)
	};

	getSelectedUser = (userData: IPreviewsData) => {
		if (!userData.id) {
			return null
		}
		const url = `/api/users/${userData.id}`;
		jquery.getJSON(url).done((response: IUserFullData) => {
			console.dir(response);
			this.selectedUser(response);
		})
	};

	getActiveUserFlag = (dataUser: IPreviewsData) => {
		if (!dataUser || !this.selectedUser()) {
			return null
		}
		return (dataUser.id === this.selectedUser().id)
	};

	dataDelete = (userDat: IPreviewsData, event: any) => {
		event.stopPropagation();
		const url = `/api/users/${userDat.id}`;
		jquery.ajax(url, {
			type: "delete",
		}).done(() => {
			this.loadPreviews(1)
		})
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

	getActivePageNumberFlag(pageNumber) {
		return (pageNumber === this.currentPage())
	}

	mainScript = (context) => {
		jquery( (f) => {
				let element = f('#fixedTop');
				console.dir(f(context).scrollTop());

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

	handleSaveUser = () => {
		const url = "/api/users";
		const type = this.selectedUser && this.selectedUser().id
			? "put" : "post";
		jquery.ajax(url, {
			data: JSON.stringify(this.selectedUser()),
			type,
			contentType: "application/json"
		}).done(() => {
			this.initialLoad()
		}).fail((err: any) => console.dir(err))
	};

	onCancel = () => {
		if (this.selectedUser() && this.selectedUser().id) {
			this.getSelectedUser(this.selectedUser())
		} else {
			this.addNewUser()
		}
	};

	loadCountries() {
		const url = `/api/countries`;
		jquery.getJSON(url).done((response: string[]) => {
			this.countries(response);
		})
	}

	getPageNumbers(totalelement: string | number) {
		const dataList = [];
		for (let i = 0; i < Number(totalelement); i++) {
			dataList.push(i + 1)
		}
		this.pageNumbers(dataList)
	}

	loadPreviews(pageNumber: number = 1) {
		const url = `/api/users/${pageNumber}/10/preview`;
		jquery.getJSON(url).done((response: previewsResponse) => {
			this.previews(response.data);
			this.currentPage(response.page);
			this.totalPages(response.totalPages);
			this.getPageNumbers(response.totalPages);
			if (response.data.length > 0) {
				this.getSelectedUser(response.data[0])
			}
		})
	}

	initialLoad() {
		this.loadCountries();
		this.loadPreviews(1);
	}

	constructor() {
		this.initialLoad();
		// this.selectedUser.subscribe(newValue => console.dir(newValue))
	}
}

export = ShellViewModel;