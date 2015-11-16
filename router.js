var fs = require("fs");
var log4js = require("log4js");
var ejs = require("ejs");
//每次修改本文件时需要重新加载
var cfg = require("./article.json");
var compile = require("./bin/compile");
var _=require("underscore");
var _strUtil = require("./bin/strUtil");
var logger = log4js.getLogger();
var root = "";
var _Map = {};
var _tagMap = {};

var acfgModel = {
	type:"article"
};

cfg.articles = _.sortBy(cfg.articles,function(article){
	var date = new Date(article.createAt);
	article.createAt = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
	return -date.getTime();
});

cfg.articles.forEach(function(article){
	_Map[article.id]=article;
	var tags = article.tags;
	if(tags && article.type.toLowerCase()=="article"){
		tags.forEach(function(tag){
			tag = tag.toLowerCase().trim();
			if(_tagMap[tag]!= undefined){
				_tagMap[tag].push(article);
			}else{
				_tagMap[tag]=[article];
			}
		})
	}
});

cfg._tagMap = _tagMap;
cfg._strUtil = _strUtil;
acfgModel._tagMap = _tagMap;
acfgModel._strUtil=_strUtil;

module.exports={
	"/":function(req, res) {
		//使用ejs模板引擎进行渲染页面
		res.render("index",cfg);
	},
	"/article":function(req,res){
		res.render("articleList",cfg);
	},
	"/article/:id":function(req,res){
		//console.log(_Map);
		var id = req.params.id;
		//var title =_Map[id].title;
		var contents = compile(id);
		//var acfg = _.clone(acfgModel);
		var acfg = _.clone(cfg);
		acfg.article = _Map[id];
		// acfg.id = id;
		// acfg.title = title;
		acfg.article.contents = contents;
		console.log(acfg);
		res.render("article",acfg);
	},
	"/message":function(req,res){
		console.log(cfg);
		res.render("shortList",cfg);
	},
	"/tag/:tag":function(req,res){
		var tag = req.params.tag;
		var tagcfg = _.clone(cfg);
		tagcfg.articles=_tagMap[tag];
		res.render("articleList",tagcfg);
	}
}