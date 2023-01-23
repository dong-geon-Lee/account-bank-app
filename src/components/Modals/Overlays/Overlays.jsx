import React from "react";
import { useRecoilState } from "recoil";
import { modalState, overlayState } from "../../../recoils/modalState";
import { Container } from "./styles";

const Overlays = () => {
  const [, setModals] = useRecoilState(modalState);
  const [, setOverlay] = useRecoilState(overlayState);

  const closeOverlays = () => {
    setModals(false);
    setOverlay(false);
  };

  return <Container onClick={() => closeOverlays()}></Container>;
};

export default Overlays;
