import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from{
    opacity: 0;
  } 
  to {
    opacity: 1;
  }
`;

export const Container = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
`;

export const Wrapper = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: beige;
  width: 50rem;
  height: 54rem;
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -40%);
  padding: 0 4rem;
`;

export const Message = styled.h1`
  font-size: 2.4rem;
  text-align: center;
  letter-spacing: 1px;
  line-height: 2;
`;

export const Section = styled.section`
  margin-bottom: 2rem;
  width: 80%;
`;

export const Form = styled.form``;

export const Div = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2.4rem;
`;

export const InputBox = styled(Div)`
  margin: 1.2rem 0;
  width: 80%;
  justify-content: space-between;

  & label {
    font-weight: 400;
  }
`;

export const Input = styled.input`
  padding: 1.2rem;
  font-family: inherit;
  font-size: 1.6rem;
  outline: none;
  border: none;
`;

export const Label = styled.label`
  font-size: 2rem;
  font-weight: 800;
  text-align: left;
`;

export const Span = styled.span`
  font-size: 2.4rem;
  font-weight: 700;
  letter-spacing: 1px;
  margin-left: auto;
`;

export const Br = styled.br``;

export const Button = styled.button`
  width: 80%;
  padding: 2rem;
  display: inline-block;
  border: none;
  font-family: inherit;
  font-size: 2rem;
  font-weight: 800;
  margin: 3rem 0 0 0;
  background-color: #e3fafc;
  cursor: pointer;
  letter-spacing: 1px;

  &:hover {
    background-color: #c5f6fa;
  }
`;

export const MsgBox = styled.div`
  border: 1px solid #000;
  margin-bottom: 3rem;
`;

export const Box = styled.div`
  background-color: #d8f5a2;
  padding: 2rem;
  margin: 1rem 0 0 0;
`;

export const Text = styled.p`
  font-size: 1.6rem;
  font-weight: 900;
  text-align: center;
  color: #f8f9fa;
  background-color: #ff0022;
  animation: ${fadeIn} 0.3s ease-in-out;
  width: 80%;

  &.success {
    background-color: #37b24d;
  }
`;
