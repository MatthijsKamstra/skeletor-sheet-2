package;

import template.Html;
import template.Html.*;
import template.TVue;
import template.TVue.*;
import template.Out;

class Template {

	static public function createVue() {
		var html = vue([
			div({id:'app'},[
				p({text:'{{ message }}'}),
				transition({
					'name':"custom-classes-transition",
					'enter-active-class':"animated fadeIn",
					'leave-active-class':"animated fadeOut",
				}, [
					div({'id':"loadervue",'v-if':"showloading",},[
						el('i',{'class':"fas fa-sync-alt fa-spin fa-3x"}),
						span({'class':"sr-only", text:'Loading...'}),
					]),
				]),
				div({_class:"row"},[
					div({_class:"col-sm-12 col-md-6 col-lg-4", 'v-for':"item in sheet.posts"},[
						div({_class:"card"},[
							img({'v-bind:src':"item.img", _class:"card-img-top"}),
							div({_class:"card-body"}, [
								h5({_class:"card-title", text:'{{ item.title }}'}),
					  			p({_class:"card-text", text:'{{ item.body }}'}),
								a({href:"#",_class:"btn btn-primary", text:'read more'}),
							])
						])
					])
				])
			])
		]);
		return(html.toString());
	}

	static public function getRoot():String{
		var template = '
		<div id="app">
			<h1>Hello App!</h1>
			<p>
				<!-- use router-link component for navigation. -->
				<!-- specify the link by passing the `to` prop. -->
				<!-- `<router-link>` will be rendered as an `<a>` tag by default -->
				<router-link to="/foo">Go to Foo</router-link>
				<router-link to="/bar">Go to Bar</router-link>
			</p>
			<!-- route outlet -->
			<!-- component matched by the route will render here -->
			<router-view></router-view>
		</div>
		';
		return template;
	}


	static public function getOldRoot():String {
		var template = '
		<div id="app">
			<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
				<div class="container">
					<router-link class="navbar-brand" to="/"><i class="far fa-comment"></i> Skeletor Sheet 2</router-link>
					<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
						<span class="navbar-toggler-icon"></span>
					</button>
					<div class="collapse navbar-collapse" id="navbarNav">
						<ul class="navbar-nav">

							<li class="nav-item active">
								<router-link class="nav-link" to="/">Home <span class="sr-only">(current)</span></router-link>
							</li>

							<li v-for="(item, index) in sheet.pages"><router-link v-bind:to="\'/pages/\'+item.title" class="nav-link">{{ item.title }}</router-link></li>
						</ul>
					</div>
				</div>
			</nav>

			<div class="container">
				<!--
					<p>{{ message }}</p>
				-->

				<router-view></router-view>

				<transition name="custom-classes-transition" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
					<div id="loadervue" v-if="showloading">
						<i class="fas fa-sync-alt fa-spin fa-3x"></i>
						<span class="sr-only">Loading...</span>
					</div>
				</transition>

			</div>
		</div><!-- /#app -->
		';
		return template;
	}

	static public function getNav():String{
		var template = '
		<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
			<div class="container">
				<a class="navbar-brand" href="#"><i class="far fa-comment"></i> Skeletor Sheet</a>
				<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
					<span class="navbar-toggler-icon"></span>
				</button>
				<div class="collapse navbar-collapse" id="navbarNav">
					<ul class="navbar-nav">
						<li class="nav-item active">
							<a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
						</li>
						<li class="nav-item">
							<a class="nav-link" href="#">Features</a>
						</li>
						<li class="nav-item">
							<a class="nav-link" href="#">Pricing</a>
						</li>
					</ul>
				</div>
			</div>
		</nav>
		';
		return template;
	}

	static public function getHome():String{
		var template = vue([
			div({id:'home'},[
				h1({text:'Home'}),
				div({_class:'row'},[
					div({
						_class:"col-sm-12 col-md-6 col-lg-4",
						'v-for':'item in $$root.sheet.posts'
					},[
						div({_class:'card'},[
							img({'v-bind:src':'item.img', _class:"npm"}),
							div({_class:"card-body"},[
								h5({_class:"card-title", text: '{{ item.title }}'}),
								p({_class:"card-text", text:'{{ item.body }}'}),
								routerLink({_class:"btn btn-dark", 'v-bind:to':'\'/post/\'+item.title', text:'Read more'}),
								// a({'v-bind:href':"\'/#/post/\'+item.title", _class:"btn btn-primary", text:"read more"})
							])
						])
					])
				])
			])
		]);
		return template.toString();
	}


	static public function home():String{
		var template = '
			<div class="home">
				<h1>Home</h1>
				<div class="row">
					<div class="col-sm-12 col-md-6 col-lg-4" v-for="item in $$root.sheet.posts">
						<div class="card">
							<img v-bind:src="item.img" class="npm ">
							<div class="card-body">
								<h5 class="card-title">{{ item.title }}</h5>
								<p class="card-text">{{ item.body }}</p>
								<a v-bind:href="\'/#/post/\'+item.title" class="btn btn-primary">read more</a>
							</div><!-- /.card-body -->
						</div><!-- /.card -->
					</div><!-- /.col-sm-12 col-md-6 col-lg-4 -->
				</div><!-- /.row -->
			</div>
		';
		return template;
	}

	public static function test () : String {
		var tmp = vue([
			div({_class:'test'},[
				h1({text:'Heading test'}),
				h2({text:'id: "{{ $$route.params.id }}"'})
			])
		]);
		return tmp.toString();
	}

	static public function pages():String{
		var tmp = vue([
			div({_class:'pages'},[
				h1({text:'Heading Pages'}),
				h2({text:'id: "{{ $$route.params.id }}"'}),
				p({text:'path: "{{ $$route.path }}"'}),
				p({text:'app: "{{ $$root.data }}"'}),
			])
		]);

		var template = '
		<div class="">
			<h1>Pages</h1>
			<h2>User "{{ $$route.params.id }}"</h2>
		</div>

		';
		return tmp.toString();
	}

	static public function posts():String{
		var template = '
			<div><h1>Posts</h1></div>
		';
		return template;
	}


}