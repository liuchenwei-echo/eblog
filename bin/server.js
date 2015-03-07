var express = require("express");
var log4js = require("log4js");
var ejs = require("ejs");
var fs = require("fs");
var logger = log4js.getLogger();
var app = express();
var port = 3000;
var root = "eblog";

app.get("/",function(req,res){
	var path = root+"/tpl/"+"index"+".ejs";
	if(!fs.existsSync(path)){
		logger.error(path + ' not found !');
		process.exit(1);
	}
	var tplContent = fs.readFileSync(path, 'utf8');
	console.log(path);
	var opts ={
		filename:path
	};
	var html = ejs.render(tplContent,opts);
	console.log(html);
	res.send(html);
});

app.listen(port);
logger.info("server start at http://localhost:"+port+"/");