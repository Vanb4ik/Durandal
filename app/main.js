const root = "../node_modules/";
requirejs.config({
	paths: {
		jquery: root + "jquery/dist/jquery",
		text: root + "requirejs-text/text",
		durandal: root + "durandal/js",
		plugins: root + "durandal/js/plugins",
		transitions: root + "durandal/js/transitions",
		knockout: root + "knockout/build/output/knockout-latest.debug",
		toastr: root + "toastr/build/toastr.min",
	},
	shim: {
		bootstrap: {
			deps: ["jquery"],
			exports: "jQuery",
		},

	},
});

define(['durandal/system', 'durandal/app', 'durandal/viewLocator', 'toastr'], (system, app, viewLocator) => {

	system.debug(true);

	app.title = 'Vanb4ik_Durandal';
	app.configurePlugins({
		router: false,
		dialog: false,
		observable: true,
	});
	app.start().then(() => {

		viewLocator.useConvention();

		app.setRoot("viewmodels/shell");
	});
});