// localizer - javascript library
// == written by Takuya Otani <takuya.otani@gmail.com> ===
// == Copyright (C) 2012 SimpleBoxes/SerendipityNZ Ltd. ==

var __Localizer = function()
{
	this.strings = {};
	this.getLocalizedString = function(str)
	{
		if (__Localizer.strings[str] && __Localizer.strings[str] != '')
			return __Localizer.strings[str];
		return str;
	};
	var path = '';
	var jses = document.getElementsByTagName('script');
	for (var i=0,n=jses.length;i<n;i++)
	{
		if (jses[i].src.indexOf('localizer.js') == -1) continue;
		path = jses[i].src.replace('localizer.js','');
		break;
	}
	var html = document.getElementsByTagName('html')[0];
	if (html)
	{
		var language = (window.navigator.userLanguage || window.navigator.language || window.navigator.browserLanguage).substr(0,2) == "ja" ? "ja" : "en";
		//var lang = html.getAttribute('xml:lang') || html.getAttribute('lang');
		var pre  = '\n<' + 'script type="text/javascript" src="';
		var post = '.js"></' + 'script>';
		//if (!lang) lang = 'en';
		try {
			document.write(pre + path + 'locale/' + language + post);
		} catch(err) {
			var script = document.createElement('script');
			script.setAttribute('type','text/javascript');
			script.setAttribute('src',path + 'locale/' + language + '.js');
			head.appendChild(script);
		}
	}
	return this;
};
__Localizer = new __Localizer();
_ = __Localizer.getLocalizedString;

var Label = (function(){
    'use strict';
    //コンストラクタ
    var Label = function () {
    };

    Label.prototype.labelInnerHTML = function (fieldId,labelObj) {
			document.getElementById(fieldId).innerHTML = labelObj;
    };

		Label.prototype.fillBlank = function (labelText, fillBlankObj){
		  for(var i = 0; i<fillBlankObj.length; i++){
				var searchChar = "{"+ i +"}";
				if(labelText.indexOf(searchChar) !== -1){
					labelText = labelText.replace(searchChar,fillBlankObj[i]);
				}else{
					return labelText;
				}
			}
			return labelText;
		};

    Label.prototype.labelValue = function (fieldId, labelObj){
				document.getElementById(fieldId).value = labelObj;
    };

    Label.prototype.labelPlaceHolder = function (fieldId,labelObj){
				document.getElementById(fieldId).setAttribute("placeholder", labelObj);
    };

    Label.prototype.labelAttribute = function(fieldId,labelObj){
			document.getElementById(fieldId).setAttribute("label", labelObj);
    };

    return Label;
})();
