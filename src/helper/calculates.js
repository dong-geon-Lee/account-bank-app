export const calcTotalBalance = (movements = []) => {
  const balanceTotal = movements.reduce((acc, cur) => acc + cur.price, 0);
  return balanceTotal;
};

export const calcSortedData = (data, sortActive) => {
  const newData = data?.slice();
  return sortActive
    ? newData?.sort((a, b) => a.id - b.id)
    : newData?.sort((a, b) => b.id - a.id);
};

export const calcInterest = (datas, loanAmount) => {
  let totalInterest = datas;
  let sumInterest = (totalInterest += loanAmount * 0.05);
  return sumInterest;
};

export const calcDeposit = (datas) => {
  return datas
    ?.filter((data) => data.price > 0)
    ?.reduce((acc, cur) => acc + cur.price, 0);
};

export const calcWithDrawal = (datas) => {
  return datas
    ?.filter((data) => data.price < 0)
    ?.reduce((acc, cur) => acc - cur.price, 0);
};

export const calcTransferLimit = (totalBalance, transferAmount) => {
  const amount = Number(transferAmount);
  return totalBalance >= amount && amount <= 1000000;
};

export const calcLoanLimit = (loanAmount) => {
  return Number(loanAmount) <= 10000000 ? Number(loanAmount) : 0;
};

export const exceedLoans = (loanAmount) => {
  return Number(loanAmount) > 10000000;
};

export const exeedTransfer = (transferAmount) => {
  return Number(transferAmount) > 1000000;
};

export const calcUserIndex = (accounts, loginUser) => {
  return accounts.findIndex((account) => account.userId === loginUser.userId);
};

export const calcRandomNumber = (accounts) => {
  return Math.floor(Math.random() * accounts.length);
};

export const calcFilterUser = (accounts, currentUser) => {
  return accounts.filter((account) => account.userId !== currentUser.userId);
};

export const authUser = (loginUser, userId, password) => {
  return loginUser?.userId === userId && loginUser?.pin === Number(password);
};

export const checkAuthUser = (currentUser, user) => {
  return currentUser.name === user;
};

export const guestAuthUser = (accounts, userId, password) => {
  return accounts.find(
    (account) => account.userId === userId && account.pin === Number(password)
  );
};

export const findLoginUser = (datas, currentUser) => {
  return datas.find((account) => account.userId === currentUser.userId);
};

export const findAccountNumber = (datas, accNumber) => {
  return datas.find((account) => account.accountNumber === accNumber);
};

export const calcAccountRange = (accounts) => {
  return accounts.slice(0, accounts.length);
};
