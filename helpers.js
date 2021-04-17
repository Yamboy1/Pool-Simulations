/**
 * Creates a 2d canvas context from
 * the specified canvas element id
 * @param canvasElement {HTMLCanvasElement}
 * @returns {CanvasRenderingContext2D | null}
 */

export function createCanvasContext(canvasElement) {
  return canvasElement?.getContext?.("2d")
    ?? null;
}

/**
 * Converts degrees to radians
 * @param degrees {number}
 * @returns {number} - The degree value converted to radians
 */

export function degreesToRadians(degrees) {
  return (Math.PI / 180) * degrees
}

/**
 * Returns the number input,  unless it's less than
 * zero, in which case it will just return zero
 * @param number {number}
 */
export function boundToZero(number) {
  return number >= 0 ? number : 0;
}

export class Vector2 {
  x;
  y;

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  /**
   * Calculate the magnitude of the current vector
   * @returns {number}
   */
  magnitude() {
    return Math.hypot(this.x, this.y);
  }

  /**
   * Create a unit vector from the current vector
   * @returns {Vector2}
   */
  unitVector() {
    const magnitude = this.magnitude();
    return this.clone().scalarMultiply(1/magnitude)
  }

  /**
   * Multiply this vector by a scalar value. Returns this
   * but it also modifies the vector, be careful!
   * @param scalar
   * @returns {Vector2}
   */
  scalarMultiply(scalar) {
    this.x = scalar * this.x;
    this.y = scalar * this.y;
    return this;
  }

  /**
   * Adds another vector to this vector. Returns this
   * but it also modifies the vector, be careful!
   * @param vector
   * @returns {Vector2}
   */
  add(vector) {
    this.x = this.x + vector.x;
    this.y = this.y + vector.y;
    return this;
  }

  /**
   * Clones this vector, i.e. returns a seperate object
   * with the same properties and methods.
   * @returns {Vector2}
   */
  clone() {
    return new Vector2(this.x, this.y)
  }

  boundToZero() {
    return new Vector2(this.x > 0 ? this.x : 0, this.y > 0 ? this.y : 0);
  }
}
