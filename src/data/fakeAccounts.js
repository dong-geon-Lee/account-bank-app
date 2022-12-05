const account1 = {
  bankAccount: "국민은행",
  username: "js",
  interestRate: 1.2,
  pin: 1111,
  movements: [
    {
      id: 1,
      price: 200,
    },
    {
      id: 2,
      price: 450,
    },
    {
      id: 3,
      price: -400,
    },
    {
      id: 4,
      price: 3000,
    },
    {
      id: 5,
      price: -650,
    },
    {
      id: 6,
      price: -130,
    },
    {
      id: 7,
      price: 70,
    },
    {
      id: 8,
      price: 1300,
    },
  ],
};

const account2 = {
  bankAccount: "기업은행",
  username: "jd",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
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
