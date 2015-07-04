/**
 * Numbers#startMenu.js
 *
 * Copyright (c) 2015 Kentei-Syunrai
 *
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 */
(function() {
	'use strict';
	var StartMenu = function() {
		this.init = function(){
			buttonSetting();
		};

		/**
		 * コンポーネントにイベントを追加する
		 */
		var buttonSetting = function() {
			// ボタンイベント追加
			var selfPlayerModeButton = document.querySelector('#selfPlayerModeButton');
			document.getElementById("selfPlayerModeButton").innerHTML = _("numbers_menu_1player_mode");
			selfPlayerModeButton.addEventListener("click", selfModeClick, false);
			//TODO ランキングボタンや対戦モードボタンの追加
			document.getElementById("twoPlayerModeButton").innerHTML = _("numbers_menu_2player_mode");
			document.getElementById("rankingButton").innerHTML = _("numbers_menu_ranking_mode");
		};

		/**
		 * 1Pモードボタンを押した時の動作
		 */
		var selfModeClick = function() {
			changeDisplay("selfMode");
			var game1Player = new Game1Player();
			game1Player.init();
		};

		/**
		 * 別画面に移動したときのコンポーネントの表示切り替え
		 * @param {String} 移動先の画面Id
		 */
		var changeDisplay = function(dispName) {
			if(dispName === "selfMode"){
				document.getElementsByClassName("startMenu")[0].style.display = "none";
				document.getElementsByClassName("buttonGroup")[0].style.display = "block";
				document.getElementsByClassName("historyTitle")[0].style.display = "block";
				document.getElementsByClassName("timeCounter")[0].style.display = "block";
			}
		};
	};

	window.StartMenu = StartMenu;
}());
