import { atom, selector } from "recoil";
import { accounts } from "../data/fakeAccounts";
import {
  calcRandomNumber,
  calcDeposit,
  calcSortedData,
  calcTotalBalance,
  calcWithDrawal,
} from "../helper/calculates";

export const accountState = atom({
  key: "accountState",
  default: accounts || [],
});

export const currentUserState = atom({
  key: "currentUserState",
  default: null,
});

export const activeUserState = atom({
  key: "activeUserState",
  default: false,
});

export const sortActiveState = atom({
  key: "sortActiveState",
  default: false,
});

export const messageState = atom({
  key: "message",
  default: "",
});

export const transferInfoState = atom({
  key: "transferInfoState",
  default: {
    accNumber: "",
    transferAmount: "",
    loanAmount: "",
    user: "",
    userId: "",
    password: "",
  },
});

export const randomUserState = selector({
  key: "randomUserState",
  get: ({ get }) => {
    const randomAccIndex = calcRandomNumber(get(accountState));
    const randomAccUser = get(accountState);
    return randomAccUser[randomAccIndex];
  },
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

export const balanceInfoState = selector({
  key: "balanceInfoState",
  get: ({ get }) => {
    const currentUser = get(currentUserState);
    const { bankAccount, accountNumber, createdDate, name } = currentUser;
    return { bankAccount, accountNumber, createdDate, name };
  },
});

export const totalBalancesState = selector({
  key: "totalBalancesState",
  get: ({ get }) => {
    const currentUser = get(currentUserState);
    const totalBalance = calcTotalBalance(currentUser?.movements);
    const totalDeposit = calcDeposit(currentUser?.movements);
    const totalWithDrawal = calcWithDrawal(currentUser?.movements);
    const totalInterest = currentUser?.totalInterest;
    return { totalBalance, totalDeposit, totalWithDrawal, totalInterest };
  },
});
