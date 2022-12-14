import React from "react";
import GlobalStyle from "./styles/GlobalStyle";
import Account from "./pages/Account";

const App = () => {
  console.log("여기는 recoil 브랜치입니다");
  return (
    <>
      <GlobalStyle />
      <Account />
    </>
  );
};

export default App;
