class GameObject {
  constructor(config) {
    this.id = null;
    this.x = config.x || 0;
    this.y = config.y || 0;
    this.direction = config.direction || "down";
    this.sprite = new Sprite({
      gameObject: this,
      image: config.image || "./assets/images/characters/people/hero.png",
    });

    this.behaviorLoop = config.behaviorLoop || [];
    this.behaviorLoopIndex = 0;

    this.talking = config.talking || [];
  }

  mount(map) {
    this.isMounted = true;
    map.addWall(this.x, this.y);

    setTimeout(() => {
      this.doBehaviorEvent(map);
    }, 10);
  }

  update() {}

  async doBehaviorEvent(map) {
    if (
      map.isCutscenePlaying ||
      this.behaviorLoop.length === 0 ||
      this.isStanding
    ) {
      return;
    }

    //setting eventy with relevant info
    let eventConfig = this.behaviorLoop[this.behaviorLoopIndex];
    eventConfig.who = this.id;

    //create an event instance out of our next event
    const eventHandler = new OverworldEvent({ map, event: eventConfig });
    await eventHandler.init();

    //setting the next event to be executed
    this.behaviorLoopIndex += 1;
    if (this.behaviorLoopIndex >= this.behaviorLoop.length) {
      this.behaviorLoopIndex = 0;
    }

    this.doBehaviorEvent(map);
  }
}
