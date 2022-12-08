import styled, { css, keyframes } from "styled-components";

const fadeIn = keyframes`
  from{
    opacity: 0;
  } 
  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

export const Container = styled.div``;

export const Wrapper = styled.div`
  max-width: 100rem;
  margin: 0 auto;
  opacity: ${(props) => (props.hidden ? 0 : 1)};
  animation: ${(props) => !props.hidden && fadeIn} 1.2s linear;

  /* ${(props) =>
    props.hidden
      ? css`
          animation: ${fadeOut} 1.2s linear;
        `
      : css`
          animation: ${fadeIn} 1.2s linear;
        `} */
  /* 
  visibility: ${(props) => (props.hidden ? "hidden" : "visible")};
  animation: ${(props) => (props.hidden ? fadeOut : fadeIn)} 1s linear;
  transition: visibility 1s linear; */
`;
