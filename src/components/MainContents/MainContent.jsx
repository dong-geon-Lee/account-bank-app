import React from "react";
import {
  Container,
  LeftSide,
  RightSide,
  Wrapper,
  Div,
  Label,
  Span,
} from "./styles";

const MainContent = ({ currentUser }) => {
  const { username, pin, movements, interestRate } = currentUser;
  const items = currentUser ? movements : [];

  return (
    <Container>
      <Wrapper>
        <LeftSide>
          {items
            .sort((a, b) => b.id - a.id)
            .map((item) => (
              <Div key={item.id}>
                <Label check={item.price > 0}>
                  {item.price > 0
                    ? `${item.id}번째 입금 내역`
                    : `${item.id}번쨰 출금 내역`}
                </Label>
                <Span>{item.price}원</Span>
              </Div>
            ))}
        </LeftSide>

        <RightSide>right</RightSide>
      </Wrapper>
    </Container>
  );
};

export default MainContent;
