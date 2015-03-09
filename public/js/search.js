var searchText;
var result;
var searchBox;
var $=function(id){
	return document.getElementById(id);
}
window.onload = function(){
	searchText = $('search_text');
	result =$('result');
	searchBox =$('search_box');
	searchText.onkeyup=function(){
		result.style.display="block";
	}
	searchText.onfocus=function(){
		searchBox.style.width = "208px";
		searchText.style.width = "175px";
		searchBox.style.background="#eee";
		searchText.style.background="#eee";
	}
	searchText.onblur=function(){
		result.style.display="none";
		searchBox.style.width = "138px";

		searchText.style.width = "105px";
		searchBox.style.background="#ccc";
		searchText.style.background="#ccc";

	}
	document.onclick = function(){
		result.style.display="none";
	}
}	