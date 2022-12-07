import React, { useState } from "react";
import { Box, Button, Input, Form, Text, Title } from "./styles";
import {
  calcUpdatedMovements,
  findAccountNumber,
  findLoginUser,
} from "../../../helper/calculates";

const ActionContents = ({
  currentUser,
  accounts,
  totalBalance,
  setCurrentUser,
}) => {
  const [transferInfo, setTransferInfo] = useState({
    accNumber: "",
    transferAmount: "",
    loanAmount: "",
    user: "",
  });

  const { accNumber, transferAmount, loanAmount, user } = transferInfo;

  const onChange = (e) => {
    setTransferInfo({ ...transferInfo, [e.target.name]: e.target.value });
  };

  const handleTransfer = (e) => {
    e.preventDefault();

    if (!currentUser) return;

    const checkLoginUser = findLoginUser(accounts, currentUser);
    const targetTransferUser = findAccountNumber(accounts, accNumber);
    const checkTransferMoney = totalBalance >= Number(transferAmount);
    const checkDuplicateAcc = checkLoginUser.accountNumber !== accNumber;

    const allCheck =
      checkLoginUser &&
      targetTransferUser &&
      checkTransferMoney &&
      checkDuplicateAcc;

    if (allCheck) {
      calcUpdatedMovements(checkLoginUser, -transferAmount);
      calcUpdatedMovements(targetTransferUser, transferAmount);
      setCurrentUser({ ...currentUser, movements: checkLoginUser.movements });
    }

    setTransferInfo({
      accNumber: "",
      transferAmount: "",
      loanAmount: "",
      user: "",
    });
  };

  const requestLoan = (e) => {
    e.preventDefault();

    if (!currentUser) return;

    const checkUser = currentUser.userId === user;
    const checkLoan = Number(loanAmount);
    const checkLoginUser = findLoginUser(accounts, currentUser);

    if (checkUser && checkLoan && checkLoginUser) {
      calcUpdatedMovements(checkLoginUser, checkLoan);
      setCurrentUser({ ...currentUser, movements: checkLoginUser.movements });
    }

    setTransferInfo({
      accNumber: "",
      transferAmount: "",
      loanAmount: "",
      user: "",
    });
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
          <Input
            type="text"
            placeholder="이름을 적어주세요"
            maxLength="15"
            onChange={onChange}
            value={user}
            name="user"
          />
        </Box>
        <Box>
          <Text>대출 금액</Text>
          <Input
            type="text"
            placeholder="최대 1000만원까지 대출 가능"
            maxLength="8"
            onChange={onChange}
            value={loanAmount}
            name="loanAmount"
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
