import React, { useEffect, useState } from "react";
import { Box, Button, Input, Form, Text, Title, Message } from "./styles";
import {
  authUser,
  calcInterest,
  calcLoanLimit,
  calcTransferLimit,
  calcUpdatedMovements,
  calcUserIndex,
  findAccountNumber,
  findLoginUser,
} from "../../../helper/calculates";

const ActionContents = ({
  currentUser,
  accounts,
  totalBalance,
  setCurrentUser,
  setHidden,
  setActiveUser,
  setMessage,
}) => {
  const [transferInfo, setTransferInfo] = useState({
    accNumber: "",
    transferAmount: "",
    loanAmount: "",
    user: "",
    userId: "",
    password: "",
  });

  const [successTransferMessage, setSuccessTransferMessage] = useState("");
  const [sucessTransferSubmit, setSucessTransferSubmit] = useState(false);
  const [sucessTransferCounter, setSucessTransferCounter] = useState(0);
  const [transferInputError, setTransferInputError] = useState(false);
  const [errMessageTransfer, setErrMessageTransfer] = useState("");

  const [successLoanMessage, setSuccessLoanMessage] = useState("");
  const [sucessLoanSubmit, setSucessLoanSubmit] = useState(false);
  const [sucessLoanCounter, setSucessLoanCounter] = useState(0);
  const [loanInputError, setLoanInputError] = useState(false);
  const [errMessageLoan, setErrMessageLoan] = useState("");

  const [accountInputError, setAccountInputError] = useState(false);
  const [errMessageAccount, setErrMessageAccount] = useState("");

  const { accNumber, transferAmount, loanAmount, user, userId, password } =
    transferInfo;

  const onChange = (e) => {
    setTransferInfo({ ...transferInfo, [e.target.name]: e.target.value });
  };

  const handleTransfer = (e) => {
    e.preventDefault();

    function conditionStatement(message, boolean) {
      setErrMessageTransfer(message);
      setTransferInputError(boolean);
    }

    if (!accNumber && !transferAmount) {
      conditionStatement("계좌번호와 이체금액을 모두 입력하세요!", true);
      return;
    }

    if (!accNumber || !transferAmount) {
      !accNumber
        ? conditionStatement("계좌번호를 입력하세요!", true)
        : conditionStatement("이체금액을 입력하세요!", true);
      return;
    }

    if (accNumber && transferAmount) {
      const loginUser = findLoginUser(accounts, currentUser);
      const checkAccount = findAccountNumber(accounts, accNumber);

      if (loginUser?.accountNumber === accNumber) {
        conditionStatement("본인의 계좌에 이체 할 수 없습니다!", true);
        return;
      }

      if (checkAccount?.accountNumber !== accNumber) {
        conditionStatement("잘못된 계좌번호 입니다. 다시 입력해주세요!", true);
        return;
      }

      if (Number(transferAmount) > 1000000) {
        conditionStatement("이체한도는 100만원을 넘을 수 없습니다!", true);
        return;
      }

      if (Number(transferAmount) > totalBalance) {
        conditionStatement("잔액이 부족합니다. 이체에 실패하였습니다!", true);
        return;
      }
    }

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

      setSuccessTransferMessage("계좌이체가 완료되었습니다!");
      setSucessTransferSubmit(true);
      setSucessTransferCounter((prev) => prev + 1);
      // setTimeout(() => {
      //   setSucessTransferSubmit(false);
      // }, 5000);
    }

    setTransferInputError(false);
    setErrMessageTransfer("");
    setTransferInfo({
      accNumber: "",
      transferAmount: "",
      loanAmount: "",
      user: "",
      userId: "",
      password: "",
    });
  };

  const requestLoan = (e) => {
    e.preventDefault();

    function conditionStatement(message, boolean) {
      setErrMessageLoan(message);
      setLoanInputError(boolean);
    }

    if (!loanAmount && !user) {
      conditionStatement("계좌명의와 대출금액을 모두 입력하세요!", true);
      return;
    }

    if (!loanAmount || !user) {
      !loanAmount
        ? conditionStatement("대출금액을 입력하세요!", true)
        : conditionStatement("계좌명의를 입력하세요!", true);
      return;
    }

    if (loanAmount && user) {
      const loginUser = findLoginUser(accounts, currentUser);

      if (loginUser.name !== user) {
        conditionStatement(
          "잘못된 계좌명의 입니다. 본인명의로 입력해주세요!",
          true
        );
        return;
      }

      if (Number(loanAmount) > 10000000) {
        conditionStatement("대출한도는 1000만원을 넘을 수 없습니다!", true);
        return;
      }
    }

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

      setSuccessLoanMessage("대출요청이 처리되었습니다! 계좌를 확인하세요!");
      setSucessLoanSubmit(true);
      setSucessLoanCounter((prev) => prev + 1);
    }

    setLoanInputError(false);
    setErrMessageLoan("");
    setTransferInfo({
      accNumber: "",
      transferAmount: "",
      loanAmount: "",
      user: "",
      userId: "",
      password: "",
    });
  };

  const closeAccount = (e) => {
    e.preventDefault();

    function conditionStatement(message, boolean) {
      setErrMessageAccount(message);
      setAccountInputError(boolean);
    }

    if (!userId && !password) {
      conditionStatement("아이디 또는 비밀번호를 모두 입력하세요!", true);
      return;
    }

    if (!userId || !password) {
      !userId
        ? conditionStatement("아이디를 입력하세요!", true)
        : conditionStatement("비밀번호를 입력하세요!", true);
      return;
    }

    if (userId && password) {
      const loginUser = findLoginUser(accounts, currentUser);
      if (loginUser.userId !== userId) {
        conditionStatement("존재하지 않는 아이디입니다!", true);
        return;
      }

      if (loginUser.pin !== Number(password)) {
        conditionStatement("비밀번호가 맞지 않습니다!", true);
        return;
      }
    }

    const checkLoginUser = findLoginUser(accounts, currentUser);

    if (authUser(checkLoginUser, userId, password)) {
      const index = calcUserIndex(accounts, checkLoginUser);
      accounts.splice(index, 1);
      setHidden(true);
      setActiveUser(false);
      setMessage(`${currentUser.userId} 계정이 삭제되었습니다`);
    }

    setAccountInputError(false);
    setErrMessageAccount("");
    setTransferInfo({
      accNumber: "",
      transferAmount: "",
      loanAmount: "",
      user: "",
      userId: "",
      password: "",
    });
  };

  useEffect(() => {
    const timerId = setTimeout(() => {
      setTransferInputError(false);
      setSucessTransferSubmit(false);
    }, 5000);

    return () => clearTimeout(timerId);
  }, [errMessageTransfer, sucessTransferCounter]);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setLoanInputError(false);
      setSucessLoanSubmit(false);
    }, 5000);

    return () => clearTimeout(timerId);
  }, [errMessageLoan, sucessLoanCounter]);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setAccountInputError(false);
    }, 5000);

    return () => clearTimeout(timerId);
  }, [errMessageAccount]);

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
        {transferInputError && <Message>{errMessageTransfer}</Message>}
        {sucessTransferSubmit && (
          <Message className="success">{successTransferMessage}</Message>
        )}
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
        {loanInputError && <Message>{errMessageLoan}</Message>}
        {sucessLoanSubmit && (
          <Message className="success">{successLoanMessage}</Message>
        )}
        <Button type="submit">대출받기</Button>
      </Form>

      <Form onSubmit={closeAccount}>
        <Title>계정폐쇄</Title>
        <Box>
          <Text>아이디</Text>
          <Input
            type="text"
            placeholder="아이디를 적어주세요"
            maxLength="15"
            onChange={onChange}
            value={userId}
            name="userId"
          />
        </Box>
        <Box>
          <Text>비밀번호</Text>
          <Input
            type="password"
            placeholder="비밀번호를 적어주세요"
            onChange={onChange}
            value={password}
            name="password"
          />
        </Box>
        {accountInputError && <Message>{errMessageAccount}</Message>}
        <Button type="submit">회원탈퇴</Button>
      </Form>
    </>
  );
};

export default ActionContents;
