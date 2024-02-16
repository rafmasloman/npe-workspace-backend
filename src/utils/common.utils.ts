export const calculateTotalValue = (number: number[]) => {
  const calculateTotalCallback = (total: number, num: number) => {
    return total + num;
  };
  const calculate = number.reduce(calculateTotalCallback, 0);

  return calculate;
};
