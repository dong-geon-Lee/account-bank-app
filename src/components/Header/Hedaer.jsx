import React, { useRef, useState } from "react";
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
  const [userInputs, setuserInputs] = useState({ username: "", password: "" });
  const inputRef = useRef();

  const onChange = (e) => {
    setuserInputs({ ...userInputs, [e.target.name]: e.target.value });
  };

  const checkUser = () => {
    const { username, password } = userInputs;
    const accountList = accounts.map((acc) => acc);
    const loginUser = accountList.find(
      (acc) => acc.userId === username && acc.pin === +password
    );

    return loginUser;
  };

  const displayLoginUser = (e) => {
    e.preventDefault();

    if (!checkUser()) {
      setuserInputs({ username: "", password: "" });
      setMessage("잘못된 유저 정보입니다");
      setActiveUser(false);
      inputRef.current.blur();
      return;
    }

    setActiveUser(true);
    setCurrentUser(checkUser());
    setuserInputs({ username: "", password: "" });
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
          name="username"
          value={userInputs.username}
          onChange={onChange}
          ref={inputRef}
        />
        <Input
          type="password"
          placeholder="비밀번호"
          name="password"
          value={userInputs.password}
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
