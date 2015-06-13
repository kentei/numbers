/**
    Numbers#game.js

    Copyright (c) 2015 Kentei-Syunrai

    This software is released under the MIT License.
    http://opensource.org/licenses/mit-license.php
*/

var Game = (function () {
    'use strict';

    //コンストラクタ
    var Game = function () {
    };

    //当てる対象の整数
    Game.prototype.target_number;
    //桁数(現状は4桁だけ)
    Game.prototype.NUMBER_DIGITS = 4;
    Game.prototype.guessTimes = 0;

    //初期化処理
    Game.prototype.init = function () {
        this.target_number = this.createRandumNumber();
    };

    //乱数生成関数
    Game.prototype.createRandumNumber = function () {
        //Math.random()*(最大値-最小値)+最小値　という計算で範囲内のrandom数を1桁ずつ得る。
        //今回は0〜9
        var target_number = "";
        var random;

        for (; target_number.length < this.NUMBER_DIGITS; ) {
            random = String(Math.floor(Math.random() * 10));
            if (random.match(/^[0-9]$/)) {
                if (target_number === "") {
                    //target_numberが空なら無条件でrandom数を入力
                    target_number = random;
                } else {
                    //target_numberの2個目以降を考える場合はダブりを考慮する
                    var strs = target_number.split('');
                    var isDuplication = false;  //重複しているかどうか
                    for (var i = 0; i < strs.length; i++) {
                        if (strs[i] === random) {
                            isDuplication = true;
                        }
                    }
                    if (isDuplication) {
                        //重複していたら再びrandomを作り直す
                        continue;
                    } else {
                        target_number += random;
                    }
                }
            }
        }
        return target_number;
    };

//Hit数やBlow数計算関数
    Game.prototype.matching = function (target_number, guess_number) {
        var target_number_array = target_number.split('');
        var guess_number_array = guess_number.split('');

        var result_array = {
            "isResult":false,
            "HitNum": 0,
            "BlowNum": 0
        };

        for (var i = 0; i < this.NUMBER_DIGITS; i++) {
            //iはguess_num_arrayの要素番号
            for(var j = 0; j < this.NUMBER_DIGITS; j++){
                //jはtarget_num_arrayの要素番号
                if (guess_number_array[i] === target_number_array[j]) {
                    if(i === j){
                        result_array["HitNum"] += 1;
                    }else{
                        result_array["BlowNum"] += 1;
                    }
                    break;
                }
            }
        }

        if(result_array["HitNum"] === this.NUMBER_DIGITS){
            //すべてがhit状態である場合
            result_array["isResult"] = true;
        }else{
            result_array["isResult"] = false;
        }

        return result_array;
    };

    Game.prototype.guess = function () {
        var guess_number = "";

        var node = document.getElementById("guessNum");
        //guess_number = "";

        for (var i = 0; i < this.NUMBER_DIGITS; i++) {
            if (guess_number === "") {
                //guess_numberが空なら無条件で1番目の選択値を入力
                guess_number = node.children[i].options[node.children[i].selectedIndex].value;
                //guess_number_array[0] = guess_number;
            } else {
                //guess_numberの2個目以降を考える場合はダブりを考慮する
                var strs = guess_number.split('');
                var isDuplication = false;  //重複しているかどうか
                for (var j = 0; j < strs.length; j++) {
                    if (strs[j] === node.children[i].options[node.children[i].selectedIndex].value) {
                        isDuplication = true;
                    }
                }
                if (isDuplication) {
                    //重複していたらalertを表示する
                    alert("すべて異なる4桁の数にしてください");
                    return;
                } else {
                    guess_number += node.children[i].options[node.children[i].selectedIndex].value;
                }
            }
        }

        var result = this.matching(this.target_number, guess_number);
        this.guessTimes += 1;
        if(result["isResult"]){
            alert("正解です");
        }else{
            document.getElementById("history").value += this.guessTimes + "回目:" + guess_number + "　Hit:"+ result["HitNum"] + "　Blow:" + result["BlowNum"] + "\n";
        }
    };

    Game.prototype.answer = function () {
        var end = confirm("答えを表示した場合、ランキング登録はできませんが宜しいですか?");
        if (end === true) {
            alert("答えは" + this.target_number + "でした。\nOKボタンを押すと、新規でゲームがスタートします。");
            window.location.href = window.location.href;
        }
    };

    return Game;
})();
