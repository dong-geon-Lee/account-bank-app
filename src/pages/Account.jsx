import React, { useState } from "react";
import Hedaer from "../components/Header/Hedaer";
import { accounts } from "../data/fakeAccounts";
import { Container } from "./styles";

const Account = () => {
  const [activeUser, setActiveUser] = useState(false);
  const [message, setMessage] = useState("로그인 해주세요");

  return (
    <Container>
      <Hedaer
        accounts={accounts}
        setActiveUser={setActiveUser}
        setMessage={setMessage}
      />
      {activeUser ? <h1>{message}</h1> : <h1>{message}</h1>}
    </Container>
  );
};

export default Account;
