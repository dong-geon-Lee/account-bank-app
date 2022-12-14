import React from "react";
import TransferAction from "./TransferAction/TransferAction";
import LoanAction from "./LoanAction/LoanAction";
import CloseAction from "./closeAction/CloseAction";

const ActionContents = () => {
  return (
    <>
      <TransferAction />
      <LoanAction />
      <CloseAction />
    </>
  );
};

export default ActionContents;
