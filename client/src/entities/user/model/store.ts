import { createStore } from "effector";
import { persist } from "effector-storage/local";
import { Body } from "../../../shared/api/auth/model";
import { setUser, tokenExpired, tokenReceived } from "./events";

export const $token = createStore<string>("")
  .on(tokenExpired, (_, token) => token)
  .reset(tokenReceived);

export const $isAuth = $token.map((token) => !!token);

persist({
  store: $token,
  key: "token",
  serialize: (value) => value,
  deserialize: (value) => value,
});

export const $user = createStore<Body | null>(null)
  .on(setUser, (_, user) => user)
  .reset(tokenReceived);
