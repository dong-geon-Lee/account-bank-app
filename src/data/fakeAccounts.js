const account1 = {
  bankAccount: "국민은행",
  userId: "guest1",
  name: "최연성",
  totalInterest: 0,
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
      price: 10000,
    },
    {
      id: 8,
      price: 12300,
    },
  ],
};

const account2 = {
  bankAccount: "기업은행",
  userId: "guest2",
  name: "이소라",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  totalInterest: 0,
  pin: 2222,
  accountNumber: "127794-55-0110788",
  createdDate: new Date(2021, 4, 12),
  movements: [
    {
      id: 1,
      price: 40000,
    },
    {
      id: 2,
      price: 25000,
    },
    {
      id: 3,
      price: -6500,
    },
    {
      id: 4,
      price: -7900,
    },
    {
      id: 5,
      price: 51000,
    },
    {
      id: 6,
      price: -2500,
    },
    {
      id: 7,
      price: 80500,
    },
    {
      id: 8,
      price: -3000,
    },
  ],
};

const account3 = {
  bankAccount: "신한은행",
  userId: "guest3",
  name: "배은미",
  totalInterest: 0,
  pin: 3333,
  accountNumber: "221503-55-3250244",
  createdDate: new Date(2022, 11, 1),
  movements: [
    {
      id: 1,
      price: 2000,
    },
    {
      id: 2,
      price: -1200,
    },
    {
      id: 3,
      price: 3400,
    },
    {
      id: 4,
      price: -2500,
    },
    {
      id: 5,
      price: -6000,
    },
    {
      id: 6,
      price: 42500,
    },
    {
      id: 7,
      price: 7500,
    },
    {
      id: 8,
      price: -12000,
    },
  ],
};

const account4 = {
  bankAccount: "신협은행",
  userId: "guest4",
  name: "파스칼",
  totalInterest: 0,
  pin: 4444,
  accountNumber: "282408-31-6917450",
  createdDate: new Date(2022, 11, 1),
  movements: [
    {
      id: 1,
      price: 2000,
    },
    {
      id: 2,
      price: -1200,
    },
    {
      id: 3,
      price: 3400,
    },
    {
      id: 4,
      price: -2500,
    },
    {
      id: 5,
      price: -6000,
    },
    {
      id: 6,
      price: 42500,
    },
    {
      id: 7,
      price: 7500,
    },
    {
      id: 8,
      price: -12000,
    },
  ],
};

export const accounts = [account1, account2, account3, account4];
