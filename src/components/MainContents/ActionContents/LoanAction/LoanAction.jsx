import React, { useEffect, useState } from "react";
import { Box, Button, Form, Input, Message, Text, Title } from "../styles";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  accountState,
  currentUserState,
  transferInfoState,
} from "../../../../atoms/accountState";
import {
  calcInterest,
  calcLoanLimit,
  calcUserIndex,
  findLoginUser,
} from "../../../../helper/calculates";

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
      const totalInterest = calcInterest(
        checkLoginUser.totalInterest,
        checkLoan
      );

      const requestUserIndex = calcUserIndex(accounts, checkLoginUser);

      setCurrentUser({
        ...currentUser,
        totalInterest,
        movements: [
          ...currentUser.movements,
          {
            id: currentUser.movements.length + 1,
            price: checkLoan,
          },
        ],
      });

      setAccounts((prevState) => [
        ...prevState.slice(0, requestUserIndex),
        {
          ...currentUser,
          totalInterest,
          movements: [
            ...currentUser.movements,
            {
              id: currentUser.movements.length + 1,
              price: checkLoan,
            },
          ],
        },
        ...prevState.slice(requestUserIndex + 1),
      ]);

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
