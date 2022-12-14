import styled from "styled-components";
import { BuildingLibraryIcon } from "@heroicons/react/24/solid";

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

export const Logo = styled(BuildingLibraryIcon)`
  width: 5.6rem;
  height: 5.6rem;
`;

export const Button = styled.button`
  background-color: inherit;
  border: none;
  outline: none;
  cursor: pointer;
  font-size: 2.4rem;
  font-weight: 600;
  font-family: inherit;
`;
