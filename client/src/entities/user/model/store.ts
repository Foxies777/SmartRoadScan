import { createStore, restore } from "effector";
import { persist } from "effector-storage/local";
import { tokenExpired, tokenReceived } from "./events";
import { User } from "../../../shared/api/auth/model";
import { getUserFx } from "@features/load-user";

export const $token = createStore<string>("")
  .on(tokenReceived, (_, token) => token)
  .reset(tokenExpired);

export const $isAuth = $token.map((token) => !!token);

persist({
  store: $token,
  key: "token",
  serialize: (value) => value,
  deserialize: (value) => value,
});

export const $user = restore<User | null>(getUserFx.doneData, null);
