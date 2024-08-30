import { Controller } from "https://unpkg.com/@hotwired/stimulus/dist/stimulus.js";

export default class extends Controller {
  static targets = [
    "template",
    "image",
    "title",
    "description",
    "category",
    "demo",
  ];

  connect() {
    if (this.isIndexPage()) {
      this.loadCards();
    }
    this.addBackButton();
  }

  isIndexPage() {
    return (
      window.location.pathname.endsWith("index.html") ||
      window.location.pathname.endsWith("/")
    );
  }

  loadCards() {
    const cards = [
      {
        image: "assets/hello.png",
        title: "Hello World 1",
        description: "Stimulusの基本的な使い方を学ぶシンプルなデモ1",
        category: "Stimulus 基礎1",
        demoLink: "src/view/hello.html",
      },
      {
        image: "assets/hello.png",
        title: "Hello World 2",
        description: "Stimulusの基本的な使い方を学ぶシンプルなデモ2",
        category: "Stimulus 基礎2",
        demoLink: "src/view/hello.html",
      },
      {
        image: "assets/hello.png",
        title: "Hello World 3",
        description: "Stimulusの基本的な使い方を学ぶシンプルなデモ3",
        category: "Stimulus 基礎3",
        demoLink: "src/view/hello.html",
      },
    ];

    cards.forEach((card) => this.createCard(card));
  }

  createCard(data) {
    const clone = this.templateTarget.content.cloneNode(true);

    clone.querySelector('[data-card-target="image"]').src = data.image;
    clone.querySelector('[data-card-target="title"]').textContent = data.title;
    clone.querySelector('[data-card-target="description"]').textContent =
      data.description;
    clone.querySelector('[data-card-target="category"]').textContent =
      data.category;
    clone.querySelector('[data-card-target="demo"]').href = data.demoLink;

    this.element.appendChild(clone);
  }

  addBackButton() {
    if (!this.isIndexPage()) {
      const backButton = document.createElement("a");
      backButton.href = "../../index.html";
      backButton.className =
        "fixed top-4 left-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition flex items-center";
      backButton.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
                </svg>
                戻る
            `;
      document.body.appendChild(backButton);
    }
  }
}
