import { Application } from "https://unpkg.com/@hotwired/stimulus/dist/stimulus.js";
import HelloController from "./controllers/hello_controller.js";

// Stimulusアプリケーションを初期化
const application = Application.start();
application.register("hello", HelloController);
