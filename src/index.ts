import { Application } from 'pixi.js';
import { Showdown } from './scenes/showdown';
import { Wheel } from './scenes/wheel';

const initPixiApplication = () => {
  const app = new Application({
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: 0x000000,
  });
  document.body.appendChild(app.view as HTMLCanvasElement);

  const showdown = new Showdown(app);
  app.stage.addChild(showdown);

  // Instantiate the Wheel class
  const spinDataUrl = 'data/spin.json'; // The static JSON file containing spin results
  const wheel = new Wheel(app, spinDataUrl);
  app.stage.addChild(wheel);

  // Change the canvas size on every resize so that things won't be stretched
  window.addEventListener('resize', () => {
    app.renderer.resize(window.innerWidth, window.innerHeight);
    showdown.width = window.innerWidth;
    showdown.height = window.innerHeight;
    showdown.mustDrop.x = app.renderer.width / 2 - showdown.mustDrop.width / 2;
    showdown.mustDrop.y = app.renderer.height - 100;
  
    wheel.width = window.innerWidth;
    wheel.height = window.innerHeight;
    wheel.wheel.x = app.renderer.width / 2;
    wheel.wheel.y = app.renderer.height / 2;
    wheel.marker.x = wheel.wheel.x;
    wheel.marker.y = wheel.wheel.y - wheel.wheel.height / 2 - 20;
    wheel.spinButton.x = app.renderer.width / 2;
    wheel.spinButton.y = wheel.wheel.y + wheel.wheel.height / 2 + 50;
  });

  return app;
};

const main = () => {
  const app = initPixiApplication();
};

// Use setTimeout instead of calling main directly to give some time for the event loop to run
setTimeout(main, 0);
