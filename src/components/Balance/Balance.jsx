import React from "react";
import {
  TextBox,
  Container,
  Section,
  Label,
  Span,
  Text,
  Strong,
} from "./styles";

const Balance = ({ totalBalance, bankName }) => {
  const date = new Date();
  const formattedDate = new Intl.DateTimeFormat("ko-KR").format(date);

  return (
    <Container>
      <Section>
        <TextBox>
          <Label>
            현재 계좌: <Strong>{bankName}</Strong>
          </Label>
          <Span>계좌 번호: 480166-87-1010244</Span>
          <Span>계좌 개설: {formattedDate}</Span>
        </TextBox>
        <Text>{totalBalance}원</Text>
      </Section>
    </Container>
  );
};

export default Balance;
