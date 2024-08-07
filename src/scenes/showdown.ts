import {
  Application,
  Container,
  Sprite,
  Assets,
  Text,
  TextStyle,
} from "pixi.js";

export class Showdown extends Container {
  app: Application;
  bolt: Sprite;
  boltOff: Sprite;
  letters: Sprite[] = [];
  mustDrop: Sprite;
  header: Sprite;
  vegas: Sprite;
  slots: Sprite;

  constructor(app: Application) {
    super();
    this.app = app;

    
    Assets.add('bolt', 'assets/showdown/bolt@2x.png');
    Assets.add('boltOff', 'assets/showdown/bolt-off@2x.png');
    Assets.add('d', 'assets/showdown/d@2x.png');
    Assets.add('h', 'assets/showdown/h@2x.png');
    Assets.add('n', 'assets/showdown/n@2x.png');
    Assets.add('o1', 'assets/showdown/o-1@2x.png');
    Assets.add('o2', 'assets/showdown/o-2@2x.png');
    Assets.add('s', 'assets/showdown/s@2x.png');
    Assets.add('w1', 'assets/showdown/w-1@2x.png');
    Assets.add('w2', 'assets/showdown/w-2@2x.png');
    Assets.add('header', 'assets/showdown/header.png');
    Assets.add('mustDrop', 'assets/showdown/must_drop.png');
    Assets.add('slots', 'assets/showdown/slots@2x.png');
    Assets.add('vegas', 'assets/showdown/vegas@2x.png');
    Assets.add('showdown', 'assets/showdown/showdown-off.png');

    Assets.load([
      "bolt",
      "boltOff",
      "d",
      "h",
      "n",
      "o1",
      "o2",
      "s",
      "w1",
      "w2",
      "header",
      "mustDrop",
      "slots",
      "vegas",
      "showdown",
    ]).then(this.setup.bind(this));
  }

  setup() {
    // Create the header and must drop elements
    const header = new Sprite(Assets.get("header"));
    header.x = 0;
    header.y = 0;
    this.addChild(header);

    const showdown = new Sprite(Assets.get("showdown"));
    showdown.x = this.app.renderer.width / 2 - header.width / 2;
    showdown.y = 100;
    this.addChild(showdown);

    // Create and position the letters
    const lettersPositions = ["s", "h", "o1", "w1", "d", "o2", "w2", "n"];
    lettersPositions.forEach((name, index) => {
      const sprite = new Sprite(Assets.get(name));
      sprite.x =
        this.app.renderer.width / 2 - sprite.width / 2 + (index - 1) * 95 - 550;
      sprite.y = 100;
      this.addChild(sprite);
      this.letters.push(sprite);
    });

    const mustDrop = new Sprite(Assets.get("mustDrop"));
    mustDrop.x = this.app.renderer.width / 2 - header.width / 2 - 100;
    mustDrop.y = 300;
    mustDrop.visible = false;
    this.addChild(mustDrop);
    this.mustDrop = mustDrop;

    // Create the bolt
    const bolt = new Sprite(Assets.get("bolt"));
    const boltOff = new Sprite(Assets.get("boltOff"));
    bolt.x = boltOff.x = this.app.renderer.width / 2 - bolt.width / 2 - 300;
    bolt.y = boltOff.y = 50;
    this.addChild(bolt);
    this.bolt = bolt;
    this.boltOff = boltOff;

    // Create the text sprites
    const vegas = new Sprite(Assets.get("vegas"));
    vegas.x = this.app.renderer.width / 2 - vegas.width / 2 - 485;
    vegas.y = 100;
    this.addChild(vegas);
    this.vegas = vegas;

    const slots = new Sprite(Assets.get("slots"));
    slots.x = vegas.x + vegas.width + 20;
    slots.y = 100;
    this.addChild(slots);
    this.slots = slots;

    // Start the animation
    this.startAnimation();
  }

  startAnimation() {
    // Animate the letters one by one
    this.letters.forEach((letter, index) => {
      letter.visible = false;
      setTimeout(() => {
        index++;
        letter.visible = true;
        this.app.renderer.render(this);
      }, index * 200);
    });

    // Blink the  // Blink the vegas
    setTimeout(() => {
        const vegasInterval = setInterval(() => {
          this.vegas.visible = !this.vegas.visible;
          this.slots.visible = !this.slots.visible;
          this.app.renderer.render(this);
        }, 300);
  
        setTimeout(() => {
          clearInterval(vegasInterval);
          this.vegas.visible = true; // Ensure it's visible after stopping the interval
          this.slots.visible = true; // Ensure it's visible after stopping the interval
          this.app.renderer.render(this);
        }, 1000);
      }, 0);
      
    // Blink the header
    setTimeout(() => {
      const mustDropInterval = setInterval(() => {
        this.mustDrop.visible = !this.mustDrop.visible;
        this.app.renderer.render(this);
      }, 100);

      setTimeout(() => {
        clearInterval(mustDropInterval);
        this.mustDrop.visible = true; // Ensure it's visible after stopping the interval
        this.app.renderer.render(this);
      }, 1000);
    }, 1500);



    // Flicker the lightning bolt
    setInterval(() => {
      this.bolt.visible = !this.bolt.visible;
      this.app.renderer.render(this);
    }, 100);
  }
}
