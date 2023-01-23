import React from "react";
import Balance from "../components/Balance/Balance";
import Footer from "../components/Footer/Footer";
import Hedaer from "../components/Header/Hedaer";
import MainContent from "../components/MainContents/MainContent";
import FakeAuthUser from "../components/FakeAuthUser/FakeAuthUser";
import Modals from "../components/Modals/Modals";
import Overlays from "../components/Modals/Overlays/Overlays";
import { Container, Wrapper } from "./styles";
import { useRecoilValue } from "recoil";
import { controlModalState } from "../recoils/modalState";
import { activeUserState } from "../recoils/accountState";

const Account = () => {
  const activeUser = useRecoilValue(activeUserState);
  const controlModal = useRecoilValue(controlModalState);

  return (
    <Container>
      {activeUser && (
        <>
          <Hedaer />
          <Wrapper>
            <Balance />
            <MainContent />
            <Footer />
          </Wrapper>

          {controlModal && <Overlays />}
          {controlModal && <Modals />}
        </>
      )}

      {!activeUser && <FakeAuthUser />}
    </Container>
  );
};

export default Account;
