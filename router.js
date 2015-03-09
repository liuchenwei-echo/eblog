var fs = require("fs");
var log4js = require("log4js");
var ejs = require("ejs");
var cfg = require("./article.json");
var compile = require("./bin/compile");
var _=require("underscore");
//var json = require("./router-cfg.json");
var logger = log4js.getLogger();
var root = "";


var _Map = {};
var _tagMap = {};
cfg.articles.forEach(function(article){
	_Map[article.id]=article;
	var tags = article.tags;
	tags.forEach(function(tag){
		if(_tagMap[tag]!= undefined){
			_tagMap[tag].push(article);
		}else{
			_tagMap[tag]=[article];
		}
	})
});
cfg._tagMap = _tagMap;
console.log(cfg);


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
		res.render("index",cfg);
	},
	"/article":function(req,res){
		res.render("articleList",cfg);
	},
	"/article/:id":function(req,res){

		console.log(_Map);

		var id = req.params.id;
		var title =_Map[id].title;
		// cfg.articles.forEach(function(article){
		// 	if(article.id == id){
		// 		title = article.title;
		// 		console.log(title);
		// 		return true;
		// 	}
		// })
		//var path = root +"tpl/article/"+id+".ejs";
		//res.render():articleName
		
		var contents = compile(id);
		res.render("article",{id:id,title:title,type:"article",contents:contents,_tagMap:_tagMap});
		//res.send("hello " + articleName);
	},
	"/short":function(req,res){
		res.render("shortList",cfg);
	},
	"/tag/:tag":function(req,res){
		var tag = req.params.tag;
		var tagcfg = _.clone(cfg);
		tagcfg.articles=_tagMap[tag];
		res.render("articleList",tagcfg);
	}
}