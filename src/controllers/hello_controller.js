import { Controller } from "https://unpkg.com/@hotwired/stimulus/dist/stimulus.js";

export default class HelloController extends Controller {
  static targets = ["output"];

  connect() {
    this.outputTarget.textContent = "ここが変わるよ!";
  }

  greet() {
    this.outputTarget.textContent = "Hello, Stimulus!";
  }
}
