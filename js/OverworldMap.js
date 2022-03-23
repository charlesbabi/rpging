class OverworldMap {
  constructor(config) {
    this.gameObjects = config.gameObjects;
    this.walls = config.walls || {};

    this.lowerImage = new Image();
    this.lowerImage.src = config.lowerSrc;

    if (config.upperSrc) {
      this.upperImage = new Image();
      this.upperImage.src = config.upperSrc;
    }

    this.isCutscenePlaying = false;
  }

  drawLowerImage(ctx, cameraPerson) {
    ctx.drawImage(
      this.lowerImage,
      utils.withGrid(10.5) - cameraPerson.x,
      utils.withGrid(6) - cameraPerson.y
    );
  }

  drawUpperImage(ctx, cameraPerson) {
    if (this.upperImage) {
      ctx.drawImage(
        this.upperImage,
        utils.withGrid(10.5) - cameraPerson.x,
        utils.withGrid(6) - cameraPerson.y
      );
    }
  }

  isSpaceTaken(currentX, currentY, direction) {
    const { x, y } = utils.nextPosition(currentX, currentY, direction);
    return this.walls[utils.getCoordinateFormat(x, y)] || false;
  }

  mountObjects() {
    Object.keys(this.gameObjects).forEach((key) => {
      let gameObject = this.gameObjects[key];
      gameObject.id = key;

      gameObject.mount(this);
    });
  }

  async startCutscene(events) {
    this.isCutscenePlaying = true;

    for (let i = 0; i < events.length; i++) {
      const eventHandler = new OverworldEvent({
        event: events[i],
        map: this,
      });
      await eventHandler.init();
    }

    this.isCutscenePlaying = false;

    //reset npc to do their normal behavior
    Object.values(this.gameObjects).forEach((gameObject) => {
      gameObject.doBehaviorEvent(this);
    });
  }

  addWall(x, y) {
    this.walls[utils.getCoordinateFormat(x, y)] = true;
  }

  removeWall(x, y) {
    delete this.walls[utils.getCoordinateFormat(x, y)];
  }

  moveWall(x, y, direction) {
    const { x: nextX, y: nextY } = utils.nextPosition(x, y, direction);
    this.removeWall(x, y);
    this.addWall(nextX, nextY);
  }
}

window.OverworldMaps = {
  DemoRoom: {
    lowerSrc: "./assets/images/maps/DemoLower.png",
    upperSrc: "./assets/images/maps/DemoUpper.png",
    gameObjects: {
      hero: new Person({
        x: utils.withGrid(5),
        y: utils.withGrid(6),
        image: "./assets/images/characters/people/hero.png",
        isPlayerControlled: true,
      }),
      npca: new Person({
        x: utils.withGrid(7),
        y: utils.withGrid(9),
        image: "./assets/images/characters/people/npc1.png",
        behaviorLoop: [
          { type: "stand", direction: "left", time: 800 },
          { type: "stand", direction: "up", time: 800 },
          { type: "stand", direction: "right", time: 300 },
          { type: "stand", direction: "up", time: 600 },
        ],
      }),
      npcb: new Person({
        x: utils.withGrid(5),
        y: utils.withGrid(4),
        image: "./assets/images/characters/people/npc2.png",
        behaviorLoop: [
          { type: "walk", direction: "down" },
          { type: "walk", direction: "left" },
          { type: "walk", direction: "up" },
          { type: "walk", direction: "right" },
          { type: "stand", direction: "down", time: 1200 },
        ],
      }),
    },
    walls: {
      //"16,16" : trus
      [utils.asGridCoord(7, 6)]: true,
      [utils.asGridCoord(8, 6)]: true,
      [utils.asGridCoord(7, 7)]: true,
      [utils.asGridCoord(8, 7)]: true,
    },
  },
  KitchenRoom: {
    lowerSrc: "./assets/images/maps/KitchenLower.png",
    upperSrc: "./assets/images/maps/KitchenUpper.png",
    gameObjects: {
      hero: new Person({
        x: utils.withGrid(5),
        y: utils.withGrid(6),
        image: "./assets/images/characters/people/hero.png",
        isPlayerControlled: true,
      }),
      npc1: new Person({
        x: utils.withGrid(6),
        y: utils.withGrid(8),
        image: "./assets/images/characters/people/npc1.png",
      }),
      npc2: new Person({
        x: utils.withGrid(3),
        y: utils.withGrid(4),
        image: "./assets/images/characters/people/npc2.png",
      }),
    },
  },
};
