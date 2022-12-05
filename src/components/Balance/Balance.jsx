import React from "react";
import { TextBox, Container, Section, Label, Span, Text } from "./styles";

const Balance = () => {
  const date = new Date();
  const formattedDate = new Intl.DateTimeFormat("ko-KR").format(date);

  return (
    <Container>
      <Section>
        <TextBox>
          <Label>Current balance</Label>
          <Span>{formattedDate}</Span>
        </TextBox>
        <Text>3840원</Text>
      </Section>
    </Container>
  );
};

export default Balance;
