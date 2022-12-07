import React, { useRef, useState } from "react";
import { authUser } from "../../helper/calculates";
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
}) => {
  const [userInputs, setuserInputs] = useState({ userId: "", password: "" });
  const { userId, password } = userInputs;
  const inputRef = useRef();

  const onChange = (e) => {
    setuserInputs({ ...userInputs, [e.target.name]: e.target.value });
  };

  const displayLoginUser = (e) => {
    e.preventDefault();

    if (!authUser(accounts, userId, password)) {
      setActiveUser(false);
      setMessage("잘못된 유저 정보입니다");
      setuserInputs({ userId: "", password: "" });
      inputRef.current.blur();
      return;
    }

    setActiveUser(true);
    setCurrentUser(authUser(accounts, userId, password));
    setuserInputs({ userId: "", password: "" });
    inputRef.current.blur();
  };

  return (
    <Container>
      <Description>
        {name ? `환영합니다! ${name}님` : "시작하려면 로그인하세요"}
      </Description>

      <Div>
        <LogoImg
          src={`${process.env.PUBLIC_URL}/assets/logo.png`}
          alt="logo-image"
        ></LogoImg>
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
