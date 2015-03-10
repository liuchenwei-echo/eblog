var express = require("express");
var log4js = require("log4js");
var router = require("../router");
var logger = log4js.getLogger();
var port = 3000;

exports.run = function run() {
	var app = express();
	app.set('view engine', 'ejs'); 
	app.set('views', __dirname + '/../tpl');
	app.use(express.static(__dirname+"/../public"));
	
	//绑定路由
	(function(){
		for(var r in router){
			app.get(r,router[r]);
		}
	})();
	
	app.listen(port);
	logger.info("Server start at [ Port : " + port +" ]");
}