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
