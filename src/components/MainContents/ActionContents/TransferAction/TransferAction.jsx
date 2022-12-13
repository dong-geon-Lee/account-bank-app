import React, { useEffect, useState } from "react";
import { Box, Button, Form, Input, Message, Text, Title } from "../styles";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  accountState,
  currentUserState,
  totalBalancesState,
  transferInfoState,
} from "../../../../atoms/accountState";
import {
  calcTransferLimit,
  calcUserIndex,
  findAccountNumber,
  findLoginUser,
} from "../../../../helper/calculates";

const TransferAction = () => {
  const accounts = useRecoilValue(accountState);
  const currentUser = useRecoilValue(currentUserState);
  const { totalBalance } = useRecoilValue(totalBalancesState);

  const setCurrentUser = useSetRecoilState(currentUserState);
  const setAccounts = useSetRecoilState(accountState);
  const [transferInfo, setTransferInfo] = useRecoilState(transferInfoState);
  const { accNumber, transferAmount } = transferInfo;

  const [successTransferMessage, setSuccessTransferMessage] = useState("");
  const [sucessTransferSubmit, setSucessTransferSubmit] = useState(false);
  const [sucessTransferCounter, setSucessTransferCounter] = useState(0);
  const [transferInputError, setTransferInputError] = useState(false);
  const [errMessageTransfer, setErrMessageTransfer] = useState("");

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
      setCurrentUser({
        ...currentUser,
        movements: [
          ...currentUser.movements,
          { id: currentUser.movements.length + 1, price: -transferAmount },
        ],
      });

      setSuccessTransferMessage("계좌이체가 완료되었습니다!");
      setSucessTransferSubmit(true);
      setSucessTransferCounter((prev) => prev + 1);

      const user = currentUser;
      const targetUser = targetTransferUser;
      const index = calcUserIndex(accounts, user);
      const targetIndex = calcUserIndex(accounts, targetUser);

      setAccounts((prevState) => {
        return [
          ...prevState.slice(0, index),
          {
            ...currentUser,
            movements: [
              ...currentUser.movements,
              { id: currentUser.movements.length + 1, price: -transferAmount },
            ],
          },
          ...prevState.slice(index + 1),
        ];
      });

      setAccounts((prevState) => {
        return [
          ...prevState.slice(0, targetIndex),
          {
            ...targetUser,
            movements: [
              ...targetUser.movements,
              {
                id: targetUser.movements.length + 1,
                price: Number(transferAmount),
              },
            ],
          },
          ...prevState.slice(targetIndex + 1),
        ];
      });
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

  useEffect(() => {
    const timerId = setTimeout(() => {
      setTransferInputError(false);
      setSucessTransferSubmit(false);
    }, 4000);

    return () => clearTimeout(timerId);
  }, [errMessageTransfer, sucessTransferCounter]);

  return (
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
  );
};

export default TransferAction;
