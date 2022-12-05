import React, { useEffect, useState } from "react";
import Balance from "../components/Balance/Balance";
import Hedaer from "../components/Header/Hedaer";
import MainContent from "../components/MainContents/MainContent";
import { accounts } from "../data/fakeAccounts";
import { Container, Wrapper } from "./styles";

const Account = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [activeUser, setActiveUser] = useState(false);
  const [message, setMessage] = useState("로그인 해주세요");
  const [totalBalance, setTotalBalance] = useState(0);
  const [bankName, setBankName] = useState("");
  const [username, setUsername] = useState("");

  console.log(currentUser, "현재유저");

  const calcTotalBalance = (movements = []) => {
    const balanceTotal = movements.reduce((acc, cur) => acc + cur.price, 0);
    return balanceTotal;
  };

  useEffect(() => {
    setTotalBalance(calcTotalBalance(currentUser?.movements));
    setBankName(currentUser?.bankAccount);
    setUsername(currentUser?.username);
  }, [currentUser]);

  return (
    <Container>
      <Hedaer
        accounts={accounts}
        setCurrentUser={setCurrentUser}
        setActiveUser={setActiveUser}
        setMessage={setMessage}
      />
      {activeUser ? (
        <Wrapper>
          <Balance totalBalance={totalBalance} bankName={bankName}></Balance>
          <MainContent currentUser={currentUser} />
        </Wrapper>
      ) : (
        <h1>{message}</h1>
      )}
    </Container>
  );
};

export default Account;
