/**
 * Numbers#game1Player.js
 *
 * Copyright (c) 2015 Kentei-Syunrai
 *
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 */

 (function() {
 	'use strict';
 	var Game1Player = function() {

 		/**
 		 * 初期化処理(public)
 		 */
 		this.init = function() {
 			document.getElementById("historyTitle").innerHTML = _("numbers_history_title");
 			Game1Player.target_number = createRandumNumber();
 			createNumSelectBox();
 			buttonSetting();
 			timeCountStartOrStop();  //スタート
 			Game1Player.timer = setInterval(timeCount, 10);
 		};

 		/**
 		 * 経過時間を表示する処理
 		 */
 		var timeCount = function(){
 			//現在時刻
 			var nowDate = new Date();
 			var hour = nowDate.getHours();
 			var minutes = nowDate.getMinutes();
 			var second = nowDate.getSeconds();
 			var milliSecond = Math.floor(nowDate.getMilliseconds() / 10);
 			var nowTime = hour * 60 * 60 * 100 + minutes * 60 * 100 + second * 100 + milliSecond;

 			var time = nowTime - Game1Player.startTime;

 			var h = Math.floor(time / (60 * 60 * 100));
 			time = time - (h * 60 * 60 * 100);
 			var m = Math.floor(time / (60 * 100));
 			time = time - (m * 60 * 100);
 			var s = Math.floor(time / 100);
 			var t = time % 100;

 			//経過時間が1桁であれば10の位に "0" を加える
 			var hs = (h < 10)? "0" + String(h): String(h);
 			var ms = (m < 10)? "0" + String(m): String(m);
 			var ss = (s < 10)? "0" + String(s): String(s);
 			var ts = (t < 10)? "0" + String(t): String(t);

 			document.getElementsByClassName("timeCounter")[0].innerHTML = hs + ":" + ms + ":" + ss + "\'" + ts;

 		};

 		/**
 		 * 時間計測を開始、または停止する
 		 */
 		var timeCountStartOrStop = function() {
 			if(Game1Player.onStart){
 				//スタート時刻を設定する
 				var startDate = new Date();
 				var hour = startDate.getHours();
 				var minutes = startDate.getMinutes();
 				var second = startDate.getSeconds();
 				var milliSecond = Math.floor(startDate.getMilliseconds() / 10);
 				Game1Player.startTime = hour * 60 * 60 * 100 + minutes * 60 * 100 + second * 100 + milliSecond;
 				Game1Player.onStart = false;
 			}else{
 				//終了の場合
 				clearInterval(Game1Player.timer);
 			}

 		};

 		/**
 		 * 数値選択ボックスを作成する
 		 */
 		var createNumSelectBox = function() {
 			var fieldSet = document.querySelector("#guessNum");
 			for (var i = 0; i < Game1Player.prototype.NUMBER_DIGITS; i++) {
 				var button = document.createElement("button");
 				var img = document.createElement("img");
 				img.setAttribute("src", "img/0.png");
 				img.setAttribute("value", "0");
 				button.setAttribute("class", "numSelectBox");
 				button.setAttribute("id", "rank_" + (i+1));
 				button.addEventListener("click",
 						function(ev){
 					var rankId = ev.currentTarget.id;
 					selectNumMenu(rankId);
 				}, false);
 				button.appendChild(img);
 				fieldSet.appendChild(button);
 			}
 		};

 		/**
 		 * 数値選択メニューを表示する
 		 */
 		var selectNumMenu = function(rankId){
 			document.getElementById('overlay').style.display = 'block';
 			var overlay = document.querySelector("#overlay");
 			var div = document.createElement("div");
 			div.setAttribute("class","selectNumMenuBox");
 			while (overlay.firstChild) {
 				//初期化
 				overlay.removeChild(overlay.firstChild);
 			}
 			for (var i = 1; i <= 10; i++) {
 				if(i % 3 === 1){
 					var p = document.createElement("p");
 					p.setAttribute("class","selectNumMenu")
 				}
 				var button = document.createElement("button");
 				var img = document.createElement("img");
 				var num = (i === 10)? 0 : i;
 				img.setAttribute("src", "img/" + num +".png");
 				img.setAttribute("value", num);
 				button.setAttribute("class", "numSelectBox");
 				button.setAttribute("id", "button_" + num);
 				button.addEventListener("click",
 						function(ev){
 					var selectNum = ev.currentTarget.id.slice(-1);
 					onSelectNumMenu(selectNum,rankId);
 				}, false);
 				button.appendChild(img);
 				p.appendChild(button);
 				if(i % 3){
 					div.appendChild(p);
 				}
 			}
 			overlay.appendChild(div);
 		};

 		/**
 		 * 数値選択メニューで値を選択する
 		 */
 		var onSelectNumMenu = function(num,rankId){
 			var button = document.querySelector("#" + rankId);
 			while (button.firstChild) {
 				//初期化
 				button.removeChild(button.firstChild);
 			}

 			var img = document.createElement("img");
 			img.setAttribute("src", "img/" + num +".png");
 			img.setAttribute("value", num);
 			button.appendChild(img);
 		};

 		/**
 		 * コンポーネントにイベントを追加する
 		 */
 		var buttonSetting = function() {
 			// ボタンイベント追加
 			var guessButton = document.querySelector('#guessButton');
 			document.getElementById("guessButton").innerHTML = _("numbers_guess_button_title");
 			guessButton.addEventListener("click", guess, false);
 			var answerButton = document.querySelector('#answerButton');
 			document.getElementById("answerButton").innerHTML = _("numbers_answer_button_title");
 			answerButton.addEventListener("click", answer, false);
 		};

 		/**
 		 * 乱数生成関数(private)
 		 *
 		 * @return {String} target_number 当てる対象の整数
 		 */
 		var createRandumNumber = function() {
 			// Math.random()*(最大値-最小値)+最小値 という計算で範囲内のrandom数を1桁ずつ得る。
 			// 今回は0〜9
 			var target_number = "";
 			var random;

 			for (; target_number.length < Game1Player.prototype.NUMBER_DIGITS;) {
 				random = String(Math.floor(Math.random() * 10));
 				if (random.match(/^[0-9]$/)) {
 					if (target_number === "") {
 						// target_numberが空なら無条件でrandom数を入力
 						target_number = random;
 					} else {
 						// target_numberの2個目以降を考える場合はダブりを考慮する
 						var strs = target_number.split('');
 						var isDuplication = false; // 重複しているかどうか
 						for (var i = 0; i < strs.length; i++) {
 							if (strs[i] === random) {
 								isDuplication = true;
 							}
 						}
 						if (isDuplication) {
 							// 重複していたら再びrandomを作り直す
 							continue;
 						} else {
 							target_number += random;
 						}
 					}
 				}
 			}
 			return target_number;
 		};

 		/**
 		 * Hit数やBlow数計算関数(private)
 		 *
 		 * @param {String}
 		 *            target_number 当てる対象の数字
 		 * @param {String}
 		 *            guess_number 推測した数字
 		 * @return {array} result_array 結果一覧
 		 */
 		var matching = function(target_number, guess_number) {
 			var target_number_array = target_number.split('');
 			var guess_number_array = guess_number.split('');

 			var result_array = {
 					"isResult" : false,
 					"HitNum" : 0,
 					"BlowNum" : 0
 			};

 			for (var i = 0; i < Game1Player.prototype.NUMBER_DIGITS; i++) {
 				// iはguess_num_arrayの要素番号
 				for (var j = 0; j < Game1Player.prototype.NUMBER_DIGITS; j++) {
 					// jはtarget_num_arrayの要素番号
 					if (guess_number_array[i] === target_number_array[j]) {
 						if (i === j) {
 							result_array["HitNum"] += 1;
 						} else {
 							result_array["BlowNum"] += 1;
 						}
 						break;
 					}
 				}
 			}

 			if (result_array["HitNum"] === Game1Player.prototype.NUMBER_DIGITS) {
 				// すべてがhit状態である場合
 				result_array["isResult"] = true;
 			} else {
 				result_array["isResult"] = false;
 			}

 			return result_array;
 		};

 		/**
 		 * guessボタンを押下時の処理(private)
 		 */
 		var guess = function() {
 			var guess_number = "";

 			var node = document.getElementById("guessNum");
 			// guess_number = "";

 			for (var i = 0; i < Game1Player.prototype.NUMBER_DIGITS; i++) {
 				if (guess_number === "") {
 					// guess_numberが空なら無条件で1番目の選択値を入力
 					guess_number = node.children[i].children[0].getAttribute("value");
 					// guess_number_array[0] = guess_number;
 				} else {
 					// guess_numberの2個目以降を考える場合はダブりを考慮する
 					var strs = guess_number.split('');
 					var isDuplication = false; // 重複しているかどうか
 					for (var j = 0; j < strs.length; j++) {
 						if (strs[j] === node.children[i].children[0].getAttribute("value")) {
 							isDuplication = true;
 						}
 					}
 					if (isDuplication) {
 						// 重複していたらalertを表示する
 						alert(_("numbers_digits_error"));
 						return;
 					} else {
 						guess_number += node.children[i].children[0].getAttribute("value");
 					}
 				}
 			}

 			var result = matching(Game1Player.target_number, guess_number);
 			Game1Player.guessTimes += 1;
 			if (result["isResult"]) {
 				timeCountStartOrStop();
 				alert(_("numbers_guess_successful"));
 			} else {
 				var label = new Label();
 				var fillMsg = [Game1Player.guessTimes, guess_number, result["HitNum"], result["BlowNum"]];
 				document.getElementById("history").innerHTML += label.fillBlank(_("numbers_guess_result_history"),fillMsg) + "<br>"
 			}
 		};

 		/**
 		 * answerボタンを押下時の処理(private)
 		 */
 		var answer = function() {
 			var end = confirm(_("numbers_answer_disp_confirm"));
 			if (end === true) {
 				timeCountStartOrStop();
 				var label = new Label();
 				alert(label.fillBlank(_("numbers_answer_display"),[Game1Player.target_number]));
 				window.location.href = window.location.href;
 			}
 		};
 	};

 	// 桁数(定数)
 	Game1Player.prototype.NUMBER_DIGITS = 4;
 	// 当てる対象の整数(static)
 	Game1Player.target_number;
 	// 推測回数(static)
 	Game1Player.guessTimes = 0;
 	// スタートかどうか(static)
 	Game1Player.onStart = true;
 	// スタートの時間
 	Game1Player.startTime;
 	Game1Player.timer;

 	window.Game1Player = Game1Player;
 }());
