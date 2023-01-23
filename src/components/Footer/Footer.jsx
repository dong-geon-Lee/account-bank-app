import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  sortActiveState,
  totalBalancesState,
} from "../../recoils/accountState";
import { formattedTotal } from "../../helper/formatted";
import {
  ArrowIcons,
  ArrowUpIcons,
  Button,
  Center,
  Container,
  Div,
  Label,
  LeftSide,
  RightSide,
  Span,
  Strong,
} from "./styles";

const Footer = () => {
  const [sortActive, setSortActive] = useRecoilState(sortActiveState);
  const { totalBalance, totalDeposit, totalWithDrawal, totalInterest } =
    useRecoilValue(totalBalancesState);

  const handleMovement = () => {
    setSortActive((prev) => !prev);
  };

  return (
    <Container>
      <LeftSide>
        <Div>
          <Label>입금</Label>
          <Span>{formattedTotal(totalDeposit)}원</Span>
        </Div>
        <Div>
          <Label>출금</Label>
          <Span>{formattedTotal(totalWithDrawal)}원</Span>
        </Div>
        <Div>
          <Label>합계</Label>
          <Span>{formattedTotal(totalBalance)}원</Span>
        </Div>
      </LeftSide>

      <Center>
        <Button onClick={() => handleMovement()}>
          <Strong>정렬</Strong>
          {sortActive ? <ArrowUpIcons /> : <ArrowIcons />}
        </Button>
      </Center>

      <RightSide>
        <Div>
          <Label>
            대출이자 (<Strong>5%</Strong>)
          </Label>
          <Span className="interest">{formattedTotal(totalInterest)}원</Span>
        </Div>
      </RightSide>
    </Container>
  );
};

export default Footer;
