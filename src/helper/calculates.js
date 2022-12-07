export const calcTotalBalance = (movements = []) => {
  const balanceTotal = movements.reduce((acc, cur) => acc + cur.price, 0);
  return balanceTotal;
};

export const calcSortedData = (data) => {
  return data?.sort((a, b) => b.id - a.id);
};

export const findLoginUser = (datas, currentUser) => {
  return datas.find((account) => account.userId === currentUser.userId);
};

export const findAccountNumber = (datas, accNumber) => {
  return datas.find((account) => account.accountNumber === accNumber);
};

export const calcUpdatedMovements = (datas, transferAmount) => {
  datas.movements.unshift({
    id: datas.movements.length + 1,
    price: Number(transferAmount),
  });
};
