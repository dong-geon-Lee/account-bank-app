import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { modalState, overlayState } from "../../recoils/modalState";
import { Container, Description, Div, Button, Logo } from "./styles";
import {
  activeUserState,
  currentUserState,
  messageState,
} from "../../recoils/accountState";

const Hedaer = () => {
  const { userId } = useRecoilValue(currentUserState);
  const [, setModals] = useRecoilState(modalState);
  const [, setOverlay] = useRecoilState(overlayState);
  const [, setActiveUser] = useRecoilState(activeUserState);
  const [, setMessage] = useRecoilState(messageState);

  const openModals = () => {
    setModals(true);
    setOverlay(true);
  };

  const handleLogout = () => {
    setActiveUser(false);
    setMessage(`${userId}님 로그아웃 완료!`);
  };

  return (
    <Container>
      <Div>
        <Logo src={process.env.PUBLIC_URL + "/assets/bank.png"} />
        <Description>{userId} 님 환영합니다.</Description>
      </Div>

      <Div>
        <Button onClick={openModals}>회원정보</Button>
        <Button onClick={handleLogout}>로그아웃</Button>
      </Div>
    </Container>
  );
};

export default Hedaer;
