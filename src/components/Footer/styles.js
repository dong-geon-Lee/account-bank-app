import styled from "styled-components";
import { ArrowLongDownIcon, ArrowLongUpIcon } from "@heroicons/react/24/solid";

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1.2rem;
`;

export const LeftSide = styled.section`
  display: flex;
  gap: 2.4rem;
`;

export const Div = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;

  & + div span {
    color: #f4445d;
  }

  & + div + div span {
    color: #ffbe06;
  }

  & span.interest {
    color: #339af0;
  }
`;

export const Label = styled.label`
  font-size: 1.6rem;
  font-weight: 400;
`;

export const Span = styled.span`
  font-size: 2.4rem;
  font-weight: 700;
  color: #66c873;
`;

export const Center = styled.section`
  display: flex;
  align-items: center;
  margin: auto 0;
`;

export const Button = styled.button`
  border: none;
  padding: 1.6rem 2rem;
  background-color: #f5f5dc;
  font-family: inherit;
  font-size: 1.6rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  letter-spacing: 1rem;

  &:hover {
    opacity: 0.95;
  }
`;

export const ArrowIcons = styled(ArrowLongDownIcon)`
  width: 2.4rem;
  height: 2.4rem;
  fill: #222;
`;

export const ArrowUpIcons = styled(ArrowLongUpIcon)`
  width: 2.4rem;
  height: 2.4rem;
  fill: #222;
`;

export const RightSide = styled.section``;

export const Strong = styled.strong``;
