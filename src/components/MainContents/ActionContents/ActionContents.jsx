import React, { useState } from "react";
import { Box, Button, Input, Form, Text, Title } from "./styles";

const ActionContents = ({
  currentUser,
  accounts,
  totalBalance,
  setCurrentUser,
}) => {
  const [transferInfo, setTransferInfo] = useState({
    accNumber: "",
    transferAmount: "",
  });

  const { accNumber, transferAmount } = transferInfo;

  const onChange = (e) => {
    setTransferInfo({ ...transferInfo, [e.target.name]: e.target.value });
  };

  const handleTransfer = (e) => {
    e.preventDefault();

    if (!currentUser) return;

    const checkLoginUser = accounts.find(
      (account) => account.userId === currentUser.userId
    );

    const targetTransferUser = accounts.find(
      (account) => account.accountNumber === accNumber
    );

    const checkTransferMoney = totalBalance >= Number(transferAmount);

    if (checkLoginUser && targetTransferUser && checkTransferMoney) {
      checkLoginUser.movements.unshift({
        id: checkLoginUser.movements.length + 1,
        price: Number(-transferAmount),
      });

      targetTransferUser.movements.push({
        id: targetTransferUser.movements.length + 1,
        price: Number(transferAmount),
      });

      console.log(accounts, "변형", checkLoginUser);
    }

    setTransferInfo({ accNumber: "", transferAmount: "" });
  };

  const requestLoan = (e) => {
    e.preventDefault();
    console.log("대출완료");
  };

  const closeAccount = (e) => {
    e.preventDefault();
    console.log("회원탈퇴");
  };

  return (
    <>
      <Form onSubmit={handleTransfer}>
        <Title>계좌이체</Title>
        <Box>
          <Text>계좌번호</Text>
          <Input
            type="text"
            placeholder="계좌번호를 적어주세요"
            maxLength="17"
            onChange={onChange}
            value={accNumber}
            name="accNumber"
          />
        </Box>
        <Box>
          <Text>송금 금액</Text>
          <Input
            type="text"
            placeholder="최대 100만원까지 송금 가능"
            maxLength="7"
            onChange={onChange}
            value={transferAmount}
            name="transferAmount"
          />
        </Box>
        <Button type="submit">이체하기</Button>
      </Form>

      <Form onSubmit={requestLoan}>
        <Title>대출</Title>
        <Box>
          <Text>계좌명의</Text>
          <Input type="text" placeholder="이름을 적어주세요" />
        </Box>
        <Box>
          <Text>대출 금액</Text>
          <Input
            type="text"
            placeholder="최대 1000만원까지 대출 가능"
            maxLength="8"
          />
        </Box>
        <Button type="submit">대출받기</Button>
      </Form>

      <Form onSubmit={closeAccount}>
        <Title>회원탈퇴</Title>
        <Box>
          <Text>아이디</Text>
          <Input type="text" placeholder="아이디를 적어주세요" />
        </Box>
        <Box>
          <Text>비밀번호</Text>
          <Input type="text" placeholder="비밀번호를 적어주세요" />
        </Box>
        <Button type="submit">계정삭제</Button>
      </Form>
    </>
  );
};

export default ActionContents;
