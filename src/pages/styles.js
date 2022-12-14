import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from{
    opacity: 0;
  } 
  to {
    opacity: 1;
  }
`;

export const Container = styled.div``;

export const Wrapper = styled.div`
  max-width: 100rem;
  margin: 0 auto;
  animation: ${(props) => !props.hidden && fadeIn} 1.2s linear;
`;
