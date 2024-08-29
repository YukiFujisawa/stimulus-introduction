import {
  Application,
  Controller,
} from "https://unpkg.com/@hotwired/stimulus/dist/stimulus.js";

// Stimulusアプリケーションを初期化
const application = Application.start();

// HelloControllerを定義
class HelloController extends Controller {
  static targets = ["output"];

  connect() {
    this.outputTarget.textContent = "こんにちは、Stimulus!";
  }

  greet() {
    this.outputTarget.textContent = "こんにちは、世界!";
  }
}

// コントローラーを登録
application.register("hello", HelloController);

// 日本語コメント：
// このファイルはStimulusアプリケーションを初期化し、
// HelloControllerを定義して登録しています。
// connect()メソッドは要素が接続されたときに呼び出され、
// greet()メソッドはボタンがクリックされたときに呼び出されます。
