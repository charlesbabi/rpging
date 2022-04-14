window.Actions = {
  damage1: {
    name: "Damage 1",
    success: [
      { type: "textMessage", text: "{CASTER} use {ACTION}!" },
      { type: "animation", animation: "spin" },
      { type: "stateChange", damage: "10" },
      /* { type: "animation", animation: "damage1" },
      { type: "stateChange", state: "damage", value: 1, damage: 10 }, */
    ],
  },
};
