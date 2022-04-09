class Battle {
  constructor(config) {
    this.combatants = {
      player1: new Combatant(
        {
          ...Monsters.bat,
          team: "player",
          name: "player1",
          hp: 50,
          maxHp: 50,
          xp: 25,
          maxXp: 100,
          level: 1,
          status: {
            type: "clumsy",
            expiresIn: 3,
          },
        },
        this
      ),
      enemy1: new Combatant(
        {
          ...Monsters.frog,
          team: "enemy",
          name: "enemy1",
          hp: 50,
          maxHp: 50,
          xp: 10,
          maxXp: 100,
          level: 1,
          status: {
            type: "clumsy",
            expiresIn: 3,
          },
        },
        this
      ),
      enemy2: new Combatant(
        {
          ...Monsters.ghost,
          team: "enemy",
          name: "enemy2",
          hp: 50,
          maxHp: 50,
          xp: 0,
          maxXp: 100,
          level: 1,
          status: {
            type: "clumsy",
            expiresIn: 3,
          },
        },
        this
      ),
    };
    this.activeCombatants = {
      player: "player1",
      enemy: "enemy1",
    };
  }

  createElement() {
    this.element = document.createElement("div");
    this.element.classList.add("Battle");
    this.element.innerHTML = `
    <div class="Battle_hero">
      <img src="assets/images/characters/people/hero.png" alt="hero">
    </div>
    <div class="Battle_enemy">
      <img src="assets/images/characters/people/npc1.png" alt="hero">
    </div>
    `;
  }

  init(container) {
    this.createElement();
    container.appendChild(this.element);

    Object.keys(this.combatants).forEach((key) => {
      let combatant = this.combatants[key];
      combatant.id = key;
      combatant.init(this.element);
    });
  }
}
