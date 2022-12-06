import React from "react";
import { formattedDates, formattedTotal } from "../../helper/formatted";
import {
  TextBox,
  Container,
  Section,
  Label,
  Span,
  Text,
  Strong,
} from "./styles";

const Balance = ({ totalBalance, bankName, accNumber, dates }) => {
  return (
    <Container>
      <Section>
        <TextBox>
          <Label>
            현재 계좌: <Strong>{bankName}</Strong>
          </Label>
          <Span>계좌 번호: {accNumber}</Span>
          <Span>계좌 개설: {formattedDates(dates)}</Span>
        </TextBox>
        <Text>{formattedTotal(totalBalance)}원</Text>
      </Section>
    </Container>
  );
};

export default Balance;
