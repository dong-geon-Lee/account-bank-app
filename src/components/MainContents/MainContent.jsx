import React from "react";
import { formattedTotal } from "../../helper/formatted";
import {
  Container,
  LeftSide,
  RightSide,
  Wrapper,
  Div,
  Label,
  Span,
  Section,
  Title,
  Input,
  Box,
  Text,
  Button,
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
                    ? `기록 ${item.id} - 입금내역`
                    : `기록 ${item.id} - 출금내역`}
                </Label>
                <Span>{formattedTotal(item.price)}원</Span>
              </Div>
            ))}
        </LeftSide>

        <RightSide>
          <Section>
            <Title>계좌이체</Title>
            <Box>
              <Text>계좌번호</Text>
              <Input type="text" />
            </Box>
            <Box>
              <Text>송금 금액</Text>
              <Input type="text" />
            </Box>
            <Button>이체하기</Button>
          </Section>

          <Section>
            <Title>대출</Title>
            <Box>
              <Text>계좌명의</Text>
              <Input type="text" />
            </Box>
            <Box>
              <Text>대출 금액</Text>
              <Input type="text" />
            </Box>
            <Button>대출받기</Button>
          </Section>

          <Section>
            <Title>회원탈퇴</Title>
            <Box>
              <Text>아이디</Text>
              <Input type="text" />
            </Box>
            <Box>
              <Text>비밀번호</Text>
              <Input type="text" />
            </Box>
            <Button>계정삭제</Button>
          </Section>
        </RightSide>
      </Wrapper>
    </Container>
  );
};

export default MainContent;
