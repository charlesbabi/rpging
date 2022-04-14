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

  bindCharacterPositionCheck(characterId) {
    document.addEventListener("PersonWalkComplete", (e) => {
      if (e.detail.whoId === characterId) {
        this.map.checkForFootstepCutscene();
      }
    });
  }

  startMap(mapConfig) {
    this.map = new OverworldMap(mapConfig);
    this.map.overworld = this;
    this.map.mountObjects();
  }

  init() {
    this.startMap(window.OverworldMaps.Kitchen);

    this.bindActionInput();
    this.bindCharacterPositionCheck("hero");

    this.directionInput = new DirectionInput();
    this.directionInput.init();

    this.startGameLoop();

    this.map.startCutscene([
      { type: "battle" }, // remove this line to see how the battle works
      /* { type: "changeMap", map: "DemoRoom" },
      { type: "textMessage", text: "Welcome to my World!" }, */
    ]);
  }
}
