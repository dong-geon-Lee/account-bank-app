import React, { useEffect, useState } from "react";
import { Box, Button, Form, Input, Message, Text, Title } from "../styles";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  accountState,
  currentUserState,
  transferInfoState,
} from "../../../../recoils/accountState";
import {
  calcInterest,
  calcLoanLimit,
  calcUserIndex,
  checkAuthUser,
  exceedLoans,
  findLoginUser,
} from "../../../../helper/calculates";
import {
  ENTER__ACCOUNT__INPUT,
  ENTER__INPUT__ERROR,
  ENTER__LOAN__INPUT,
  SUCCESS__LOAN__MESSAGE,
  WRONG__ACCOUNT__INPUT,
  WRONG__LOAN__INPUT,
} from "../../../../constants/constants";

const LoanAction = () => {
  const accounts = useRecoilValue(accountState);
  const currentUser = useRecoilValue(currentUserState);

  const setCurrentUser = useSetRecoilState(currentUserState);
  const setAccounts = useSetRecoilState(accountState);
  const [transferInfo, setTransferInfo] = useRecoilState(transferInfoState);
  const { loanAmount, user } = transferInfo;

  const [successLoanMessage, setSuccessLoanMessage] = useState("");
  const [sucessLoanSubmit, setSucessLoanSubmit] = useState(false);
  const [sucessLoanCounter, setSucessLoanCounter] = useState(0);
  const [loanInputError, setLoanInputError] = useState(false);
  const [errMessageLoan, setErrMessageLoan] = useState("");

  const onChange = (e) => {
    setTransferInfo({ ...transferInfo, [e.target.name]: e.target.value });
  };

  const requestLoan = (e) => {
    e.preventDefault();

    function conditionStatement(message, boolean) {
      setErrMessageLoan(message);
      setLoanInputError(boolean);
    }

    if (!loanAmount && !user) {
      conditionStatement(ENTER__INPUT__ERROR, true);
      return;
    }

    if (!loanAmount || !user) {
      !loanAmount
        ? conditionStatement(ENTER__LOAN__INPUT, true)
        : conditionStatement(ENTER__ACCOUNT__INPUT, true);
      return;
    }

    if (loanAmount && user) {
      const loginUser = findLoginUser(accounts, currentUser);

      if (loginUser.name !== user) {
        conditionStatement(WRONG__ACCOUNT__INPUT, true);
        return;
      }

      if (exceedLoans(loanAmount)) {
        conditionStatement(WRONG__LOAN__INPUT, true);
        return;
      }
    }

    const checkUser = checkAuthUser(currentUser, user);
    const checkLoan = calcLoanLimit(loanAmount);
    const checkLoginUser = findLoginUser(accounts, currentUser);

    if (checkUser && checkLoan && checkLoginUser) {
      const totalInterest = calcInterest(
        checkLoginUser.totalInterest,
        checkLoan
      );

      const requestUserIndex = calcUserIndex(accounts, checkLoginUser);
      const changedUserInfo = {
        ...currentUser,
        totalInterest,
        movements: [
          ...currentUser.movements,
          {
            id: currentUser.movements.length + 1,
            price: checkLoan,
          },
        ],
      };

      setCurrentUser(changedUserInfo);
      setAccounts((prevState) => [
        ...prevState.slice(0, requestUserIndex),
        changedUserInfo,
        ...prevState.slice(requestUserIndex + 1),
      ]);

      setSuccessLoanMessage(SUCCESS__LOAN__MESSAGE);
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

  useEffect(() => {
    const timerId = setTimeout(() => {
      setLoanInputError(false);
      setSucessLoanSubmit(false);
    }, 4000);

    return () => clearTimeout(timerId);
  }, [errMessageLoan, sucessLoanCounter]);

  return (
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
  );
};

export default LoanAction;
