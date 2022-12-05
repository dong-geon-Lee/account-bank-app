import React from "react";
import { TextBox, Container, Section, Label, Span, Text } from "./styles";

const Balance = ({ totalBalance }) => {
  const date = new Date();
  const formattedDate = new Intl.DateTimeFormat("ko-KR").format(date);

  return (
    <Container>
      <Section>
        <TextBox>
          <Label>현재 계좌</Label>
          <Span>{formattedDate}</Span>
        </TextBox>
        <Text>{totalBalance}원</Text>
      </Section>
    </Container>
  );
};

export default Balance;
