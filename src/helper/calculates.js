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

export const calcInterest = (datas, loanAmount) => {
  datas.totalInterest += loanAmount * 0.05;
};

export const calcTransferLimit = (totalBalance, transferAmount) => {
  const amount = Number(transferAmount);
  return totalBalance >= amount && amount <= 1000000;
};

export const findCorrectUser = (accounts, userId, password) => {
  return accounts.find(
    (acc) => acc.userId === userId && acc.pin === Number(password)
  );
};

export const calcLoanLimit = (loanAmount) => {
  return Number(loanAmount) <= 10000000 ? Number(loanAmount) : 0;
};

export const authUser = (loginUser, userId, password) => {
  return loginUser?.userId === userId && loginUser?.pin === Number(password);
};

export const calcUserIndex = (accounts, loginUser) => {
  return accounts.findIndex((account) => account.userId === loginUser.userId);
};
