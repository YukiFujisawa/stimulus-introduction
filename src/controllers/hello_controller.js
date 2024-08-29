import { Controller } from "https://unpkg.com/@hotwired/stimulus/dist/stimulus.js";

export default class HelloController extends Controller {
  static targets = ["output"];

  connect() {
    this.outputTarget.textContent = "こんにちは、Stimulus!";
  }

  greet() {
    this.outputTarget.textContent = "こんにちは、世界!";
  }
}
