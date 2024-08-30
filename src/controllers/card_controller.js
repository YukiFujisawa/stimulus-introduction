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
    this.loadCards();
  }

  loadCards() {
    const cards = [
      {
        image: "path/to/profile-image.jpg",
        title: "タイトル",
        description: "説明",
        category: "カテゴリ",
        demoLink: "#",
      },
      {
        image: "path/to/photo-book-image.jpg",
        title: "タイトル",
        description: "説明",
        category: "カテゴリ",
        demoLink: "#",
      },
      // 他のカードデータをここに追加
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
}
