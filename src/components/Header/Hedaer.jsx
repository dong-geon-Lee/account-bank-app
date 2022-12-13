import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  activeUserState,
  messageState,
  userIdState,
} from "../../atoms/accountState";
import { modalState, overlayState } from "../../atoms/modalState";
import { Container, Description, Div, Button, Logo } from "./styles";

const Hedaer = () => {
  const [, setModals] = useRecoilState(modalState);
  const [, setOverlay] = useRecoilState(overlayState);
  const [, setMessage] = useRecoilState(messageState);
  const [activeUser, setActiveUser] = useRecoilState(activeUserState);
  const userId = useRecoilValue(userIdState);

  const handleLogout = () => {
    setActiveUser(false);
    setMessage(`${userId}님 로그아웃 완료!`);
  };

  const handleModals = () => {
    setModals(true);
    setOverlay(true);
  };

  return (
    <Container>
      <Div>
        <Logo />

        <Description>
          {activeUser && userId ? `${userId} 님 환영합니다. ` : ""}
        </Description>
      </Div>

      {activeUser && (
        <Div>
          <Button onClick={handleModals}>회원정보</Button>
          <Button onClick={handleLogout}>로그아웃</Button>
        </Div>
      )}
    </Container>
  );
};

export default Hedaer;
