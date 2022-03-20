class Overworld {
  constructor(config) {
    this.element = config.element;
    this.canvas = this.element.querySelector(".game-canvas");
    this.ctx = this.canvas.getContext("2d");
  }

  startGameLoop() {
    const step = () => {
      //clear canvas
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      //camera
      const cameraPerson = this.map.gameObjects.hero;

      //calculating new position
      Object.values(this.map.gameObjects).forEach((gameObject) => {
        gameObject.update({
          arrow: this.directionInput.direction,
          map: this.map,
        });
      });

      //drawing
      //lower map
      this.map.drawLowerImage(this.ctx, cameraPerson);

      //game objects
      Object.values(this.map.gameObjects).forEach((gameObject) => {
        gameObject.sprite.draw(this.ctx, cameraPerson);
      });

      //upper map
      this.map.drawUpperImage(this.ctx, cameraPerson);
      requestAnimationFrame(() => {
        step();
      });
    };

    step();
  }
  init() {
    this.map = new OverworldMap(window.OverworldMaps.DemoRoom);
    this.map.mountObjects();
    console.log(this.maps)
    this.directionInput = new DirectionInput();
    this.directionInput.init();

    this.startGameLoop();
  }
}
