import styled from "styled-components";
import { ArrowLongRightIcon } from "@heroicons/react/24/solid";

export const Container = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 4rem;
`;

export const Description = styled.h2`
  font-size: 2.4rem;
  font-weight: 600;
`;

export const Div = styled.div`
  display: flex;
  align-items: center;
  gap: 2.4rem;
`;

export const LogoImg = styled.img`
  width: 5.6rem;
  height: 5.6rem;
`;

export const Form = styled.form`
  display: flex;
  align-items: center;
  gap: 1rem;
  /* flex: 0.35; */
`;

export const Input = styled.input`
  width: 100%;
  font-family: inherit;
  font-size: 1.8rem;
  text-align: center;
  border: 1px solid #e9ecef;
  border-radius: 2rem;
  outline: none;
  padding: 0.8rem 1.2rem;
  transition: border 0.4s ease;

  &:focus {
    border: 1px solid #adb5bd;
  }
`;

export const ArrowIcons = styled(ArrowLongRightIcon)`
  width: 3.6rem;
  height: 3.6rem;
  fill: #222;
  display: flex;
  align-items: center;
  transition: fill 0.4s ease;

  &:hover {
    fill: #adb5bd;
  }
`;

export const Button = styled.button`
  background-color: inherit;
  border: none;
  outline: none;
  cursor: pointer;
`;
