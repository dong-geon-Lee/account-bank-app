import React from "react";
import { Container } from "./styles";

const Overlays = ({ setShowModals, setOverlays }) => {
  const closeOverlays = () => {
    setShowModals(false);
    setOverlays(false);
  };

  return <Container onClick={() => closeOverlays()}></Container>;
};

export default Overlays;
