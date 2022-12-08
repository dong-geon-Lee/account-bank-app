import styled, { css } from "styled-components";

export const Div = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem;
  border-bottom: 1.5px solid #eee;
`;

export const Span = styled.span`
  font-size: 2rem;
`;

export const Label = styled.label`
  font-size: 1.6rem;
  border-radius: 2rem;
  padding: 0.26rem 1.2rem;
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
