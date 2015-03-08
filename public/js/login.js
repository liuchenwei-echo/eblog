	var searchText;
	var result;
	var mask;
	var maskbtn;
	var window;
	var close;
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
		close=$('close');
		close.onclick = function(){
			windows.style.display="none";
			mask.style.display="none";
		}
		maskbtn=$('maskbtn');
		mask=$('div-mask');
		windows=$('window');
		maskbtn.style.zIndex=9999;
		maskbtn.style.position="relative";
		maskbtn.onclick=function(){
			if(mask.style.display=="block"){
				mask.style.display="none";
				windows.style.display="none";
			}else{
				mask.style.display="block";	
				windows.style.display="block";
			}
		}
	}	