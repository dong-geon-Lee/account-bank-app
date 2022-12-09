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

const Balance = ({ totalBalance, bankName, accNumber, dates, name }) => {
  return (
    <Container>
      <Section>
        <TextBox>
          <Label>
            현재계좌: <Strong>{bankName}</Strong>
          </Label>
          <Span>계좌명의: {name}</Span>
          <Span>계좌번호: {accNumber}</Span>
          <Span>계좌개설: {formattedDates(dates)}</Span>
        </TextBox>
        <Text>{formattedTotal(totalBalance)}원</Text>
      </Section>
    </Container>
  );
};

export default Balance;
