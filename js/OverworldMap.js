class OverworldMap {
  constructor(config) {
    this.gameObjects = config.gameObjects;

    this.lowerImage = new Image();
    this.lowerImage.src = config.lowerSrc;

    this.upperImage = new Image();
    this.upperImage.src = config.upperSrc;
  }

  drawLowerImage(ctx) {
    ctx.drawImage(this.lowerImage, 0, 0);
  }

  drawUpperImage(ctx) {
    ctx.drawImage(this.upperImage, 0, 0);
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
        isPlayerControlled: true
      }),
      npc1: new Person({
        x: utils.withGrid(6),
        y: utils.withGrid(8),
        image: "./assets/images/characters/people/npc1.png",
      }),
    },
  },
  KitchenRoom: {
    lowerSrc: "./assets/images/maps/KitchenLower.png",
    upperSrc: "./assets/images/maps/KitchenUpper.png",
    gameObjects: {
      hero: new GameObject({
        x: 6,
        y: 6,
      }),
      npc1: new GameObject({
        x: 6,
        y: 8,
        image: "./assets/images/characters/people/npc1.png",
      }),
    },
  },
};