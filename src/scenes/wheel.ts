import { Container, Sprite, Assets, Application } from "pixi.js";

export class Wheel extends Container {
  app: Application;
  wheel: Sprite;
  marker: Sprite;
  spinButton: Sprite;
  spinDataUrl: string;

  constructor(app: Application, spinDataUrl: string) {
    super();
    this.app = app;
    this.spinDataUrl = spinDataUrl;

    Assets.add("wheel", "assets/wheels/wheel.png");
    Assets.add("marker", "assets/wheels/marker.png");
    Assets.add("spinButton", "assets/wheels/btn-spin.png");

    Assets.load(["wheel", "marker", "spinButton"]).then(this.setup.bind(this));
  }
  setup() {
    // Create the wheel
    this.wheel = new Sprite(Assets.get("wheel"));
    this.wheel.anchor.set(0.5);
    this.wheel.x = this.app.renderer.width / 2 + 700;
    this.wheel.y = this.app.renderer.height / 2;
    this.addChild(this.wheel);

    // Create the marker
    this.marker = new Sprite(Assets.get("marker"));
    this.marker.anchor.set(0.5, 0);
    this.marker.x = this.wheel.x;
    this.marker.y = this.wheel.y - this.wheel.height / 2 - 20;
    this.addChild(this.marker);

    // Create the spin button
    this.spinButton = new Sprite(Assets.get("spinButton"));
    this.spinButton.anchor.set(0.5);
    this.spinButton.x = this.app.renderer.width / 2 + 700;
    this.spinButton.y = this.wheel.y + this.wheel.height / 2 + 50;
    this.spinButton.interactive = true;
    this.spinButton.on("click", this.spin.bind(this));
    this.addChild(this.spinButton);
  }

  async spin() {
    try {
      const response = await fetch(this.spinDataUrl);
      const data = await response.json();
      const position = data.POSITION;
      this.spinWheel(position);
    } catch (error) {
      console.error("Error fetching spin data:", error);
    }
  }

  spinWheel(position: number) {
    const anglePerSection = 360 / 4; // Assuming 4 sections for simplicity
    const targetAngle = position * anglePerSection;

    const spins = 5; // Number of spins before stopping
    const finalAngle = spins * 360 + targetAngle; // Ensure it spins multiple times before stopping
    const duration = 3; // Duration of the spin in seconds

    let elapsed = 0;
    const startAngle = this.wheel.rotation;

    const animate = (delta: number) => {
      elapsed += delta;
      const progress = elapsed / (duration * 60); // Convert to frames

      if (progress >= 1) {
        this.wheel.rotation = (finalAngle * Math.PI) / 180;
        this.app.ticker.remove(animate);
      } else {
        this.wheel.rotation = startAngle + ((finalAngle - startAngle) * progress * Math.PI) / 180;
      }
    };

    this.app.ticker.add(animate);
  }
}
