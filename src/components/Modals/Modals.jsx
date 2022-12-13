import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { accountState, currentUserState } from "../../atoms/accountState";
import { modalState, overlayState } from "../../atoms/modalState";
import { calcFilterUser } from "../../helper/calculates";
import {
  Container,
  Div,
  Wrapper,
  Button,
  Label,
  Span,
  Text,
  IconX,
  Box,
} from "./styles";

const Modals = () => {
  const [, setModals] = useRecoilState(modalState);
  const [, setOverlay] = useRecoilState(overlayState);
  const accounts = useRecoilValue(accountState);
  const currentUser = useRecoilValue(currentUserState);

  const [copyMessage, setCopyMessage] = useState("");
  const [activeCopy, setActiveCopy] = useState(false);
  const [successCounter, setSuccessCounter] = useState(0);

  const items = calcFilterUser(accounts, currentUser);

  const closeModals = () => {
    setModals(false);
    setOverlay(false);
  };

  const handleCopyText = (item) => {
    navigator.clipboard.writeText(item.accountNumber);
    setActiveCopy(true);
    setSuccessCounter((prev) => prev + 1);
    setCopyMessage(`${item.name}님의 계좌번호가 복사되었습니다!`);
  };

  useEffect(() => {
    const timerId = setTimeout(() => {
      setActiveCopy(false);
      setCopyMessage("");
    }, 2000);
    return () => clearTimeout(timerId);
  }, [copyMessage, activeCopy, successCounter]);

  return (
    <Container>
      <Wrapper>
        <Box>
          <Text>
            {currentUser.userId} [ {currentUser.name} ]의 계좌목록
          </Text>
          <IconX onClick={() => closeModals()} />
        </Box>

        {items.map((item) => (
          <Div key={item.userId}>
            <Label>{item.userId}</Label>
            <Label>{item.pin}</Label>
            <Label>{item.name}</Label>
            <Span>{item.accountNumber}</Span>
            <Button onClick={() => handleCopyText(item)}>계좌복사</Button>
          </Div>
        ))}
        {activeCopy && <Text className="copy">{copyMessage}</Text>}
      </Wrapper>
    </Container>
  );
};

export default Modals;
