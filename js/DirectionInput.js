class DirectionInput {
    constructor() {
        this.heldDirections = [];
        this.map = {
            KeyW: "up",
            KeyA: "left",
            KeyS: "down",
            KeyD: "right",
        };
    }

    get direction() {
        return this.heldDirections[0];
    }

    init() {
        document.addEventListener("keydown", (e) => {
            const direction = this.map[e.code];
            if (direction && this.heldDirections.indexOf(direction) === -1) {
                this.heldDirections.unshift(direction);
            }
        });
        document.addEventListener("keyup", (e) => {
            const direction = this.map[e.code];
            const index = this.heldDirections.indexOf(direction);
            if (index > -1) {
                this.heldDirections.splice(index, 1);
            }
        });
    }
}
