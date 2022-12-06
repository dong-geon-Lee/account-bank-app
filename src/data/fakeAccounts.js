const account1 = {
  bankAccount: "국민은행",
  username: "js",
  name: "최연성",
  interestRate: 1.2,
  pin: 1111,
  accountNumber: "480166-87-1010244",
  createdDate: new Date(2022, 11, 1),
  movements: [
    {
      id: 1,
      price: 5200,
    },
    {
      id: 2,
      price: 4500,
    },
    {
      id: 3,
      price: -10000,
    },
    {
      id: 4,
      price: 35000,
    },
    {
      id: 5,
      price: -6500,
    },
    {
      id: 6,
      price: -2300,
    },
    {
      id: 7,
      price: 7000,
    },
    {
      id: 8,
      price: 12300,
    },
  ],
};

const account2 = {
  bankAccount: "기업은행",
  username: "jd",
  name: "이철수",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  accountNumber: "127794-55-0110788",
  createdDate: new Date(2021, 4, 12),
  movements: [
    {
      id: 1,
      price: 5000,
    },
    {
      id: 2,
      price: 3400,
    },
    {
      id: 3,
      price: -150,
    },
    {
      id: 4,
      price: -790,
    },
    {
      id: 5,
      price: -3210,
    },
    {
      id: 6,
      price: -1000,
    },
    {
      id: 7,
      price: 8500,
    },
    {
      id: 8,
      price: -30,
    },
  ],
};

const account3 = {
  owner: "Steven Thomas Williams",
  username: "stw",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: "Sarah Smith",
  username: "ss",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

export const accounts = [account1, account2, account3, account4];
