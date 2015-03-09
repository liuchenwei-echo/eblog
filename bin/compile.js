var marked = require("marked");
var fs = require("fs");
var log4js = require("log4js");
var logger = log4js.getLogger();

var renderer = new marked.Renderer();
renderer.heading = function (text, level) {
    return '<h'
        + level
        + ' id="'
        + this.options.headerPrefix
        + text.toLowerCase().replace(/\./g, '').replace(/[^[\w\u0100-\uffff\]]+/g, '-')
        + '">'
        + text
        + '</h'
        + level
        + '>\n';
}

marked.setOptions({
	gfm: true,
	langPrefix: 'prettyprint linenums lang-',
    renderer: renderer
});


module.exports=function(path){
	var pathMd = "article/"+path+".md";
	if(!fs.existsSync(pathMd)){
		 logger.error(pathMd + ' not found !');
         return;
	}
	var contents = fs.readFileSync(pathMd, 'utf8');
	var html = marked(contents).replace(/<pre><code/g, '<pre').replace(/<\/code>/g, '');
	console.log(html);
	return html;
}