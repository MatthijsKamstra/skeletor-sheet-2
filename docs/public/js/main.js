// Generated by Haxe 4.1.4
(function ($global) { "use strict";
function $extend(from, fields) {
	var proto = Object.create(from);
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var Main = function() {
	this._storage = null;
	this.hasStorage = false;
	this.contentObj = { };
	this.storageName = model_constants_App.PROJECT_NAME;
	var _gthis = this;
	window.document.addEventListener("DOMContentLoaded",function(event) {
		$global.console.log("Dom ready :: build: " + "2020-10-30 12:57:11" + " ");
		if(_gthis.get_storage() != null) {
			console.log("src/Main.hx:43:","hasStorage : " + Std.string(_gthis.hasStorage));
		}
		_gthis.initHomepage();
		_gthis.initTabletop();
	});
};
Main.__name__ = true;
Main.main = function() {
	var app = new Main();
};
Main.prototype = {
	initHomepage: function() {
		var _home = { template : Template.getHome()};
		var routes = { path : "/pages/:id", component : new component_VPage().init(), props : true};
		var routes1 = [{ path : "", component : _home},routes,{ path : "/post/:id", component : new component_VPost().init(), props : true}];
		var router = new VueRouter({ routes : routes1});
		this.vm = new Vue({ router : router, template : Template.getOldRoot(), data : { showloading : !this.hasStorage, sheet : this.contentObj, message : "Content from this page from google spreadsheet and vue.js"}}).$mount("#app");
	}
	,initTabletop: function() {
		Tabletop.init({ key : "https://docs.google.com/spreadsheets/d/1u2tIr6LCIi3hQ6wIBmz1yER_wFcRZ2atIIx2bTcRWms/edit?usp=sharing", callback : $bind(this,this.showInfo), simpleSheet : false});
	}
	,showInfo: function(data,tabletop) {
		$global.console.log(data);
		this.showSnackbar("Successfully updated!");
		console.log("src/Main.hx:94:",tabletop.sheets("posts"));
		console.log("src/Main.hx:95:",tabletop.sheets("pages"));
		console.log("src/Main.hx:96:",tabletop);
		console.log("src/Main.hx:99:",tabletop.modelNames);
		console.log("src/Main.hx:100:",tabletop.foundSheetNames);
		var obj = { posts : tabletop.sheets("posts").elements, pages : tabletop.sheets("pages").elements};
		this.vm.showloading = false;
		this.vm.sheet = obj;
		this.set_storage(JSON.stringify(obj));
	}
	,showSnackbar: function(msg) {
		var x = window.document.getElementById("snackbar");
		if(x == null) {
			var div = window.document.createElement("div");
			div.id = "snackbar";
			window.document.body.appendChild(div);
			x = div;
		}
		x.innerText = msg;
		x.className = "show";
		setTimeout(function() {
			x.className = x.className.replace("show","");
		},3000);
	}
	,get_storage: function() {
		if(window.localStorage.getItem(this.storageName) != null) {
			this._storage = window.localStorage.getItem(this.storageName);
			this.contentObj = JSON.parse(this._storage).data;
			this.hasStorage = true;
		}
		return this._storage;
	}
	,set_storage: function(value) {
		var obj = { date : new Date(), data : JSON.parse(value)};
		window.localStorage.setItem(this.storageName,JSON.stringify(obj));
		this.contentObj = JSON.parse(JSON.stringify(value));
		this.hasStorage = true;
		return this._storage = value;
	}
	,__class__: Main
};
Math.__name__ = true;
var Reflect = function() { };
Reflect.__name__ = true;
Reflect.field = function(o,field) {
	try {
		return o[field];
	} catch( _g ) {
		return null;
	}
};
Reflect.fields = function(o) {
	var a = [];
	if(o != null) {
		var hasOwnProperty = Object.prototype.hasOwnProperty;
		for( var f in o ) {
		if(f != "__id__" && f != "hx__closures__" && hasOwnProperty.call(o,f)) {
			a.push(f);
		}
		}
	}
	return a;
};
var Std = function() { };
Std.__name__ = true;
Std.string = function(s) {
	return js_Boot.__string_rec(s,"");
};
var Template = function() { };
Template.__name__ = true;
Template.getOldRoot = function() {
	var template = "\n\t\t<div id=\"app\">\n\t\t\t<nav class=\"navbar navbar-expand-lg navbar-dark bg-dark\">\n\t\t\t\t<div class=\"container\">\n\t\t\t\t\t<router-link class=\"navbar-brand\" to=\"/\"><i class=\"far fa-comment\"></i> Skeletor Sheet 2</router-link>\n\t\t\t\t\t<button class=\"navbar-toggler\" type=\"button\" data-toggle=\"collapse\" data-target=\"#navbarNav\" aria-controls=\"navbarNav\" aria-expanded=\"false\" aria-label=\"Toggle navigation\">\n\t\t\t\t\t\t<span class=\"navbar-toggler-icon\"></span>\n\t\t\t\t\t</button>\n\t\t\t\t\t<div class=\"collapse navbar-collapse\" id=\"navbarNav\">\n\t\t\t\t\t\t<ul class=\"navbar-nav\">\n\n\t\t\t\t\t\t\t<li class=\"nav-item active\">\n\t\t\t\t\t\t\t\t<router-link class=\"nav-link\" to=\"/\">Home <span class=\"sr-only\">(current)</span></router-link>\n\t\t\t\t\t\t\t</li>\n\n\t\t\t\t\t\t\t<li v-for=\"(item, index) in sheet.pages\"><router-link v-bind:to=\"'/pages/'+item.title\" class=\"nav-link\">{{ item.title }}</router-link></li>\n\t\t\t\t\t\t</ul>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</nav>\n\n\t\t\t<div class=\"container\">\n\t\t\t\t<!--\n\t\t\t\t\t<p>{{ message }}</p>\n\t\t\t\t-->\n\n\t\t\t\t<router-view></router-view>\n\n\t\t\t\t<transition name=\"custom-classes-transition\" enter-active-class=\"animated fadeIn\" leave-active-class=\"animated fadeOut\">\n\t\t\t\t\t<div id=\"loadervue\" v-if=\"showloading\">\n\t\t\t\t\t\t<i class=\"fas fa-sync-alt fa-spin fa-3x\"></i>\n\t\t\t\t\t\t<span class=\"sr-only\">Loading...</span>\n\t\t\t\t\t</div>\n\t\t\t\t</transition>\n\n\t\t\t</div>\n\t\t</div><!-- /#app -->\n\t\t";
	return template;
};
Template.getHome = function() {
	var template = template_Html.h1({ text : "Home"});
	var template1 = template_Html.img({ "v-bind:src" : "item.img", _class : "npm"});
	var template2 = template_Html.h5({ _class : "card-title", text : "{{ item.title }}"});
	var template3 = template_Html.p({ _class : "card-text", text : "{{ item.body }}"});
	var template4 = template_TVue.routerLink({ _class : "btn btn-dark", "v-bind:to" : "'/post/'+item.title", text : "Read more"});
	var template5 = template_Html.div({ _class : "card-body"},[template2,template3,template4]);
	var template2 = template_Html.div({ _class : "card"},[template1,template5]);
	var template1 = template_Html.div({ _class : "col-sm-12 col-md-6 col-lg-4", "v-for" : "item in $" + "root.sheet.posts"},[template2]);
	var template2 = template_Html.div({ _class : "row"},[template1]);
	var template1 = template_TVue.vue([template_Html.div({ id : "home"},[template,template2])]);
	return template1.toString();
};
var VComponent = function() {
};
VComponent.__name__ = true;
VComponent.prototype = {
	data: function() {
		return { };
	}
	,__class__: VComponent
};
var component_VPage = function() {
	VComponent.call(this);
};
component_VPage.__name__ = true;
component_VPage.__super__ = VComponent;
component_VPage.prototype = $extend(VComponent.prototype,{
	template: function() {
		var tmp = template_Html.h1({ text : "{{ getTitle(id) }}"});
		var tmp1 = template_Html.p({ text : "{{ getBody(id) }}"});
		var tmp2 = template_TVue.vue([template_Html.div({ _class : "pages"},[tmp,tmp1])]);
		return tmp2.toString();
	}
	,init: function() {
		var _gthis = this;
		var comp = { data : function() {
			return _gthis.data();
		}, template : this.template(), props : ["id"], computed : { reversedMessage : function() {
			return this.message.split("").reverse().join("");
		}}, methods : { getTitle : function(id) {
			return this.getPage(id).title;
		}, getBody : function(id) {
			return this.getPage(id).body;
		}, getPage : function(id) {
			var _root = (js_Boot.__cast(this , Vue)).$root;
			var arr = _root.sheet.pages;
			var _g = 0;
			var _g1 = arr.length;
			while(_g < _g1) {
				var i = _g++;
				var page = arr[i];
				if(page.title == id) {
					return page;
				}
			}
			return null;
		}}};
		return comp;
	}
	,__class__: component_VPage
});
var component_VPost = function() {
	VComponent.call(this);
};
component_VPost.__name__ = true;
component_VPost.__super__ = VComponent;
component_VPost.prototype = $extend(VComponent.prototype,{
	template: function() {
		var tmp = template_Html.h1({ text : "{{ getTitle(id) }}"});
		var tmp1 = template_Html.img({ _class : "img-fluid", "v-bind:src" : "getUrl(id)"});
		var tmp2 = template_Html.p({ text : "{{ getBody(id) }}"});
		var tmp3 = template_TVue.vue([template_Html.div({ _class : "pages"},[tmp,tmp1,tmp2])]);
		return tmp3.toString();
	}
	,init: function() {
		var _gthis = this;
		var comp = { data : function() {
			return _gthis.data();
		}, template : this.template(), props : ["id"], computed : { reversedMessage : function() {
			return this.message.split("").reverse().join("");
		}}, methods : { getTitle : function(id) {
			return this.getPage(id).title;
		}, getBody : function(id) {
			return this.getPage(id).body;
		}, getUrl : function(id) {
			console.log("src/component/VPost.hx:61:","url: " + id);
			return this.getPage(id).img;
		}, getPage : function(id) {
			var _root = (js_Boot.__cast(this , Vue)).$root;
			var arr = _root.sheet.posts;
			var _g = 0;
			var _g1 = arr.length;
			while(_g < _g1) {
				var i = _g++;
				var page = arr[i];
				if(page.title == id) {
					return page;
				}
			}
			return null;
		}}};
		return comp;
	}
	,__class__: component_VPost
});
var haxe_Exception = function(message,previous,native) {
	Error.call(this,message);
	this.message = message;
	this.__previousException = previous;
	this.__nativeException = native != null ? native : this;
};
haxe_Exception.__name__ = true;
haxe_Exception.thrown = function(value) {
	if(((value) instanceof haxe_Exception)) {
		return value.get_native();
	} else if(((value) instanceof Error)) {
		return value;
	} else {
		var e = new haxe_ValueException(value);
		return e;
	}
};
haxe_Exception.__super__ = Error;
haxe_Exception.prototype = $extend(Error.prototype,{
	get_native: function() {
		return this.__nativeException;
	}
	,__class__: haxe_Exception
});
var haxe_ValueException = function(value,previous,native) {
	haxe_Exception.call(this,String(value),previous,native);
	this.value = value;
};
haxe_ValueException.__name__ = true;
haxe_ValueException.__super__ = haxe_Exception;
haxe_ValueException.prototype = $extend(haxe_Exception.prototype,{
	__class__: haxe_ValueException
});
var haxe_iterators_ArrayIterator = function(array) {
	this.current = 0;
	this.array = array;
};
haxe_iterators_ArrayIterator.__name__ = true;
haxe_iterators_ArrayIterator.prototype = {
	hasNext: function() {
		return this.current < this.array.length;
	}
	,next: function() {
		return this.array[this.current++];
	}
	,__class__: haxe_iterators_ArrayIterator
};
var js_Boot = function() { };
js_Boot.__name__ = true;
js_Boot.getClass = function(o) {
	if(o == null) {
		return null;
	} else if(((o) instanceof Array)) {
		return Array;
	} else {
		var cl = o.__class__;
		if(cl != null) {
			return cl;
		}
		var name = js_Boot.__nativeClassName(o);
		if(name != null) {
			return js_Boot.__resolveNativeClass(name);
		}
		return null;
	}
};
js_Boot.__string_rec = function(o,s) {
	if(o == null) {
		return "null";
	}
	if(s.length >= 5) {
		return "<...>";
	}
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) {
		t = "object";
	}
	switch(t) {
	case "function":
		return "<function>";
	case "object":
		if(((o) instanceof Array)) {
			var str = "[";
			s += "\t";
			var _g = 0;
			var _g1 = o.length;
			while(_g < _g1) {
				var i = _g++;
				str += (i > 0 ? "," : "") + js_Boot.__string_rec(o[i],s);
			}
			str += "]";
			return str;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( _g ) {
			return "???";
		}
		if(tostr != null && tostr != Object.toString && typeof(tostr) == "function") {
			var s2 = o.toString();
			if(s2 != "[object Object]") {
				return s2;
			}
		}
		var str = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		var k = null;
		for( k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str.length != 2) {
			str += ", \n";
		}
		str += s + k + " : " + js_Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str += "\n" + s + "}";
		return str;
	case "string":
		return o;
	default:
		return String(o);
	}
};
js_Boot.__interfLoop = function(cc,cl) {
	if(cc == null) {
		return false;
	}
	if(cc == cl) {
		return true;
	}
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g = 0;
		var _g1 = intf.length;
		while(_g < _g1) {
			var i = _g++;
			var i1 = intf[i];
			if(i1 == cl || js_Boot.__interfLoop(i1,cl)) {
				return true;
			}
		}
	}
	return js_Boot.__interfLoop(cc.__super__,cl);
};
js_Boot.__instanceof = function(o,cl) {
	if(cl == null) {
		return false;
	}
	switch(cl) {
	case Array:
		return ((o) instanceof Array);
	case Bool:
		return typeof(o) == "boolean";
	case Dynamic:
		return o != null;
	case Float:
		return typeof(o) == "number";
	case Int:
		if(typeof(o) == "number") {
			return ((o | 0) === o);
		} else {
			return false;
		}
		break;
	case String:
		return typeof(o) == "string";
	default:
		if(o != null) {
			if(typeof(cl) == "function") {
				if(js_Boot.__downcastCheck(o,cl)) {
					return true;
				}
			} else if(typeof(cl) == "object" && js_Boot.__isNativeObj(cl)) {
				if(((o) instanceof cl)) {
					return true;
				}
			}
		} else {
			return false;
		}
		if(cl == Class ? o.__name__ != null : false) {
			return true;
		}
		if(cl == Enum ? o.__ename__ != null : false) {
			return true;
		}
		return false;
	}
};
js_Boot.__downcastCheck = function(o,cl) {
	if(!((o) instanceof cl)) {
		if(cl.__isInterface__) {
			return js_Boot.__interfLoop(js_Boot.getClass(o),cl);
		} else {
			return false;
		}
	} else {
		return true;
	}
};
js_Boot.__cast = function(o,t) {
	if(o == null || js_Boot.__instanceof(o,t)) {
		return o;
	} else {
		throw haxe_Exception.thrown("Cannot cast " + Std.string(o) + " to " + Std.string(t));
	}
};
js_Boot.__nativeClassName = function(o) {
	var name = js_Boot.__toStr.call(o).slice(8,-1);
	if(name == "Object" || name == "Function" || name == "Math" || name == "JSON") {
		return null;
	}
	return name;
};
js_Boot.__isNativeObj = function(o) {
	return js_Boot.__nativeClassName(o) != null;
};
js_Boot.__resolveNativeClass = function(name) {
	return $global[name];
};
var model_constants_App = function() { };
model_constants_App.__name__ = true;
var template_Html = function() { };
template_Html.__name__ = true;
template_Html.div = function(att,elements) {
	return new template_El("div",att,elements);
};
template_Html.img = function(att,elements) {
	return new template_El("img",att,elements);
};
template_Html.p = function(att,elements) {
	return new template_El("p",att,elements);
};
template_Html.h1 = function(att,elements) {
	return new template_El("h1",att,elements);
};
template_Html.h5 = function(att,elements) {
	return new template_El("h5",att,elements);
};
var template_El = function(name,att,elements) {
	this.elements = [];
	this.emptyElementArray = ["area","base","br","col","embed","hr","img","input","link","meta","param","source","track","wbr"];
	this.name = name;
	this.att = att;
	this.elements = elements;
};
template_El.__name__ = true;
template_El.reset = function() {
	template_El._html = "";
};
template_El.prototype = {
	convert: function(name,att,elements,count) {
		if(count == null) {
			count = 0;
		}
		var tab = "";
		var _g = 0;
		var _g1 = count;
		while(_g < _g1) {
			var i = _g++;
			tab += "\t";
		}
		var isDone = false;
		var isEmpty = false;
		var className = "";
		if(name != "") {
			if(this.emptyElementArray.indexOf(name) != -1) {
				isEmpty = true;
			}
			switch(name) {
			case "comment":
				template_El._html += "" + tab + "<!--";
				break;
			case "if":case "iff":case "swig_if":case "{%":
				template_El._html += "" + tab + "{% if " + att.text + " %}";
				break;
			case "print":case "print_end":case "print_start":
				template_El._html += "" + tab;
				break;
			case "swig_comment":case "{#":
				template_El._html += "" + tab + "{#";
				break;
			case "swig_var":case "{{":
				template_El._html += "" + tab + "{{";
				break;
			default:
				template_El._html += "" + tab + "<" + name;
			}
			var attArr = Reflect.fields(att);
			var _g = 0;
			var _g1 = attArr.length;
			while(_g < _g1) {
				var j = _g++;
				var _att = attArr[j];
				var _attName = attArr[j];
				switch(_att.toString()) {
				case "_class":case "clas":case "class":
					className = Reflect.field(att,_att);
					_attName = "class";
					break;
				default:
				}
				if(_att == "text") {
					continue;
				}
				if(_att.indexOf("print") != -1) {
					template_El._html += Std.string(Reflect.field(att,_att));
					continue;
				}
				template_El._html += " " + _attName + "=\"" + Std.string(Reflect.field(att,_att)) + "\"";
			}
			if(att != null && att.text != null) {
				switch(name) {
				case "comment":
					isDone = true;
					template_El._html += " " + att.text + " -->\n";
					break;
				case "if":case "iff":case "swig_if":case "{%":
					isDone = true;
					template_El._html += "{% endif %}\n";
					break;
				case "print":case "print_end":case "print_start":
					isDone = true;
					template_El._html += "" + att.text + "\n";
					break;
				case "swig_comment":case "{#":
					isDone = true;
					template_El._html += " " + att.text + " #}\n";
					break;
				case "swig_var":case "{{":
					isDone = true;
					template_El._html += " " + att.text + " }}\n";
					break;
				default:
					if(elements == null) {
						isDone = true;
						template_El._html += ">" + att.text.split("\n").join("\n" + tab) + "</" + name + ">\n";
					} else {
						template_El._html += ">" + att.text.split("\n").join("\n" + tab) + "\n";
					}
				}
			} else {
				if(isEmpty) {
					isDone = true;
				}
				template_El._html += ">\n";
			}
			if(elements != null) {
				++count;
				var _g = 0;
				var _g1 = elements.length;
				while(_g < _g1) {
					var i = _g++;
					var el = elements[i];
					this.convert(el.name,el.att,el.elements,count);
				}
			}
			if(!isDone) {
				if(name == "div" && className != "") {
					template_El._html += "" + tab + "</" + name + "><!-- /." + className + " -->\n";
				} else {
					template_El._html += "" + tab + "</" + name + ">\n";
				}
			}
		} else {
			template_El._html += "<!-- This template is generated with Haxe. Do not edit! -->\n";
			var _g = 0;
			var _g1 = elements.length;
			while(_g < _g1) {
				var i = _g++;
				var el = elements[i];
				this.convert(el.name,el.att,el.elements,0);
			}
		}
		return template_El._html;
	}
	,toString: function() {
		return this.convert(this.name,this.att,this.elements);
	}
	,__class__: template_El
};
var template_TVue = function() { };
template_TVue.__name__ = true;
template_TVue.vue = function(elements) {
	template_El.reset();
	return new template_El("",{ },elements);
};
template_TVue.routerLink = function(att,elements) {
	return new template_El("router-link",att,elements);
};
template_TVue.__super__ = template_Html;
template_TVue.prototype = $extend(template_Html.prototype,{
	__class__: template_TVue
});
var $_;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $global.$haxeUID++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = m.bind(o); o.hx__closures__[m.__id__] = f; } return f; }
$global.$haxeUID |= 0;
String.prototype.__class__ = String;
String.__name__ = true;
Array.__name__ = true;
Date.prototype.__class__ = Date;
Date.__name__ = "Date";
var Int = { };
var Dynamic = { };
var Float = Number;
var Bool = Boolean;
var Class = { };
var Enum = { };
js_Boot.__toStr = ({ }).toString;
model_constants_App.PROJECT_NAME = "[SkeletorSheet2]";
template_El._html = "";
Main.main();
})(typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this);

//# sourceMappingURL=main.js.map