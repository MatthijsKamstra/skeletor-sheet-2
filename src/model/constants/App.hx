package model.constants;

import haxe.macro.Context;

class App {

	public static inline var GOOGLE_SHEET_URL : String = 'https://docs.google.com/spreadsheets/d/1u2tIr6LCIi3hQ6wIBmz1yER_wFcRZ2atIIx2bTcRWms/edit?usp=sharing';


	public static inline var URL : String  = "https://";

	public static var BUILD : String = getBuildDate();
	public static var PROJECT_NAME : String = '[SkeletorSheet2]';


	macro public static function getBuildDate() {
		var date = Date.now().toString();
		return Context.makeExpr(date, Context.currentPos());
	}

}