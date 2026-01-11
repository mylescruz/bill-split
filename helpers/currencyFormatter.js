const currencyFormatter = (number) => {
  let value = number === "" ? 0 : number;

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(value);
};

export default currencyFormatter;
