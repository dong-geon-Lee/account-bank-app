import React, { useEffect, useState } from "react";
import Balance from "../components/Balance/Balance";
import Footer from "../components/Footer/Footer";
import Hedaer from "../components/Header/Hedaer";
import MainContent from "../components/MainContents/MainContent";
import { Container, Wrapper } from "./styles";
import FakeAuthUser from "../components/FakeAuthUser/FakeAuthUser";
import {
  calcDeposit,
  calcTotalBalance,
  calcWithDrawal,
} from "../helper/calculates";
import Modals from "../components/Modals/Modals";
import Overlays from "../components/Modals/Overlays/Overlays";
import { useRecoilState, useRecoilValue } from "recoil";
import { controlModalState } from "../atoms/modalState";
import {
  accNumberState,
  activeUserState,
  bankNameState,
  currentUserState,
  datesState,
  nameState,
  totalBalanceState,
  userIdState,
} from "../atoms/accountState";

const Account = () => {
  const currentUser = useRecoilValue(currentUserState);
  const [, setTotalBalance] = useRecoilState(totalBalanceState);

  const [totalDeposit, setTotalDeposit] = useState(0);
  const [totalWithDrawal, settotalWithDrawal] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);

  const controlModal = useRecoilValue(controlModalState);
  const activeUser = useRecoilValue(activeUserState);

  const [, setUserId] = useRecoilState(userIdState);
  const [, setBankName] = useRecoilState(bankNameState);
  const [, setName] = useRecoilState(nameState);
  const [, setAccNumber] = useRecoilState(accNumberState);
  const [, setDates] = useRecoilState(datesState);

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
          <Hedaer />
          <Wrapper>
            <Balance />
            <MainContent currentUser={currentUser} />
            <Footer
              totalDeposit={totalDeposit}
              totalWithDrawal={totalWithDrawal}
              totalInterest={totalInterest}
            />

            {controlModal && (
              <>
                <Overlays />
                <Modals />
              </>
            )}
          </Wrapper>
        </>
      ) : (
        <FakeAuthUser />
      )}
    </Container>
  );
};

export default Account;
