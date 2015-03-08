var fs = require("fs");
var log4js = require("log4js");
var ejs = require("ejs");
//var json = require("./router-cfg.json");
var logger = log4js.getLogger();
var root = "";
module.exports={
	"/":function(req, res) {
		// var path = root + "tpl/" + "index" + ".ejs";
		//console.log(path);
		// if (!fs.existsSync(path)) {
		// 	logger.error(path + ' not found !');
		// 	process.exit(1);
		// }
		// var tplContent = fs.readFileSync(path, 'utf8');
		// var opts = {filename: path};
		// var html = ejs.render(tplContent, opts);
		// res.send(html);
		
		//使用ejs模板引擎进行渲染页面
		res.render("index");
	},
	"/article":function(req,res){
		res.render("articleList");
	},
	"/article/:articleName":function(req,res){
		var articleName = req.params.articleName;
		var title = "标题："+articleName;
		//var path = root +"tpl/article/"+id+".ejs";
		//res.render():articleName
		res.render("article",{articleName:articleName,title:title});
		//res.send("hello " + articleName);
	}
}