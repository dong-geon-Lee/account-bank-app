import React, { useEffect, useState } from "react";
import Balance from "../components/Balance/Balance";
import Footer from "../components/Footer/Footer";
import Hedaer from "../components/Header/Hedaer";
import MainContent from "../components/MainContents/MainContent";
import { accounts } from "../data/fakeAccounts";
import { Container, Wrapper } from "./styles";
import FakeAuthUser from "../components/FakeAuthUser/FakeAuthUser";
import Modals from "../components/Modals/Modals";
import {
  calcDeposit,
  calcTotalBalance,
  calcWithDrawal,
} from "../helper/calculates";
import Overlays from "../components/Modals/Overlays/Overlays";

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
  const [userId, setUserId] = useState("");
  const [showModals, setShowModals] = useState(false);
  const [overlays, setOverlays] = useState(false);

  useEffect(() => {
    setTotalBalance(calcTotalBalance(currentUser?.movements));
    setBankName(currentUser?.bankAccount);
    setName(currentUser?.name);
    setUserId(currentUser?.userId);
    setAccNumber(currentUser?.accountNumber);
    setDates(currentUser?.createdDate);
    setTotalDeposit(calcDeposit(currentUser?.movements));
    settotalWithDrawal(calcWithDrawal(currentUser?.movements));
    setTotalInterest(currentUser?.totalInterest);
  }, [currentUser]);

  console.log(currentUser);

  return (
    <Container>
      {activeUser ? (
        <>
          <Hedaer
            name={name}
            userId={userId}
            accounts={accounts}
            setCurrentUser={setCurrentUser}
            setActiveUser={setActiveUser}
            setMessage={setMessage}
            setHidden={setHidden}
            activeUser={activeUser}
            setShowModals={setShowModals}
            setOverlays={setOverlays}
          />
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
            {showModals && overlays && (
              <>
                <Overlays
                  accounts={accounts}
                  setShowModals={setShowModals}
                  setOverlays={setOverlays}
                />
                <Modals
                  accounts={accounts}
                  currentUser={currentUser}
                  setShowModals={setShowModals}
                  setOverlays={setOverlays}
                />
              </>
            )}
          </Wrapper>
        </>
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
