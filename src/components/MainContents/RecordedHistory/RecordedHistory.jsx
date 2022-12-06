import React from "react";
import { formattedTotal } from "../../../helper/formatted";
import { Div, Label, Span } from "./styles";

const RecordedHistory = ({ item }) => {
  return (
    <Div key={item.id}>
      <Label check={item.price > 0}>
        {item.price > 0
          ? `기록 ${item.id} - 입금내역`
          : `기록 ${item.id} - 출금내역`}
      </Label>
      <Span>{formattedTotal(item.price)}원</Span>
    </Div>
  );
};

export default RecordedHistory;
