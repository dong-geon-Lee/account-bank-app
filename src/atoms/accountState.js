import { atom, selector } from "recoil";
import { accounts } from "../data/fakeAccounts";
import {
  calcRandomNumber,
  calcSortedData,
  calcTransferLimit,
  calcUpdatedMovements,
  findAccountNumber,
  findLoginUser,
} from "../helper/calculates";

export const accountState = atom({
  key: "accountState",
  default: accounts || [],
});

export const activeUserState = atom({
  key: "activeUserState",
  default: false,
});

export const currentUserState = atom({
  key: "currentUserState",
  default: null,
});

export const randomUserState = selector({
  key: "randomUserState",
  get: ({ get }) => {
    const randomAccIndex = calcRandomNumber(get(accountState));
    const randomAccUser = get(accountState);
    return randomAccUser[randomAccIndex];
  },
});

export const transfersInfoState = atom({
  key: "transfersInfoState",
  default: {
    accNumber: "",
    transferAmount: "",
    loanAmount: "",
    user: "",
    userId: "",
    password: "",
  },
});

export const userActionState = selector({
  key: "userActionState",
  get: ({ get }) => {
    const accounts = get(accountState);
    const currentUser = get(currentUserState);
    const { accNumber, transferAmount } = get(transfersInfoState);
    const totalBalance = get(totalBalanceState);

    const checkLoginUser = findLoginUser(accounts, currentUser);
    const targetTransferUser = findAccountNumber(accounts, accNumber);
    const checkTransferMoney = calcTransferLimit(totalBalance, transferAmount);
    const checkDuplicateAcc = checkLoginUser.accountNumber !== accNumber;

    const allCheck =
      checkLoginUser &&
      targetTransferUser &&
      checkTransferMoney &&
      checkDuplicateAcc;

    if (allCheck) {
      console.log(checkLoginUser, transferAmount, "인자 입력");
      const data1 = calcUpdatedMovements(checkLoginUser, -transferAmount);
      const data2 = calcUpdatedMovements(targetTransferUser, transferAmount);
      console.log(data1, data2);

      const newMovements = {
        ...currentUser,
        movements: checkLoginUser.movements,
        totalInterest: checkLoginUser.totalInterest,
      };

      return newMovements;
    }
  },
});

export const sortActiveState = atom({
  key: "sortActiveState",
  default: false,
});

export const movementSortState = selector({
  key: "movementSortState",
  get: ({ get }) => {
    const currentUser = get(currentUserState);
    const sortActive = get(sortActiveState);
    const items =
      currentUser && calcSortedData(currentUser?.movements, sortActive);
    return items;
  },
});

export const choiceLoginUserState = selector({
  key: "choiceLoginUserState",
  get: ({ get }) => {
    //
  },
});

export const messageState = atom({
  key: "message",
  default: "",
});

export const userIdState = atom({
  key: "userIdState",
  default: "",
});

// balanceState 영역
export const totalBalanceState = atom({
  key: "balanceState",
  default: 0,
});

export const bankNameState = atom({
  key: "bankName",
  default: "",
});

export const accNumberState = atom({
  key: "accNumber",
  default: "",
});

export const datesState = atom({
  key: "dates",
  default: "",
});

export const nameState = atom({
  key: "name",
  default: "",
});

export const balanceInfoState = selector({
  key: "balanceInfoState",
  get: ({ get }) => {
    const bankName = get(bankNameState);
    const accNumber = get(accNumberState);
    const dates = get(datesState);
    const name = get(nameState);
    return { bankName, accNumber, dates, name };
  },
});
