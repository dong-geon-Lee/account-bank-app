import { XMarkIcon } from "@heroicons/react/24/solid";
import styled from "styled-components";

export const Container = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 75rem;
  height: 42rem;
  background-color: #f5f5dc;
  border-radius: 2rem;
  z-index: 5;
`;

export const Wrapper = styled.div`
  padding: 1rem 2rem;
`;

export const Box = styled.div`
  width: 100%;
  margin-bottom: 1rem;
  text-align: center;
  padding: 3rem 0;
`;

export const IconX = styled(XMarkIcon)`
  width: 4rem;
  height: 4rem;
  fill: red;
  cursor: pointer;
  position: absolute;
  top: 10%;
  right: 8%;
`;

export const Div = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 2rem;
  width: 100%;
  margin: 0 0 2rem 0;
`;

export const Text = styled.h1`
  font-size: 3.2rem;
  font-weight: 900;
  color: #364fc7;
  letter-spacing: 2px;

  &.copy {
    font-size: 2.6rem;
    text-align: center;
    font-weight: 900;
    color: #e03131;
    letter-spacing: 1px;
  }
`;

export const Label = styled.label`
  font-size: 2rem;
  font-weight: 500;
`;

export const Span = styled.span`
  font-size: 2rem;
  font-weight: 600;
`;

export const Button = styled.button`
  border: none;
  padding: 1.2rem 2rem;
  background-color: #d3f9d8;
  cursor: pointer;
  font-family: inherit;
  font-size: 1.6rem;
  font-weight: 600;
  letter-spacing: 2px;

  &:hover {
    background-color: #b2f2bb;
  }
`;
