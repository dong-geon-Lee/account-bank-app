import React from "react";
import { Container, Description, Div, Button, Logo } from "./styles";

const Hedaer = ({
  setActiveUser,
  setMessage,
  userId,
  activeUser,
  setShowModals,
  setOverlays,
}) => {
  const handleLogout = () => {
    setActiveUser(false);
    setMessage(`${userId}님 로그아웃 완료!`);
  };

  const handleModals = () => {
    setShowModals(true);
    setOverlays(true);
  };

  return (
    <Container>
      <Div>
        <Logo />

        <Description>
          {activeUser && userId ? `환영합니다! ${userId} 님.` : ""}
        </Description>
      </Div>

      {activeUser && (
        <Div>
          <Button onClick={() => handleModals()}>회원정보</Button>
          <Button onClick={handleLogout}>로그아웃</Button>
        </Div>
      )}
    </Container>
  );
};

export default Hedaer;
