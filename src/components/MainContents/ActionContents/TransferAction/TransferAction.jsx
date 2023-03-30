import React, { useEffect, useState } from "react";
import { Box, Button, Form, Input, Message, Text, Title } from "../styles";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  accountState,
  currentUserState,
  totalBalancesState,
  transferInfoState,
} from "../../../../recoils/accountState";
import {
  calcTransferLimit,
  exeedTransfer,
  findAccountNumber,
  findLoginUser,
} from "../../../../helper/calculates";
import {
  COMPLETE__TRANSFER,
  EMPTY__ACCOUNT__NUMBER,
  EMPTY__TRANSFER__AMOUNT,
  FAIL__TRANSFER,
  NOT__CORRECT__ACCOUNT,
  NOT__MILLION__TRANSFER,
  NOT__TRANSFER__ACCOUNT,
  TRANSFER__INPUT__ERROR,
} from "../../../../constants/constants";

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
      conditionStatement(TRANSFER__INPUT__ERROR, true);
      return;
    }

    if (!accNumber || !transferAmount) {
      !accNumber
        ? conditionStatement(EMPTY__ACCOUNT__NUMBER, true)
        : conditionStatement(EMPTY__TRANSFER__AMOUNT, true);
      return;
    }

    if (accNumber && transferAmount) {
      const loginUser = findLoginUser(accounts, currentUser);
      const checkAccount = findAccountNumber(accounts, accNumber);

      if (loginUser?.accountNumber === accNumber) {
        conditionStatement(NOT__TRANSFER__ACCOUNT, true);
        return;
      }

      if (checkAccount?.accountNumber !== accNumber) {
        conditionStatement(NOT__CORRECT__ACCOUNT, true);
        return;
      }

      if (exeedTransfer(transferAmount)) {
        conditionStatement(NOT__MILLION__TRANSFER, true);
        return;
      }

      if (Number(transferAmount) > totalBalance) {
        conditionStatement(FAIL__TRANSFER, true);
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
          {
            id: currentUser.movements.length + 1,
            price: Number(-transferAmount),
          },
        ],
      });

      setAccounts((prevState) => {
        return prevState.map((user) => {
          if (user.userId === currentUser.userId) {
            return {
              ...user,
              movements: [
                ...user.movements,
                {
                  id: user.movements.length + 1,
                  price: Number(-transferAmount),
                },
              ],
            };
          } else if (user.userId === targetTransferUser.userId) {
            return {
              ...user,
              movements: [
                ...user.movements,
                {
                  id: user.movements.length + 1,
                  price: Number(transferAmount),
                },
              ],
            };
          } else {
            return { ...user };
          }
        });
      });

      setSuccessTransferMessage(COMPLETE__TRANSFER);
      setSucessTransferSubmit(true);
      setSucessTransferCounter((prev) => prev + 1);
    }

    setErrMessageTransfer("");
    setTransferInputError(false);
    setSucessTransferCounter(0);
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
