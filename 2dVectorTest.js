import {createCanvasContext, degreesToRadians, Vector2} from "./helpers.js";

const canvas = document.getElementById("2d");
const ctx = createCanvasContext(canvas);

if (ctx === null) {
  alert("Could not create a canvas context");
} else {

  const FRICTIONAL_ACCELERATION_MAGNITUDE = 0.000003;
  const INITIAL_ANGULAR_VELOCITY = new Vector2(0.009, 0.005);
  const RADIUS = 30;

  let displacement = new Vector2(0, 0);
  let angularVelocity = INITIAL_ANGULAR_VELOCITY.clone();
  let translationalVelocity = angularVelocity.clone().scalarMultiply(RADIUS);

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

    const velocityDueToFriction = angularVelocity
      .unitVector()
      .scalarMultiply(FRICTIONAL_ACCELERATION_MAGNITUDE) // Frictional acceleration in the direction of motion
      .scalarMultiply(-1) // Frictional acceleration opposing direction of motion
      .scalarMultiply(deltaTime);
    angularVelocity.add(velocityDueToFriction);
    translationalVelocity = angularVelocity.clone().scalarMultiply(RADIUS);
    displacement.add(translationalVelocity.clone().scalarMultiply(deltaTime).boundToZero());

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(50 + displacement.x, 50 + displacement.y);
    ctx.beginPath();
    ctx.arc(0, 0, RADIUS, 0, degreesToRadians(360));
    ctx.closePath();
    ctx.fill()
    ctx.restore();

    requestAnimationFrame(mainLoop(startTime, timestamp));
  }

  setTimeout(() => requestAnimationFrame(mainLoop()), 500);
}
