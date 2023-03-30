import React, { useEffect, useRef, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { authUser, guestAuthUser } from "../../helper/calculates";
import {
  EMPTY__INPUT__ID,
  EMPTY__INPUT__PASSWORD,
  LOGIN__INPUT__ERROR,
  REQUEST__LOGIN__MESSAGE,
  WRONG__INPUT__ID,
  WRONG__INPUT__PASSWORD,
} from "../../constants/constants";
import {
  accountState,
  activeUserState,
  currentUserState,
  messageState,
  randomUserState,
} from "../../recoils/accountState";
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
  Text,
  Form,
} from "./styles";

const FakeAuthUser = () => {
  const [errMessageAccount, setErrMessageAccount] = useState("");
  const [accountInputError, setAccountInputError] = useState(false);

  const userId = useRef();
  const pin = useRef();

  const [, setCurrentUser] = useRecoilState(currentUserState);
  const [, setActiveUser] = useRecoilState(activeUserState);

  const accounts = useRecoilValue(accountState);
  const randomUser = useRecoilValue(randomUserState);
  const message = useRecoilValue(messageState);

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
        conditionStatement(LOGIN__INPUT__ERROR, true);
        return;
      }

      if (!userIdValue || !pinValue) {
        !userIdValue
          ? conditionStatement(EMPTY__INPUT__ID, true)
          : conditionStatement(EMPTY__INPUT__PASSWORD, true);
        return;
      }

      if (userIdValue && pinValue) {
        if (
          randomUser?.userId !== userIdValue &&
          checkAuthGuest?.userId !== userIdValue
        ) {
          conditionStatement(WRONG__INPUT__ID, true);
          return;
        }
        if (randomUser?.pin !== pinValue && checkAuthGuest?.pin !== pinValue) {
          conditionStatement(WRONG__INPUT__PASSWORD, true);
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
      <Form onSubmit={handleGuestAuth}>
        <Section>
          {message ? (
            <MsgBox>
              <Message>{message}</Message>
            </MsgBox>
          ) : (
            <Message>{REQUEST__LOGIN__MESSAGE}</Message>
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
      </Form>
    </Container>
  );
};

export default FakeAuthUser;
