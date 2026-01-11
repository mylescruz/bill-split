export default function centsToDollars(cents) {
  return Number((cents / 100).toFixed(2));
}
