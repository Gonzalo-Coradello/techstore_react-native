export const sumTotal = (items) =>
  items.map((items) => items.price * items.quantity).reduce((acc, curr) => acc + curr, 0);
