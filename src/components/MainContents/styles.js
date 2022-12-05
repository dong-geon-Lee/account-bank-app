import styled, { css } from "styled-components";

export const Container = styled.div``;

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  height: 49rem;
  gap: 1.8rem;

  /* overflow: hidden; */
`;

export const LeftSide = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  overflow: scroll;
  width: 56rem;
  border-radius: 1.6rem;
`;

export const Div = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem;
`;

export const Label = styled.label`
  font-size: 1.6rem;
  border-radius: 2rem;
  padding: 1rem 1.8rem;
  letter-spacing: 1px;
  color: #fff;

  ${(props) =>
    props.check
      ? css`
          background-image: linear-gradient(to top left, #39b385, #9be15d);
        `
      : css`
          background-image: linear-gradient(to top left, #e52a5a, #ff585f);
        `}
`;

export const Span = styled.span`
  font-size: 2rem;
`;

export const RightSide = styled.div`
  background-color: #f3f3f3;
  display: grid;
  grid-template-rows: repeat(3, 1fr);
  gap: 1.8rem;
`;

export const Section = styled.section`
  background-color: #ffbf04;
  border-radius: 1.6rem;
  padding: 1.6rem 2rem;

  & + section {
    background-color: #61c378;
    & + section {
      background-color: #f4445d;
    }
  }
`;

export const Title = styled.h1`
  font-size: 1.8rem;
`;
