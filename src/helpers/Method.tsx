export function generateRandomPrice() {
  const randomDecimal = Math.random();

  const randomPrice = 500 + randomDecimal * (9999 - 500);

  return Math.round(randomPrice);
}
