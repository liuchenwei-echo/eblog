var express = require("express");
var log4js = require("log4js");
var ejs = require("ejs");
var fs = require("fs");
var logger = log4js.getLogger();
var port = 3000;
var root = "";

exports.run = function run() {
	var app = express();
	//console.log(__dirname+"********");
	app.use(express.static(__dirname+"/../public"));
	app.get("/", function(req, res) {
		var path = root + "tpl/" + "index" + ".ejs";
		if (!fs.existsSync(path)) {
			logger.error(path + ' not found !');
			process.exit(1);
		}
		var tplContent = fs.readFileSync(path, 'utf8');
		//console.log(path);
		var opts = {filename: path};
		var html = ejs.render(tplContent, opts);
		//console.log(html);
		res.send(html);
	});

	app.listen(port);
	logger.info("server start at http://localhost:" + port + "/");
}