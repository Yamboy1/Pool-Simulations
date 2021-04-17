import { createCanvasContext, degreesToRadians, boundToZero } from "./helpers.js";

const canvas = document.getElementById("first");
const ctx = createCanvasContext(canvas);

if (ctx === null) {
  alert("Could not create a canvas context");
} else {
  const FRICTIONAL_ACCELERATION = -0.000003;
  const INITIAL_ANGULAR_VELOCITY = 0.01;
  const RADIUS = 30;

  let angle = 0;
  let displacement = 0;
  let angularVelocity = INITIAL_ANGULAR_VELOCITY;
  let translationalVelocity = RADIUS * angularVelocity;

  /**
   * Returns a function to be called by requestAnimationFrame. This manages the main loop of the animation.
   * @param startTime {DOMHighResTimeStamp} - The timestamp marking the start of the animation
   * @param prevTimestamp {DOMHighResTimeStamp} - The time stamp of the previous frame
   */
  const mainLoop = (startTime = -1, prevTimestamp = 0) => (rawTimestamp) => {
    if (startTime < 0) {
      startTime = rawTimestamp;
    }

    const timestamp = rawTimestamp - startTime;
    const deltaTime = timestamp - prevTimestamp;

    angularVelocity += FRICTIONAL_ACCELERATION * deltaTime
    angle += boundToZero(angularVelocity * deltaTime);
    translationalVelocity = RADIUS * angularVelocity
    displacement += boundToZero(translationalVelocity * deltaTime);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(50 + displacement, 50);
    ctx.rotate(angle);
    ctx.beginPath();
    ctx.arc(0, 0, RADIUS, 0, degreesToRadians(270));
    ctx.closePath();
    ctx.fill()
    ctx.restore();

    requestAnimationFrame(mainLoop(startTime, timestamp));
  }

  setTimeout(() => requestAnimationFrame(mainLoop()), 500);
}
