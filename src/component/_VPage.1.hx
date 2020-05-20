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

	override function data():Dynamic {
		var obj = {
			message: 'Hello',
			nr: '999',
			obj: {},

			title: '',
			body: '',
		};
		return obj;
	}

	override function template():String {
		var tmp = vue([
			div({_class: 'pages'}, [
				h1({text: 'Heading mck'}),
				h2({text: 'id: "{{ $$route.params.id }}"'}),
				h2({text: '{{ getTitle() }}'}),
				p({text: '{{ body }}'}),
				p({text: 'message:{{ message }}'}),
				p({text: 'test: {{ test }}'}),
				p({text: 'nr: {{ nr }}'}),
				p({text: '{{ obj[0] }}'}),
				p({text: '- {{ ${js.Lib.nativeThis} }}'}),
				p({text: '- {{ $$root.sheet.pages }}'}),
				// p({text:'- {{ pages }}'}),
				// p({text:'{{ pages.length() }}'}),
				p({text: 'Original message: "{{ message }}"'}),
				p({text: 'Computed reversed message: "{{ reversedMessage }}"'}),
				p({text: 'getPage("what"): "{{ getPage("what") }}"'}),
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
			props: ['test'],
			computed: {
				// a computed getter
				reversedMessage: function() {
					// `this` points to the vm instance
					return js.Lib.nativeThis.message.split('').reverse().join('');
				}
			},
			methods: {
				getTitle: function() {
					return 'title';
				},
				getBody: function() {
					return 'body';
				},
				getPage: function(id) {
					// trace(js.Lib.nativeThis);
					var _root = untyped __js__("this.$root");
					var _root:Vue = cast(js.Lib.nativeThis, Vue).root;
					var pagesArr:Array<Dynamic> = _root.sheet.pages;
					for (i in 0...pagesArr.length) {
						var page = pagesArr[i];
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
