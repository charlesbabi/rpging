class Combatant {
  constructor(config, battle) {
    Object.keys(config).forEach((key) => {
      this[key] = config[key];
    });
    this.battle = battle;
  }

  createElement() {
    this.hudElement = document.createElement("div");
    this.hudElement.classList.add("Combatant");
    this.hudElement.setAttribute("data-combatant", this.id);
    this.hudElement.setAttribute("data-team", this.team);
    this.hudElement.innerHTML = `
      <p class="Combatant_name">${this.name}</p>
      <p class="Combatant_level"></p>
      <div class="Combatant_character_crop">
        <img class="Combatant_character" alt="${this.name}" src="${this.src}" />
      </div>
      <img class="Combatant_type" src="${this.icon}" alt="${this.type}" />
      <svg viewBox="0 0 26 3" class="Combatant_life-container">
        <rect x=0 y=0 width="0%" height=1 fill="#82ff71" />
        <rect x=0 y=1 width="0%" height=2 fill="#3ef126" />
      </svg>
      <svg viewBox="0 0 26 2" class="Combatant_xp-container">
        <rect x=0 y=0 width="0%" height=1 fill="#ffd76a" />
        <rect x=0 y=1 width="0%" height=1 fill="#ffc934" />
      </svg>
      <p class="Combatant_status"></p>
    `;

    this.monsterElement = document.createElement("div");
    this.monsterElement.classList.add("Monster");
    this.monsterElement.style.width = this.sprite.width + "px";
    this.monsterElement.style.height = this.sprite.height + "px";
    this.monsterElement.style.backgroundImage = `url(${this.src})`;
    this.monsterElement.setAttribute("alt", this.name);
    this.monsterElement.setAttribute("data-team", this.team);

    this.hpFills = this.hudElement.querySelectorAll(
      ".Combatant_life-container > rect"
    );
    this.xpFills = this.hudElement.querySelectorAll(
      ".Combatant_xp-container > rect"
    );
  }

  get hpPercent() {
    const percent = (this.hp / this.maxHp) * 100;
    return percent > 0 ? percent : 0;
  }

  get xpPercent() {
    const percent = (this.xp / this.maxXp) * 100;
    return percent > 0 ? percent : 0;
  }

  get isActive() {
    return this.id === this.battle.activeCombatants[this.team];
  }

  update(changes = {}) {
    Object.keys(changes).forEach((key) => {
      this[key] = changes[key];
    });

    this.hpFills.forEach((rect) => (rect.style.width = `${this.hpPercent}%`));
    this.xpFills.forEach((rect) => (rect.style.width = `${this.xpPercent}%`));

    this.hudElement.setAttribute("data-active", this.isActive);
    this.monsterElement.setAttribute("data-active", this.isActive);

    this.hudElement.querySelector(".Combatant_name").innerHTML = this.name;
    this.hudElement.querySelector(".Combatant_level").innerText = this.level;
    this.hudElement.querySelector(".Combatant_character").src = this.src;
    this.hudElement.querySelector(".Combatant_type").src = this.icon;

    this.hudElement.querySelector(".Combatant_status").innerHTML =
      this.status.type;
  }

  init(container) {
    this.createElement();
    container.appendChild(this.hudElement);
    container.appendChild(this.monsterElement);
    this.update();
  }
}
