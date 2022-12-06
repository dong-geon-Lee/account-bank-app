import React, { useEffect, useState } from "react";
import Balance from "../components/Balance/Balance";
import Hedaer from "../components/Header/Hedaer";
import MainContent from "../components/MainContents/MainContent";
import { accounts } from "../data/fakeAccounts";
import { calcTotalBalance } from "../helper/calculates";
import { Container, Wrapper } from "./styles";

const Account = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [activeUser, setActiveUser] = useState(false);
  const [message, setMessage] = useState("로그인 해주세요");
  const [totalBalance, setTotalBalance] = useState(0);
  const [bankName, setBankName] = useState("");
  const [name, setName] = useState("");
  const [accNumber, setAccNumber] = useState("");
  const [dates, setDates] = useState(null);

  console.log(currentUser, "현재유저");

  useEffect(() => {
    setTotalBalance(calcTotalBalance(currentUser?.movements));
    setBankName(currentUser?.bankAccount);
    setName(currentUser?.name);
    setAccNumber(currentUser?.accountNumber);
    setDates(currentUser?.createdDate);
  }, [currentUser]);

  return (
    <Container>
      <Hedaer
        accounts={accounts}
        name={name}
        setCurrentUser={setCurrentUser}
        setActiveUser={setActiveUser}
        setMessage={setMessage}
      />
      {activeUser ? (
        <Wrapper>
          <Balance
            totalBalance={totalBalance}
            bankName={bankName}
            accNumber={accNumber}
            dates={dates}
          ></Balance>
          <MainContent currentUser={currentUser} />
        </Wrapper>
      ) : (
        <h1>{message}</h1>
      )}
    </Container>
  );
};

export default Account;
