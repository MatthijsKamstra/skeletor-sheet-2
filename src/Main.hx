package;

import js.Browser;
import js.Browser.*;
import js.html.*;
import js.html.Storage;

import model.constants.App;

import vue.Vue;
import vue.VueRouter;

import js.Tabletop;

/**
 * @author Matthijs Kamstra aka [mck]
 * MIT
 */
class Main {

	var publicSpreadsheetUrl = App.GOOGLE_SHEET_URL;
	var storageName = App.PROJECT_NAME;

	var vm:Vue;

	// data from either sharedObject or from Google Sheets
	var contentObj : Dynamic = {};

	// storage
	var hasStorage : Bool = false;

	public var storage  ( get_storage  , set_storage  ) : String;
	private var _storage  : String = null;


	public function new () {
		document.addEventListener("DOMContentLoaded", function(event) {
			console.log('Dom ready :: build: ${App.BUILD} ');

			/**
			 *  first check if we visited the site before, then use that data first.
			 *  then update anyway, just to show the latest data
			 */

			// check for localStorage data
			if( storage != null ) trace('hasStorage : ${hasStorage}');

			initHomepage();
			// initTabletop();
		});
	}

	function initHomepage (){

		var _home 		= { template: Template.home() };

		var routes  : Array<RouteConfig> = [
			{ path: '', component: _home },
			{
				path: '/pages/:id',
				component: new component.VPage().init(),
				props: true,
			},
			{
				path: '/post/:id',
				component: new component.VPost().init(),
				props: true,
			},
		];

		var router = new VueRouter({
			routes:routes
		});

		vm = new Vue({
			router : router,
			template: Template.getOldRoot(),
			data: {
				showloading: !hasStorage,
				sheet: contentObj,
				message: 'Content from this page from google spreadsheet and vue.js'
			}
		}).$mount('#app');
	}

	function initTabletop(){
		Tabletop.init(
			{
				key: App.GOOGLE_SHEET_URL,
				callback: showInfo,
				simpleSheet: false
			}
		);
	}

	function showInfo(data, tabletop) {
		// Browser.alert('Successfully updated!');
		console.log(data);
		showSnackbar('Successfully updated!');
		trace(tabletop.sheets('posts'));
		trace(tabletop.sheets('pages'));
		trace(tabletop);
		// trace(tabletop.posts);
		// trace(tabletop.pages);
		trace(tabletop.modelNames);
		trace(tabletop.foundSheetNames);

		var obj = {
			posts: tabletop.sheets('posts').elements,
			pages: tabletop.sheets('pages').elements,
		}

		// trace(tabletop.);
		vm.showloading = false;
		vm.sheet = obj;
		storage = haxe.Json.stringify(obj);
	}


	/**
	 *  @param isDark -
	 */
	function showLoading(isLoading:Bool,isDark:Bool = false) {
		// Get the loading DIV
		var x = document.getElementById("loading");

		// if no #loading exists, create it
		if(x == null){
			var div = document.createDivElement();
			div.id = 'loading';
			// div.innerHTML = '<i class="fa fa-refresh fa-spin fa-3x fa-fw"></i><span class="sr-only">Loading...</span>';
			div.innerHTML = '<i class="fas fa-sync-alt fa-spin fa-3x"></i><span class="sr-only">Loading...</span>';
			// div.innerHTML = '<i class="fas fa-spinner fa-pulse"></i>';
			document.body.appendChild(div);
			x = div;
		}

		if(isLoading){
			// Add the "show" class to DIV
			x.className = "show";
		} else {
			x.className = "hide";
		}
	}

	function showSnackbar(msg:String) {
		// Get the snackbar DIV
		var x = document.getElementById("snackbar");

		// if no #snackbar exists, create it
		if(x == null){
			var div = document.createDivElement();
			div.id = 'snackbar';
			document.body.appendChild(div);
			x = div;
		}

		// set msg to snackbar
		x.innerText = msg;

		// Add the "show" class to DIV
		x.className = "show";

		// After 3 seconds, remove the show class from DIV
		untyped setTimeout(function(){
			x.className = x.className.replace("show", "");
		}, 3000);

	}

	// ____________________________________ getter/setter ____________________________________

	function get_storage  () : String {
		if ( window.localStorage.getItem(storageName) != null){
			_storage = window.localStorage.getItem(storageName);
			contentObj = haxe.Json.parse(_storage).data;
			hasStorage = true;
		}
		return _storage ;
	}
	function set_storage (value : String) : String {
		var obj = {
			date: Date.now(),
			data: haxe.Json.parse(value)
		}
		window.localStorage.setItem(storageName, haxe.Json.stringify(obj));
		contentObj = haxe.Json.parse(haxe.Json.stringify(value));
		hasStorage = true;
		return _storage  = value;
	}



	static public function main () {
		var app = new Main ();
	}
}
