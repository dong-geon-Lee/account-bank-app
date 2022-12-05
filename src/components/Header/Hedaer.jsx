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

const Hedaer = ({ accounts, setActiveUser, setMessage }) => {
  const [userInfo, setuserInfo] = useState({ username: "", pin: "" });
  const inputRef = useRef();

  const onChange = (e) => {
    setuserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const displayLoginUser = (e) => {
    e.preventDefault();

    if (!userCheck()) {
      setuserInfo({ username: "", pin: "" });
      setMessage("잘못된 유저 정보입니다");
      setActiveUser(false);
      inputRef.current.blur();
      return;
    }

    setActiveUser(true);
    setMessage("로그인 완료!");
    setuserInfo({ username: "", pin: "" });
    inputRef.current.blur();
  };

  const userCheck = () => {
    const { username, pin } = userInfo;

    const accountList = accounts.map((acc) => {
      const username = acc.username;
      const pin = +acc.pin;
      return { username, pin };
    });

    const loginUser = accountList.find(
      (acc) => acc.username === username && acc.pin === +pin
    );

    return loginUser;
  };

  return (
    <Container>
      <Description>Log in to get started</Description>
      <Div>
        <LogoImg
          src={`${process.env.PUBLIC_URL}/assets/logo.png`}
          alt="logo-image"
        ></LogoImg>
      </Div>

      <Form onSubmit={displayLoginUser}>
        <Input
          type="text"
          placeholder="user"
          name="username"
          value={userInfo.username}
          onChange={onChange}
          ref={inputRef}
        />
        <Input
          type="password"
          placeholder="PIN"
          name="pin"
          value={userInfo.pin}
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
