export const calcDiscount = (totalPrice, totalPayment) => {
  let totalDiscount = 100 - (totalPayment * 100) / totalPrice;
  return totalDiscount;
};
