import React from "react";
import { useRecoilValue } from "recoil";
import { formattedDates, formattedTotal } from "../../helper/formatted";
import { TextBox, Container, Section, Span, Text, Strong } from "./styles";
import {
  balanceInfoState,
  totalBalancesState,
} from "../../recoils/accountState";

const Balance = () => {
  const { totalBalance } = useRecoilValue(totalBalancesState);
  const { bankAccount, accountNumber, createdDate, name } =
    useRecoilValue(balanceInfoState);

  return (
    <Container>
      <Section>
        <TextBox>
          <Span>
            계좌명의: <Strong>{name}</Strong>
          </Span>
          <Span>
            계좌번호: <Strong>{accountNumber}</Strong>
          </Span>
          <Span>계좌개설: {formattedDates(createdDate)}</Span>
        </TextBox>
        <TextBox>
          <Span>
            현재계좌: <Strong>{bankAccount}</Strong>
          </Span>
          <Text>{formattedTotal(totalBalance)}원</Text>
        </TextBox>
      </Section>
    </Container>
  );
};

export default Balance;
