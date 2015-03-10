exports.upper1st = function(str){
	if(toString.call(str) == '[object String]'){
		var strs = str.split(/\s/);
		//console.log(strs);
		var rtStr = "";
		strs.forEach(function(temp){
			temp = temp.charAt(0).toUpperCase()+temp.substring(1).toLowerCase();
			rtStr+=temp+" ";
		});
		return rtStr.trim();
	}
	//console.log(rtStr+1);
	return str;
}