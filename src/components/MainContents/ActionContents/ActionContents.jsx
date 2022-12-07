import React, { useState } from "react";
import { Box, Button, Input, Form, Text, Title } from "./styles";
import {
  calcInterest,
  calcLoanLimit,
  calcTransferLimit,
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

    if (!currentUser || !accNumber || !transferAmount) return;

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
      calcUpdatedMovements(checkLoginUser, -transferAmount);
      calcUpdatedMovements(targetTransferUser, transferAmount);
      setCurrentUser({
        ...currentUser,
        movements: checkLoginUser.movements,
        totalInterest: checkLoginUser.totalInterest,
      });
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

    if (!currentUser || !loanAmount || !user) return;

    const checkUser = currentUser.name === user;
    const checkLoan = calcLoanLimit(loanAmount);
    const checkLoginUser = findLoginUser(accounts, currentUser);

    if (checkUser && checkLoan && checkLoginUser) {
      calcUpdatedMovements(checkLoginUser, checkLoan);
      calcInterest(checkLoginUser, checkLoan);
      setCurrentUser({
        ...currentUser,
        movements: checkLoginUser.movements,
        totalInterest: checkLoginUser.totalInterest,
      });
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
          <Text>이체금액</Text>
          <Input
            type="text"
            placeholder="한 번에 100만원 송금가능"
            maxLength="7"
            onChange={onChange}
            value={transferAmount}
            name="transferAmount"
          />
        </Box>
        <Button type="submit">이체하기</Button>
      </Form>

      <Form onSubmit={requestLoan}>
        <Title>대출요청</Title>
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
          <Text>대출금액</Text>
          <Input
            type="text"
            placeholder="한 번에 1000만원 대출 가능"
            maxLength="8"
            onChange={onChange}
            value={loanAmount}
            name="loanAmount"
          />
        </Box>
        <Button type="submit">대출받기</Button>
      </Form>

      <Form onSubmit={closeAccount}>
        <Title>계정폐쇄</Title>
        <Box>
          <Text>아이디</Text>
          <Input type="text" placeholder="아이디를 적어주세요" />
        </Box>
        <Box>
          <Text>비밀번호</Text>
          <Input type="text" placeholder="비밀번호를 적어주세요" />
        </Box>
        <Button type="submit">회원탈퇴</Button>
      </Form>
    </>
  );
};

export default ActionContents;
