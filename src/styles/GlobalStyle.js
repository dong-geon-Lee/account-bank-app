import { createGlobalStyle } from "styled-components";

const size = {
  mobile: "425px",
  tablet: "768px",
  laptop: "1024px",
  desktop: "1440px",
};

export const device = {
  mobile: `(max-width: ${size.mobile})`,
  tablet: `(max-width: ${size.tablet})`,
  laptop: `(max-width: ${size.laptop})`,
  desktop: `(max-width: ${size.desktop})`,
};

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0; 
    padding: 0; 
    box-sizing: inherit;
  }

  html {
    font-size: 62.5%;
    box-sizing: border-box;
    overflow-x: hidden;
  }

  body {
    font-family: 'Poppins', sans-serif;
    background-color: #f3f3f3;
    line-height: 1.5;
    overflow: hidden;
    position: relative;
    width: 100vw;
    height: 100vh;
  }
`;

export default GlobalStyle;
