class GameObject {
  constructor(config) {
    this.x = config.x || 0;
    this.y = config.y || 0;
    this.direction = config.direction || "down";
    this.sprite = new Sprite({
      gameObject: this,
      image: config.image || "./assets/images/characters/people/hero.png",
    });
  }

  mount(map) {
    this.isMounted = true;
    map.addWall(this.x, this.y);
  }

  update() {}
}
