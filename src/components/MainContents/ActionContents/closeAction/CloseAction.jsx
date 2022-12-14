import React, { useEffect, useState } from "react";
import { Box, Button, Form, Input, Message, Text, Title } from "../styles";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  accountState,
  activeUserState,
  currentUserState,
  messageState,
  transferInfoState,
} from "../../../../atoms/accountState";
import {
  authUser,
  calcUserIndex,
  findLoginUser,
} from "../../../../helper/calculates";

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
        conditionStatement("존재하지 않거나 잘못된 아이디입니다!", true);
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

      let accountLists = accounts.slice(0, accounts.length);
      accountLists.splice(index, 1);

      setCurrentUser(null);
      setAccounts(accountLists);
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
      setAccountInputError(false);
    }, 4000);

    return () => clearTimeout(timerId);
  }, [errMessageAccount]);

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
