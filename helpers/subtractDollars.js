export default function subtractDollars(value1, value2) {
  return Number(
    (Math.round(Number(value1) * 100) - Math.round(Number(value2) * 100)) / 100
  ).toFixed(2);
}
