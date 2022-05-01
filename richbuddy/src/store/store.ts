import { atom } from "recoil";

export const currentUserState = atom({
  key: "currentUserState",
  default: {
    uid: "",
    photoURL: "",
    displayName: "",
    isSignedIn: false,
  },
});
