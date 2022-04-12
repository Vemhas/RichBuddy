import { atom } from "recoil";

export const currentUserUid = atom({
  key: "currentUserUid",
  default: "",
});
export const currentUserDisplayName = atom({
  key: "currentUserDisplayName",
  default: "" || null,
});

export const currentUserphotoURL = atom({
  key: "currentUserphotoURL",
  default: "" || null,
});
