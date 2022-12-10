import React from "react";
import { formattedDates, formattedTotal } from "../../helper/formatted";
import { TextBox, Container, Section, Span, Text, Strong } from "./styles";

const Balance = ({ totalBalance, bankName, accNumber, dates, name }) => {
  return (
    <Container>
      <Section>
        <TextBox>
          <Span>
            계좌명의: <Strong>{name}</Strong>
          </Span>
          <Span>
            계좌번호: <Strong>{accNumber}</Strong>
          </Span>
          <Span>계좌개설: {formattedDates(dates)}</Span>
        </TextBox>
        <TextBox>
          <Span>
            현재계좌: <Strong>{bankName}</Strong>
          </Span>
          <Text>{formattedTotal(totalBalance)}원</Text>
        </TextBox>
      </Section>
    </Container>
  );
};

export default Balance;
