import React from "react";
import { calcSortedData } from "../../helper/calculates";
import ActionContents from "./ActionContents/ActionContents";
import RecordedHistory from "./RecordedHistory/RecordedHistory";
import { Container, LeftSide, RightSide, Wrapper } from "./styles";

const MainContent = ({
  currentUser,
  accounts,
  totalBalance,
  setCurrentUser,
  setHidden,
  sortActive,
  setActiveUser,
  setMessage,
}) => {
  const items = currentUser
    ? calcSortedData(currentUser?.movements, sortActive)
    : [];

  return (
    <Container>
      <Wrapper>
        <LeftSide>
          {items?.map((item) => (
            <RecordedHistory key={item.id} item={item} />
          ))}
        </LeftSide>

        <RightSide>
          <ActionContents
            currentUser={currentUser}
            accounts={accounts}
            totalBalance={totalBalance}
            setCurrentUser={setCurrentUser}
            setHidden={setHidden}
            setActiveUser={setActiveUser}
            setMessage={setMessage}
          />
        </RightSide>
      </Wrapper>
    </Container>
  );
};

export default MainContent;
