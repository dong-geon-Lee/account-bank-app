export const calcTotalBalance = (movements = []) => {
  const balanceTotal = movements.reduce((acc, cur) => acc + cur.price, 0);
  return balanceTotal;
};

export const calcSortedData = (data) => {
  return data?.sort((a, b) => b.id - a.id);
};
