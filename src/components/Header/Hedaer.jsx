import React, { useRef, useState } from "react";
import { findCorrectUser } from "../../helper/calculates";
import {
  Container,
  Description,
  Div,
  LogoImg,
  Form,
  Input,
  Button,
  ArrowIcons,
} from "./styles";

const Hedaer = ({
  accounts,
  setActiveUser,
  setMessage,
  setCurrentUser,
  name,
  setHidden,
  activeUser,
}) => {
  const [userInputs, setuserInputs] = useState({ userId: "", password: "" });
  const { userId, password } = userInputs;
  const inputRef = useRef();

  const onChange = (e) => {
    setuserInputs({ ...userInputs, [e.target.name]: e.target.value });
  };

  const displayLoginUser = (e) => {
    e.preventDefault();

    if (!findCorrectUser(accounts, userId, password)) {
      setActiveUser(false);
      setMessage("로그아웃 완료!");
      setuserInputs({ userId: "", password: "" });
      inputRef.current.blur();
      return;
    }

    setActiveUser(true);
    setHidden(false);
    setCurrentUser(findCorrectUser(accounts, userId, password));
    setuserInputs({ userId: "", password: "" });
    inputRef.current.blur();
  };

  return (
    <Container>
      <Div>
        <LogoImg
          src={`${process.env.PUBLIC_URL}/assets/logo.png`}
          alt="logo-image"
        ></LogoImg>
        <Description>
          {activeUser && name ? `환영합니다! ${name}님` : ""}
        </Description>
      </Div>

      <Form onSubmit={displayLoginUser}>
        <Input
          type="text"
          placeholder="아이디"
          name="userId"
          value={userId}
          onChange={onChange}
          ref={inputRef}
        />

        <Input
          type="password"
          placeholder="비밀번호"
          name="password"
          value={password}
          onChange={onChange}
          ref={inputRef}
        />

        <Button type="submit">
          <ArrowIcons />
        </Button>
      </Form>
    </Container>
  );
};

export default Hedaer;
