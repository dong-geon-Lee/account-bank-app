import styled, { css } from "styled-components";

export const Container = styled.div``;

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  height: 59rem;
  gap: 2rem;
  /* overflow: scroll; */
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
  padding: 0.4rem 1.8rem;
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
  gap: 2.6rem;
  overflow: scroll;
`;

export const Section = styled.section`
  background-image: linear-gradient(to top left, #ffb003, #ffcb03);
  border-radius: 1.6rem;
  padding: 1.6rem 2rem;

  & + section {
    background-image: linear-gradient(to top left, #39b385, #9be15d);

    & input {
      background-color: #8ce99a;
    }

    & button {
      background-color: #8ce99a;
    }

    & + section {
      background-image: linear-gradient(to top left, #e52a5a, #ff585f);

      & input {
        background-color: #ff8787;
      }
      & button {
        background-color: #ff8787;
      }
    }
  }
`;

export const Title = styled.h1`
  font-size: 2.2rem;
  font-weight: 800;
  text-align: center;
  letter-spacing: 1px;
`;

export const Box = styled(Div)`
  padding: 1.6rem 0rem;
`;

export const Input = styled.input`
  border: none;
  outline: none;
  padding: 0.8rem 1rem;
  border-radius: 1rem;
  font-size: 2rem;
  background-color: #ffd883;
  text-align: center;
  font-family: inherit;
  transition: all 0.4s ease;
  color: black;
  font-weight: 600;
  width: 50%;

  &:focus {
    opacity: 0.8;
    width: 60%;
    background-color: beige;
  }
`;

export const Text = styled.h2`
  font-size: 1.8rem;
  font-weight: 600;
  letter-spacing: 1px;
`;

export const Button = styled.button`
  width: 100%;
  border: none;
  padding: 1.6rem;
  margin: 1rem 0 0 0;
  cursor: pointer;
  font-family: inherit;
  font-weight: 800;
  font-size: 1.6rem;
  letter-spacing: 1px;
  background-color: #ffd883;

  &:hover {
    background-color: #e7f5ff;
    opacity: 0.9;
  }
`;
