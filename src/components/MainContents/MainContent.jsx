import React from "react";
import ActionContents from "./ActionContents/ActionContents";
import RecordedHistory from "./RecordedHistory/RecordedHistory";
import { Container, LeftSide, RightSide, Wrapper } from "./styles";
import { movementSortState } from "../../recoils/accountState.js";
import { useRecoilValue } from "recoil";

const MainContent = () => {
  const items = useRecoilValue(movementSortState);

  return (
    <Container>
      <Wrapper>
        <LeftSide>
          {items.map((item) => (
            <RecordedHistory key={item.id} item={item} />
          ))}
        </LeftSide>

        <RightSide>
          <ActionContents />
        </RightSide>
      </Wrapper>
    </Container>
  );
};

export default MainContent;
