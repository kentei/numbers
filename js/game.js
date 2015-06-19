/**
 * Numbers#game.js
 *
 * Copyright (c) 2015 Kentei-Syunrai
 *
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 */

window.onload = function() {
	var game = new Game();
	game.init();
  //setInterval("game.timeCount()",10);
};

(function() {
	'use strict';
	var Game = function() {

		/**
		 * 初期化処理(public)
		 */
		this.init = function() {
			Game.target_number = createRandumNumber();
			createNumSelectBox();
			addEvent();
      timeCountStartOrStop();  //スタート
      Game.timer = setInterval(timeCount, 10);
		};

    var timeCount = function(){
      //現在時刻
      var nowDate = new Date();
      var hour = nowDate.getHours();
      var minutes = nowDate.getMinutes();
      var second = nowDate.getSeconds();
      var milliSecond = Math.floor(nowDate.getMilliseconds() / 10);
      var nowTime = hour * 60 * 60 * 100 + minutes * 60 * 100 + second * 100 + milliSecond;

      var time = nowTime - Game.startTime;

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

    var timeCountStartOrStop = function() {
      if(Game.onStart){
        //スタート時刻を設定する
        var startDate = new Date();
        var hour = startDate.getHours();
        var minutes = startDate.getMinutes();
        var second = startDate.getSeconds();
        var milliSecond = Math.floor(startDate.getMilliseconds() / 10);
        Game.startTime = hour * 60 * 60 * 100 + minutes * 60 * 100 + second * 100 + milliSecond;
        Game.onStart = false;
      }else{
        //終了の場合
        clearInterval(Game.timer);
      }

    };

		/**
		 * 数値選択ボックスを作成する
		 */
		var createNumSelectBox = function() {
			for (var i = 0; i < Game.prototype.NUMBER_DIGITS; i++) {
				var fieldSet = document.querySelector("#guessNum");
				var select = document.createElement("select");
				select.setAttribute("class", "numSelectBox");
				for (var j = 0; j < 10; j++) {
					var option = document.createElement("option");
					option.setAttribute("value", j);
					option.innerHTML = j;
					select.appendChild(option);
				}

				fieldSet.appendChild(select);
			}
		};

		/**
		 * コンポーネントにイベントを追加する
		 */
		var addEvent = function() {
			// ボタンイベント追加
			var guessButton = document.querySelector('#guessButton');
			guessButton.addEventListener("click", guess, false);
			var answerButton = document.querySelector('#answerButton');
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

			for (; target_number.length < Game.prototype.NUMBER_DIGITS;) {
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

			for (var i = 0; i < Game.prototype.NUMBER_DIGITS; i++) {
				// iはguess_num_arrayの要素番号
				for (var j = 0; j < Game.prototype.NUMBER_DIGITS; j++) {
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

			if (result_array["HitNum"] === Game.prototype.NUMBER_DIGITS) {
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

			for (var i = 0; i < Game.prototype.NUMBER_DIGITS; i++) {
				if (guess_number === "") {
					// guess_numberが空なら無条件で1番目の選択値を入力
					guess_number = node.children[i].options[node.children[i].selectedIndex].value;
					// guess_number_array[0] = guess_number;
				} else {
					// guess_numberの2個目以降を考える場合はダブりを考慮する
					var strs = guess_number.split('');
					var isDuplication = false; // 重複しているかどうか
					for (var j = 0; j < strs.length; j++) {
						if (strs[j] === node.children[i].options[node.children[i].selectedIndex].value) {
							isDuplication = true;
						}
					}
					if (isDuplication) {
						// 重複していたらalertを表示する
						alert("すべて異なる4桁の数にしてください");
						return;
					} else {
						guess_number += node.children[i].options[node.children[i].selectedIndex].value;
					}
				}
			}

			var result = matching(Game.target_number, guess_number);
			Game.guessTimes += 1;
			if (result["isResult"]) {
        timeCountStartOrStop();
				alert("正解です");
			} else {
				document.getElementById("history").innerHTML += Game.guessTimes
						+ "回目:" + guess_number + "　Hit:" + result["HitNum"]
						+ "　Blow:" + result["BlowNum"] + "<br>";
			}
		};

		/**
		 * answerボタンを押下時の処理(private)
		 */
		var answer = function() {
			var end = confirm("答えを表示した場合、ランキング登録はできませんが宜しいですか?");
			if (end === true) {
        timeCountStartOrStop();
				alert("答えは" + Game.target_number
						+ "でした。\nOKボタンを押すと、新規でゲームがスタートします。");
				window.location.href = window.location.href;
			}
		};
	};

	// 桁数(定数)
	Game.prototype.NUMBER_DIGITS = 4;
	// 当てる対象の整数(static)
	Game.target_number;
	// 推測回数(static)
	Game.guessTimes = 0;
  // スタートかどうか(static)
	Game.onStart = true;
  // スタートの時間
  Game.startTime;
  Game.timer;

	window.Game = Game;
}());
