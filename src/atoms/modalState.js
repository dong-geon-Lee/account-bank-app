import { atom, selector } from "recoil";

export const modalState = atom({
  key: "modalState",
  default: false,
});

export const overlayState = atom({
  key: "overlayState",
  default: false,
});

export const controlModalState = selector({
  key: "controlModalState",
  get: ({ get }) => {
    const modals = get(modalState);
    const overlays = get(overlayState);

    if (modals && overlays) return true;
    else return false;
  },
});
