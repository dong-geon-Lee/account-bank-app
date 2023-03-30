import React, { useEffect, useState } from "react";
import { Box, Button, Form, Input, Message, Text, Title } from "../styles";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  accountState,
  activeUserState,
  currentUserState,
  messageState,
  transferInfoState,
} from "../../../../recoils/accountState";
import {
  authUser,
  calcAccountRange,
  calcUserIndex,
  findLoginUser,
} from "../../../../helper/calculates";
import {
  CLOSE__INPUT__ERROR,
  DELETE__ACCOUNTS,
  EMPTY__INPUT__ID,
  EMPTY__INPUT__PASSWORD,
  NOT__CORRECT__PASSWORD,
  NOT__EXIST__ID,
} from "../../../../constants/constants";

const CloseAction = () => {
  const accounts = useRecoilValue(accountState);
  const currentUser = useRecoilValue(currentUserState);

  const setCurrentUser = useSetRecoilState(currentUserState);
  const setAccounts = useSetRecoilState(accountState);
  const [, setActiveUser] = useRecoilState(activeUserState);
  const [, setMessage] = useRecoilState(messageState);
  const [transferInfo, setTransferInfo] = useRecoilState(transferInfoState);
  const { userId, password } = transferInfo;

  const [accountInputError, setAccountInputError] = useState(false);
  const [errMessageAccount, setErrMessageAccount] = useState("");

  const onChange = (e) => {
    setTransferInfo({ ...transferInfo, [e.target.name]: e.target.value });
  };

  const closeAccount = (e) => {
    e.preventDefault();

    function conditionStatement(message, boolean) {
      setErrMessageAccount(message);
      setAccountInputError(boolean);
    }

    if (!userId && !password) {
      conditionStatement(CLOSE__INPUT__ERROR, true);
      return;
    }

    if (!userId || !password) {
      !userId
        ? conditionStatement(EMPTY__INPUT__ID, true)
        : conditionStatement(EMPTY__INPUT__PASSWORD, true);
      return;
    }

    if (userId && password) {
      const loginUser = findLoginUser(accounts, currentUser);

      if (loginUser.userId !== userId) {
        conditionStatement(NOT__EXIST__ID, true);
        return;
      }

      if (loginUser.pin !== Number(password)) {
        conditionStatement(NOT__CORRECT__PASSWORD, true);
        return;
      }
    }

    const checkLoginUser = findLoginUser(accounts, currentUser);
    const checkAuthUser = authUser(checkLoginUser, userId, password);

    if (checkAuthUser) {
      const index = calcUserIndex(accounts, checkLoginUser);
      const accountLists = calcAccountRange(accounts);
      accountLists.splice(index, 1);

      setCurrentUser(null);
      setAccounts(accountLists);
      setActiveUser(false);
      setMessage(`${currentUser.userId} ${DELETE__ACCOUNTS}`);
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
      setAccountInputError(false);
    }, 4000);

    return () => clearTimeout(timerId);
  }, [errMessageAccount, accountInputError]);

  return (
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
  );
};

export default CloseAction;
