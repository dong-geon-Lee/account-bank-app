import React from "react";
import { displayCashHistory } from "../../../helper/calculates";
import { formattedTotal } from "../../../helper/formatted";
import { Div, Label, Span } from "./styles";

const RecordedHistory = ({ item }) => {
  const priceText = displayCashHistory(item);

  return (
    <Div>
      <Label check={item.price > 0}>{priceText}</Label>
      <Span>{formattedTotal(item.price)}원</Span>
    </Div>
  );
};

export default RecordedHistory;
