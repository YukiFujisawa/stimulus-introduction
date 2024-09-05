import { Controller } from "https://unpkg.com/@hotwired/stimulus/dist/stimulus.js";

export default class extends Controller {
  connect() {
    this.animateDancer();
  }

  animateDancer() {
    const dancer = this.element.querySelector("#dancer");
    const hatContainer = this.element.querySelector("#hat-container");
    const leftArm = this.element.querySelector("#left-arm");
    const rightArm = this.element.querySelector("#right-arm");
    const leftLeg = this.element.querySelector("#left-leg");
    const rightLeg = this.element.querySelector("#right-leg");

    const bpm = 120;
    const beatDuration = 60000 / bpm;

    const easeOutBack = (t) => {
      const c1 = 1.70158;
      const c3 = c1 + 1;
      return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
    };

    const basicMoves = {
      sideStep: (t) => `translateX(${20 * Math.sin(t * Math.PI)}px)`,
      gentleJump: (t) =>
        `translateY(${-10 * Math.abs(Math.sin(t * Math.PI))}px)`,
      gracefulLean: (t) => `rotate(${5 * Math.sin(t * Math.PI)}deg)`,
    };

    const armMoves = {
      elegantWave: (t) => `rotate(${30 * Math.sin(t * Math.PI)}deg)`,
      gentleSway: (t) => `rotate(${-45 + 20 * Math.sin(t * Math.PI)}deg)`,
    };

    const legMoves = {
      smoothStep: (t) => `rotate(${15 * Math.sin(t * Math.PI)}deg)`,
      gracefulBend: (t) =>
        `rotate(${-10 + 10 * Math.abs(Math.sin(t * Math.PI))}deg)`,
    };

    const hatMoves = {
      subtleTilt: (t) => `rotate(${10 * Math.sin(t * Math.PI)}deg)`,
      gentleBob: (t) => `translateY(${-5 * Math.abs(Math.sin(t * Math.PI))}px)`,
    };

    // ダイナミックな縦ジャンプの実装
    const dynamicJump = {
      jump: (t) => {
        const jumpHeight = -150 * easeOutBack(1 - Math.abs(1 - 2 * t));
        const squash = 1 - 0.3 * Math.abs(Math.sin(t * Math.PI));
        return `translateY(${jumpHeight}px) scaleY(${squash}) scaleX(${
          1 / squash
        })`;
      },
      arms: (t) => `rotate(${-90 + 180 * Math.sin(t * Math.PI)}deg)`,
      legs: (t) => `rotate(${45 * Math.sin(t * Math.PI)}deg)`,
      hat: (t) =>
        `translateY(${-20 * Math.abs(Math.sin(t * Math.PI))}px) rotate(${
          20 * Math.sin(t * Math.PI * 2)
        }deg)`,
    };

    const generateMove = () => {
      const moves = [];

      // 約10%の確率でダイナミックジャンプを実行
      if (Math.random() < 0.1) {
        moves.push(dynamicJump.jump);
        moves.push((t) => ({
          leftArm: dynamicJump.arms(t),
          rightArm: dynamicJump.arms(t),
        }));
        moves.push((t) => ({
          leftLeg: dynamicJump.legs(t),
          rightLeg: dynamicJump.legs(t + 0.5),
        }));
        moves.push(dynamicJump.hat);
      } else {
        moves.push(
          basicMoves[
            Object.keys(basicMoves)[
              Math.floor(Math.random() * Object.keys(basicMoves).length)
            ]
          ]
        );
        const armMove =
          armMoves[
            Object.keys(armMoves)[
              Math.floor(Math.random() * Object.keys(armMoves).length)
            ]
          ];
        moves.push((t) => ({
          leftArm: armMove(t),
          rightArm: armMove(t + 0.5),
        }));
        const legMove =
          legMoves[
            Object.keys(legMoves)[
              Math.floor(Math.random() * Object.keys(legMoves).length)
            ]
          ];
        moves.push((t) => ({
          leftLeg: legMove(t),
          rightLeg: legMove(t + 0.5),
        }));
        moves.push(
          hatMoves[
            Object.keys(hatMoves)[
              Math.floor(Math.random() * Object.keys(hatMoves).length)
            ]
          ]
        );
      }

      const duration = 4 * beatDuration;
      moveEndTime = Date.now() + duration;

      return moves;
    };

    let currentMove = null;
    let moveEndTime = 0;

    const animate = () => {
      const now = Date.now();
      const elapsedTime = now - moveEndTime + 4 * beatDuration;
      const beatProgress = (elapsedTime % beatDuration) / beatDuration;
      const smoothProgress = easeOutBack(beatProgress);

      if (now >= moveEndTime || currentMove === null) {
        currentMove = generateMove();
      }

      let dancerTransform = "";
      let leftArmTransform = "";
      let rightArmTransform = "";
      let leftLegTransform = "";
      let rightLegTransform = "";
      let hatTransform = "";

      currentMove.forEach((move) => {
        if (typeof move === "function") {
          const result = move(smoothProgress);
          if (typeof result === "string") {
            if (move === dynamicJump.jump) {
              dancerTransform = result;
            } else {
              dancerTransform += result + " ";
            }
          } else {
            if (result.leftArm) leftArmTransform += result.leftArm + " ";
            if (result.rightArm) rightArmTransform += result.rightArm + " ";
            if (result.leftLeg) leftLegTransform += result.leftLeg + " ";
            if (result.rightLeg) rightLegTransform += result.rightLeg + " ";
          }
        }
      });

      dancer.style.transform = dancerTransform;
      leftArm.style.transform = leftArmTransform;
      rightArm.style.transform = rightArmTransform;
      leftLeg.style.transform = leftLegTransform;
      rightLeg.style.transform = rightLegTransform;
      hatContainer.style.transform = hatTransform;

      requestAnimationFrame(animate);
    };

    animate();
  }
}
