class Overworld {
  constructor(config) {
    this.element = config.element;
    this.canvas = this.element.querySelector(selectorCanvasContainer);
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
      Object.values(this.map.gameObjects)
        .sort((a, b) => {
          return a.y - b.y;
        })
        .forEach((gameObject) => {
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

  bindActionInput() {
    new KeyPressListener("Enter", () => {
      this.map.checkForActionCutscene();
    });
  }

  init() {
    this.map = new OverworldMap(window.OverworldMaps.DemoRoom);
    this.map.mountObjects();

    this.bindActionInput();

    this.directionInput = new DirectionInput();
    this.directionInput.init();

    this.startGameLoop();

    /* this.map.startCutscene([
      { who: "hero", type: "walk", direction: "down" },
      { who: "hero", type: "walk", direction: "down" },
      { who: "npca", type: "walk", direction: "up" },
      { who: "npca", type: "walk", direction: "left" },
      { who: "hero", type: "stand", direction: "right" },
      { type: "textMessage", text: "What are you doing?" },
      //{ who: "npca", type: "stand", direction: "up", time: 1000 },
    ]); */
  }
}
