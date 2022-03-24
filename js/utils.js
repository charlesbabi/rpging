const halfFramePixels = 16;

const selectorGameContainer = ".game-container";
const selectorCanvasContainer = ".game-canvas";

const utils = {
  withGrid(n) {
    return n * halfFramePixels;
  },
  asGridCoord(x, y) {
    return this.getCoordinateFormat(x * halfFramePixels, y * halfFramePixels);
  },
  nextPosition(initialX, initialY, direction) {
    let x = initialX;
    let y = initialY;
    const size = halfFramePixels;
    if (direction === "left") {
      x -= size;
    } else if (direction === "right") {
      x += size;
    } else if (direction === "up") {
      y -= size;
    } else if (direction === "down") {
      y += size;
    }
    return { x, y };
  },
  oppositeDirection(direction) {
    switch (direction) {
      case "up":
        return "down";
      case "down":
        return "up";
      case "left":
        return "right";
      case "right":
        return "left";
      default:
        return "";
    }
  },
  getCoordinateFormat(x, y) {
    return `${x},${y}`;
  },
  emitEvent(name, detail) {
    const event = new CustomEvent(name, { detail });
    document.dispatchEvent(event);
  },
};
