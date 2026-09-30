export function generateRandomArray(size = 15, max = 100) {
  return Array.from({ length: size }, () => Math.floor(Math.random() * max) + 1);
}
