// Generated by Haxe 3.4.5
(function ($global) { "use strict";
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
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
		window.console.log("Dom ready :: build: " + model_constants_App.BUILD + " ");
		if(_gthis.get_storage() != null) {
			console.log("hasStorage : " + (_gthis.hasStorage == null ? "null" : "" + _gthis.hasStorage));
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
		var _home = { template : Template.home()};
		var routes = { path : "/pages/:id", component : new component_VPage().init(), props : true};
		var routes1 = [{ path : "", component : _home},routes,{ path : "/post/:id", component : new component_VPost().init(), props : true}];
		var router = new VueRouter({ routes : routes1});
		this.vm = new Vue({ router : router, template : Template.getOldRoot(), data : { showloading : !this.hasStorage, sheet : this.contentObj, message : "Content from this page from google spreadsheet and vue.js"}}).$mount("#app");
	}
	,initTabletop: function() {
		Tabletop.init({ key : "https://docs.google.com/spreadsheets/d/1u2tIr6LCIi3hQ6wIBmz1yER_wFcRZ2atIIx2bTcRWms/edit?usp=sharing", callback : $bind(this,this.showInfo), simpleSheet : false});
	}
	,showInfo: function(data,tabletop) {
		window.console.log(data);
		this.showSnackbar("Successfully updated!");
		console.log(tabletop.sheets("posts"));
		console.log(tabletop.sheets("pages"));
		console.log(tabletop);
		console.log(tabletop.modelNames);
		console.log(tabletop.foundSheetNames);
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
	} catch( e ) {
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
	var template = "\n\t\t<div id=\"app\">\n\t\t\t<nav class=\"navbar navbar-expand-lg navbar-dark bg-dark\">\n\t\t\t\t<div class=\"container\">\n\t\t\t\t\t<a class=\"navbar-brand\" href=\"/\"><i class=\"far fa-comment\"></i> Skeletor Sheet 2</a>\n\t\t\t\t\t<button class=\"navbar-toggler\" type=\"button\" data-toggle=\"collapse\" data-target=\"#navbarNav\" aria-controls=\"navbarNav\" aria-expanded=\"false\" aria-label=\"Toggle navigation\">\n\t\t\t\t\t\t<span class=\"navbar-toggler-icon\"></span>\n\t\t\t\t\t</button>\n\t\t\t\t\t<div class=\"collapse navbar-collapse\" id=\"navbarNav\">\n\t\t\t\t\t\t<ul class=\"navbar-nav\">\n\n\t\t\t\t\t\t\t<li class=\"nav-item active\">\n\t\t\t\t\t\t\t\t<a class=\"nav-link\" href=\"/\">Home <span class=\"sr-only\">(current)</span></a>\n\t\t\t\t\t\t\t</li>\n\n\t\t\t\t\t\t\t<li v-for=\"(item, index) in sheet.pages\"><router-link v-bind:to=\"'/pages/'+item.title\" class=\"nav-link\">{{ item.title }}</router-link></li>\n\t\t\t\t\t\t</ul>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</nav>\n\n\t\t\t<div class=\"container\">\n\t\t\t\t<!--\n\t\t\t\t\t<p>{{ message }}</p>\n\t\t\t\t-->\n\n\t\t\t\t<router-view></router-view>\n\n\t\t\t\t<transition name=\"custom-classes-transition\" enter-active-class=\"animated fadeIn\" leave-active-class=\"animated fadeOut\">\n\t\t\t\t\t<div id=\"loadervue\" v-if=\"showloading\">\n\t\t\t\t\t\t<i class=\"fas fa-sync-alt fa-spin fa-3x\">\n\t\t\t\t\t\t</i>\n\t\t\t\t\t\t<span class=\"sr-only\">Loading...</span>\n\t\t\t\t\t</div>\n\t\t\t\t</transition>\n\n\t\t\t</div>\n\t\t</div><!-- /#app -->\n\t\t";
	return template;
};
Template.home = function() {
	var template = "\n\t\t\t<div class=\"home\">\n\t\t\t\t<h1>Home</h1>\n\t\t\t\t<div class=\"row\">\n\t\t\t\t\t<div class=\"col-sm-12 col-md-6 col-lg-4\" v-for=\"item in $" + "root.sheet.posts\">\n\t\t\t\t\t\t<div class=\"card\">\n\t\t\t\t\t\t\t<img v-bind:src=\"item.img\" class=\"npm \">\n\t\t\t\t\t\t\t<div class=\"card-body\">\n\t\t\t\t\t\t\t\t<h5 class=\"card-title\">{{ item.title }}</h5>\n\t\t\t\t\t\t\t\t<p class=\"card-text\">{{ item.body }}</p>\n\t\t\t\t\t\t\t\t<a v-bind:href=\"'/#/post/'+item.title\" class=\"btn btn-primary\">read more</a>\n\t\t\t\t\t\t\t</div><!-- /.card-body -->\n\t\t\t\t\t\t</div><!-- /.card -->\n\t\t\t\t\t</div><!-- /.col-sm-12 col-md-6 col-lg-4 -->\n\t\t\t\t</div><!-- /.row -->\n\t\t\t</div>\n\t\t";
	return template;
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
		}, getBody : function(id1) {
			return this.getPage(id1).body;
		}, getPage : function(id2) {
			var _root = (js_Boot.__cast(this , Vue)).$root;
			var arr = _root.sheet.pages;
			var _g1 = 0;
			var _g = arr.length;
			while(_g1 < _g) {
				var i = _g1++;
				var page = arr[i];
				if(page.title == id2) {
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
		}, getBody : function(id1) {
			return this.getPage(id1).body;
		}, getUrl : function(id2) {
			console.log("url: " + id2);
			return this.getPage(id2).img;
		}, getPage : function(id3) {
			var _root = (js_Boot.__cast(this , Vue)).$root;
			var arr = _root.sheet.posts;
			var _g1 = 0;
			var _g = arr.length;
			while(_g1 < _g) {
				var i = _g1++;
				var page = arr[i];
				if(page.title == id3) {
					return page;
				}
			}
			return null;
		}}};
		return comp;
	}
	,__class__: component_VPost
});
var js__$Boot_HaxeError = function(val) {
	Error.call(this);
	this.val = val;
	this.message = String(val);
	if(Error.captureStackTrace) {
		Error.captureStackTrace(this,js__$Boot_HaxeError);
	}
};
js__$Boot_HaxeError.__name__ = true;
js__$Boot_HaxeError.wrap = function(val) {
	if((val instanceof Error)) {
		return val;
	} else {
		return new js__$Boot_HaxeError(val);
	}
};
js__$Boot_HaxeError.__super__ = Error;
js__$Boot_HaxeError.prototype = $extend(Error.prototype,{
	__class__: js__$Boot_HaxeError
});
var js_Boot = function() { };
js_Boot.__name__ = true;
js_Boot.getClass = function(o) {
	if((o instanceof Array) && o.__enum__ == null) {
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
		if(o instanceof Array) {
			if(o.__enum__) {
				if(o.length == 2) {
					return o[0];
				}
				var str = o[0] + "(";
				s += "\t";
				var _g1 = 2;
				var _g = o.length;
				while(_g1 < _g) {
					var i = _g1++;
					if(i != 2) {
						str += "," + js_Boot.__string_rec(o[i],s);
					} else {
						str += js_Boot.__string_rec(o[i],s);
					}
				}
				return str + ")";
			}
			var l = o.length;
			var i1;
			var str1 = "[";
			s += "\t";
			var _g11 = 0;
			var _g2 = l;
			while(_g11 < _g2) {
				var i2 = _g11++;
				str1 += (i2 > 0 ? "," : "") + js_Boot.__string_rec(o[i2],s);
			}
			str1 += "]";
			return str1;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			return "???";
		}
		if(tostr != null && tostr != Object.toString && typeof(tostr) == "function") {
			var s2 = o.toString();
			if(s2 != "[object Object]") {
				return s2;
			}
		}
		var k = null;
		var str2 = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str2.length != 2) {
			str2 += ", \n";
		}
		str2 += s + k + " : " + js_Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str2 += "\n" + s + "}";
		return str2;
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
		var _g1 = 0;
		var _g = intf.length;
		while(_g1 < _g) {
			var i = _g1++;
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
		if((o instanceof Array)) {
			return o.__enum__ == null;
		} else {
			return false;
		}
		break;
	case Bool:
		return typeof(o) == "boolean";
	case Dynamic:
		return true;
	case Float:
		return typeof(o) == "number";
	case Int:
		if(typeof(o) == "number") {
			return (o|0) === o;
		} else {
			return false;
		}
		break;
	case String:
		return typeof(o) == "string";
	default:
		if(o != null) {
			if(typeof(cl) == "function") {
				if(o instanceof cl) {
					return true;
				}
				if(js_Boot.__interfLoop(js_Boot.getClass(o),cl)) {
					return true;
				}
			} else if(typeof(cl) == "object" && js_Boot.__isNativeObj(cl)) {
				if(o instanceof cl) {
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
		return o.__enum__ == cl;
	}
};
js_Boot.__cast = function(o,t) {
	if(js_Boot.__instanceof(o,t)) {
		return o;
	} else {
		throw new js__$Boot_HaxeError("Cannot cast " + Std.string(o) + " to " + Std.string(t));
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
		var _g1 = 0;
		var _g = count;
		while(_g1 < _g) {
			var i = _g1++;
			tab += "\t";
		}
		var isDone = false;
		var isEmpty = false;
		var className = "";
		if(name != "") {
			if(this.emptyElementArray.indexOf(name) != -1) {
				isEmpty = true;
			}
			if(name == "comment") {
				template_El._html += "" + tab + "<!--";
			} else {
				template_El._html += "" + tab + "<" + name;
			}
			var attArr = Reflect.fields(att);
			var _g11 = 0;
			var _g2 = attArr.length;
			while(_g11 < _g2) {
				var j = _g11++;
				var _att = attArr[j];
				var _attName = attArr[j];
				var _g21 = _att.toString();
				switch(_g21) {
				case "_class":case "clas":case "class":
					className = Reflect.field(att,_att);
					_attName = "class";
					break;
				default:
				}
				if(_att == "text") {
					continue;
				}
				template_El._html += " " + _attName + "=\"" + Std.string(Reflect.field(att,_att)) + "\"";
			}
			if(att != null && att.text != null) {
				if(name == "comment") {
					isDone = true;
					template_El._html += " " + att.text + " -->\n";
				} else if(elements == null) {
					isDone = true;
					template_El._html += ">" + att.text.split("\n").join("\n" + tab) + "</" + name + ">\n";
				} else {
					template_El._html += ">" + att.text.split("\n").join("\n" + tab) + "\n";
				}
			} else {
				if(isEmpty) {
					isDone = true;
				}
				template_El._html += ">\n";
			}
			if(elements != null) {
				++count;
				var _g12 = 0;
				var _g3 = elements.length;
				while(_g12 < _g3) {
					var i1 = _g12++;
					var el = elements[i1];
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
			var _g13 = 0;
			var _g4 = elements.length;
			while(_g13 < _g4) {
				var i2 = _g13++;
				var el1 = elements[i2];
				this.convert(el1.name,el1.att,el1.elements,0);
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
template_TVue.__super__ = template_Html;
template_TVue.prototype = $extend(template_Html.prototype,{
	__class__: template_TVue
});
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; }
String.prototype.__class__ = String;
String.__name__ = true;
Array.__name__ = true;
Date.prototype.__class__ = Date;
Date.__name__ = ["Date"];
var Int = { __name__ : ["Int"]};
var Dynamic = { __name__ : ["Dynamic"]};
var Float = Number;
Float.__name__ = ["Float"];
var Bool = Boolean;
Bool.__ename__ = ["Bool"];
var Class = { __name__ : ["Class"]};
var Enum = { };
js_Boot.__toStr = ({ }).toString;
model_constants_App.BUILD = "2018-02-17 00:04:08";
model_constants_App.PROJECT_NAME = "[SkeletorSheet2]";
template_El._html = "";
Main.main();
})(typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this);

//# sourceMappingURL=main.js.map