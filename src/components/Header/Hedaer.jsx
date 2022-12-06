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
  const [userInputs, setuserInputs] = useState({ username: "", pin: "" });
  const inputRef = useRef();

  const onChange = (e) => {
    setuserInputs({ ...userInputs, [e.target.name]: e.target.value });
  };

  const checkUser = () => {
    const { username, pin } = userInputs;
    const accountList = accounts.map((acc) => acc);
    const loginUser = accountList.find(
      (acc) => acc.username === username && acc.pin === +pin
    );

    return loginUser;
  };

  const displayLoginUser = (e) => {
    e.preventDefault();

    if (!checkUser()) {
      setuserInputs({ username: "", pin: "" });
      setMessage("잘못된 유저 정보입니다");
      setActiveUser(false);
      inputRef.current.blur();
      return;
    }

    setActiveUser(true);
    setCurrentUser(checkUser());
    setuserInputs({ username: "", pin: "" });
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
          name="pin"
          value={userInputs.pin}
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
