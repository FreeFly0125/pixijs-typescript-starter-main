import { Application } from 'pixi.js';
import { Showdown } from './scenes/showdown';


const initPixiApplication = () => {
  const app = new Application({
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: 0x000000,
  });
  document.body.appendChild(app.view as HTMLCanvasElement);

  const showdown = new Showdown(app);
  app.stage.addChild(showdown);


  // Change the canvas size on every resize so that things won't be stretched
  window.addEventListener('resize', () => {
    app.renderer.resize(window.innerWidth, window.innerHeight);
    showdown.width = window.innerWidth;
    showdown.height = window.innerHeight;
    showdown.mustDrop.x = app.renderer.width / 2 - showdown.mustDrop.width / 2;
    showdown.mustDrop.y = app.renderer.height - 100;
  
  });

  return app;
};

const main = () => {
  const app = initPixiApplication();
};

// Use setTimeout instead of calling main directly to give some time for the event loop to run
setTimeout(main, 0);
