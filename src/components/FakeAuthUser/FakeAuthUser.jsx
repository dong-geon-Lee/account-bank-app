import React, { useEffect, useRef, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { authUser, guestAuthUser } from "../../helper/calculates";
import {
  accountState,
  activeUserState,
  currentUserState,
  messageState,
  randomUserState,
} from "../../atoms/accountState";
import {
  Box,
  Button,
  Container,
  Div,
  Input,
  InputBox,
  Label,
  Message,
  MsgBox,
  Section,
  Span,
  Wrapper,
  Text,
} from "./styles";

const FakeAuthUser = () => {
  const [, setCurrentUser] = useRecoilState(currentUserState);
  const [, setActiveUser] = useRecoilState(activeUserState);
  const accounts = useRecoilValue(accountState);
  const randomUser = useRecoilValue(randomUserState);
  const message = useRecoilValue(messageState);

  const [errMessageAccount, setErrMessageAccount] = useState("");
  const [accountInputError, setAccountInputError] = useState(false);

  const userId = useRef();
  const pin = useRef();

  const handleGuestAuth = (e) => {
    e.preventDefault();

    const userIdValue = userId.current.value;
    const pinValue = pin.current.value;
    const checkAuthUser = authUser(randomUser, userIdValue, pinValue);
    const checkAuthGuest = guestAuthUser(accounts, userIdValue, pinValue);

    function conditionStatement(message, boolean) {
      setErrMessageAccount(message);
      setAccountInputError(boolean);
    }

    function validationAuth() {
      if (!userIdValue && !pinValue) {
        conditionStatement("아이디와 비밀번호를 입력하세요!", true);
        return;
      }

      if (!userIdValue || !pinValue) {
        !userIdValue
          ? conditionStatement("아이디를 입력하세요!", true)
          : conditionStatement("비밀번호를 입력하세요!", true);
        return;
      }

      if (userIdValue && pinValue) {
        if (
          randomUser?.userId !== userIdValue &&
          checkAuthGuest?.userId !== userIdValue
        ) {
          conditionStatement("잘못된 아이디입니다!", true);
          return;
        }
        if (randomUser?.pin !== pinValue && checkAuthGuest?.pin !== pinValue) {
          conditionStatement("잘못된 비밀번호입니다!", true);
          return;
        }
      }
    }

    validationAuth();

    if (checkAuthUser || checkAuthGuest) {
      setCurrentUser(checkAuthUser ? randomUser : checkAuthGuest);
      setActiveUser(true);

      userId.current.value = "";
      pin.current.value = "";
    }
  };

  useEffect(() => {
    const timerId = setTimeout(() => {
      setAccountInputError(false);
    }, 5000);

    return () => clearTimeout(timerId);
  }, [errMessageAccount]);

  return (
    <Container>
      <Wrapper onSubmit={handleGuestAuth}>
        <Section>
          {message ? (
            <MsgBox>
              <Message>{message}</Message>
            </MsgBox>
          ) : (
            <Message>게스트 계정으로 로그인해주세요</Message>
          )}
          <Box>
            <Div>
              <Label>아이디</Label>
              <Span>{randomUser?.userId}</Span>
            </Div>
            <Div>
              <Label>비밀번호</Label>
              <Span>{randomUser?.pin}</Span>
            </Div>
          </Box>
        </Section>
        <InputBox>
          <Label>아이디</Label>
          <Input type="text" placeholder="guest 아이디 입력" ref={userId} />
        </InputBox>
        <InputBox>
          <Label>비밀번호</Label>
          <Input type="password" placeholder="guest 비밀번호 입력" ref={pin} />
        </InputBox>
        {accountInputError && <Text>{errMessageAccount}</Text>}
        <Button>로그인</Button>
      </Wrapper>
    </Container>
  );
};

export default FakeAuthUser;
