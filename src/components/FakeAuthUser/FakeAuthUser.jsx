import React, { useEffect, useRef, useState } from "react";
import { authUser, calcRandomNumber } from "../../helper/calculates";
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

const FakeAuthUser = ({
  message,
  accounts,
  setActiveUser,
  setCurrentUser,
  setHidden,
  setMessage,
}) => {
  const [errMessageAccount, setErrMessageAccount] = useState("");
  const [accountInputError, setAccountInputError] = useState(false);

  const userId = useRef();
  const pin = useRef();

  const randomAccIndex = calcRandomNumber(accounts);
  const selectedAccUser = accounts[randomAccIndex];

  const handleGuestAuth = (e) => {
    e.preventDefault();

    const userIdValue = userId.current.value;
    const pinValue = Number(pin.current.value);
    const checkAuthUser = authUser(selectedAccUser, userIdValue, pinValue);

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
        if (selectedAccUser.userId !== userIdValue) {
          conditionStatement("잘못된 아이디입니다!", true);
          return;
        }
        if (selectedAccUser.pin !== pinValue) {
          conditionStatement("잘못된 비밀번호입니다!", true);
          return;
        }
      }
    }

    validationAuth();

    if (checkAuthUser) {
      setCurrentUser(selectedAccUser);
      setActiveUser(true);
      setHidden(false);

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

  useEffect(() => {
    let timerId = setTimeout(() => {
      setMessage(false);
    }, 1000);

    return () => {
      clearTimeout(timerId);
    };
  }, [message]);

  return (
    <Container>
      <Wrapper onSubmit={handleGuestAuth}>
        <Section>
          {message ? (
            <MsgBox>
              <Message>{message}</Message>
            </MsgBox>
          ) : (
            <Message>게스트 계정으로 로그인해주세요.</Message>
          )}

          <Box>
            <Div>
              <Label>아이디</Label>
              <Span>{selectedAccUser.userId}</Span>
            </Div>
            <Div>
              <Label>비밀번호</Label>
              <Span>{selectedAccUser.pin}</Span>
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
        <Button>제출하기</Button>
      </Wrapper>
    </Container>
  );
};

export default FakeAuthUser;
