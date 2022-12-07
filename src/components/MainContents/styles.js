import styled from "styled-components";

export const Container = styled.div``;

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  height: 71rem;
  gap: 2rem;
`;

export const LeftSide = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  overflow: scroll;
  width: 56rem;
  border-radius: 1.6rem;
`;

export const RightSide = styled.div`
  background-color: #f3f3f3;
  display: grid;
  grid-template-rows: repeat(3, 1fr);
  gap: 2.6rem;
  overflow: scroll;
`;
