package component;

import vue.Vue;
import template.Html;
import template.Html.*;
import template.TVue;
import template.TVue.*;
import template.Out;

class VPage extends VComponent {
	public function new() {
		super();
	}

	// override function data () : Dynamic {
	// 	var obj = {};
	// 	return obj;
	// }

	override function template():String {
		var tmp = vue([
			div({_class: 'pages'}, [
				h1({text: '{{ getTitle(id) }}'}),
				// h2({text:'id: "{{ $$route.params.id }}"'}),
				p({text: '{{ getBody(id) }}'}),
				// p({text:'id: {{ id }}'}),
				// p({text:'- {{ ${js.Lib.nativeThis} }}'}),
				// p({text:'- {{ $$root.sheet.pages }}'}),
			])
		]);
		return tmp.toString();
	}

	public function init() {
		var comp:VueComponentOptions = {
			data: function() {
				untyped __js__('return {0}', data());
			},
			template: template(),
			props: ['id'],
			computed: {
				// a computed getter
				reversedMessage: function() {
					// `this` points to the vm instance
					return js.Lib.nativeThis.message.split('').reverse().join('');
				}
			},
			methods: {
				getTitle: function(id) {
					// trace('title: '+id);
					return js.Lib.nativeThis.getPage(id).title;
				},
				getBody: function(id) {
					// trace('body: '+id);
					return js.Lib.nativeThis.getPage(id).body;
				},
				getPage: function(id) {
					// trace(js.Lib.nativeThis);
					// var _root =  untyped __js__ ("this.$root");
					var _root:Vue = cast(js.Lib.nativeThis, Vue).root;
					var arr:Array<Dynamic> = _root.sheet.pages;
					for (i in 0...arr.length) {
						var page = arr[i];
						if (page.title == id) {
							return page;
						}
					}
					return null;
				}
			}
		};
		return comp;
	}
}
