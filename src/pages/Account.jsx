import React, { useEffect, useState } from "react";
import Balance from "../components/Balance/Balance";
import Footer from "../components/Footer/Footer";
import Hedaer from "../components/Header/Hedaer";
import MainContent from "../components/MainContents/MainContent";
import { accounts } from "../data/fakeAccounts";
import { Container, Wrapper } from "./styles";
import {
  calcDeposit,
  calcTotalBalance,
  calcWithDrawal,
} from "../helper/calculates";
import FakeAuthUser from "../components/FakeAuthUser/FakeAuthUser";

const Account = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [activeUser, setActiveUser] = useState(false);
  const [message, setMessage] = useState("");
  const [totalBalance, setTotalBalance] = useState(0);
  const [bankName, setBankName] = useState("");
  const [name, setName] = useState("");
  const [accNumber, setAccNumber] = useState("");
  const [dates, setDates] = useState(null);
  const [hidden, setHidden] = useState(false);
  const [totalDeposit, setTotalDeposit] = useState(0);
  const [totalWithDrawal, settotalWithDrawal] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [sortActive, setSortActive] = useState(false);

  useEffect(() => {
    setTotalBalance(calcTotalBalance(currentUser?.movements));
    setBankName(currentUser?.bankAccount);
    setName(currentUser?.name);
    setAccNumber(currentUser?.accountNumber);
    setDates(currentUser?.createdDate);
    setTotalDeposit(calcDeposit(currentUser?.movements));
    settotalWithDrawal(calcWithDrawal(currentUser?.movements));
    setTotalInterest(currentUser?.totalInterest);
  }, [currentUser]);

  console.log(currentUser);

  return (
    <Container>
      <Hedaer
        name={name}
        accounts={accounts}
        setCurrentUser={setCurrentUser}
        setActiveUser={setActiveUser}
        setMessage={setMessage}
        setHidden={setHidden}
        activeUser={activeUser}
      />

      {activeUser ? (
        <Wrapper hidden={hidden}>
          <Balance
            totalBalance={totalBalance}
            bankName={bankName}
            accNumber={accNumber}
            dates={dates}
            name={name}
          />
          <MainContent
            currentUser={currentUser}
            accounts={accounts}
            totalBalance={totalBalance}
            setCurrentUser={setCurrentUser}
            setHidden={setHidden}
            sortActive={sortActive}
            setActiveUser={setActiveUser}
            setMessage={setMessage}
          />
          <Footer
            totalDeposit={totalDeposit}
            totalWithDrawal={totalWithDrawal}
            totalBalance={totalBalance}
            totalInterest={totalInterest}
            sortActive={sortActive}
            setSortActive={setSortActive}
          />
        </Wrapper>
      ) : (
        <FakeAuthUser
          message={message}
          setMessage={setMessage}
          accounts={accounts}
          setActiveUser={setActiveUser}
          setCurrentUser={setCurrentUser}
          setHidden={setHidden}
        />
      )}
    </Container>
  );
};

export default Account;
