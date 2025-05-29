import { createEffect, sample } from "effector";
import { signUp } from "../../shared/api/auth/auth";
import type { Body, Response } from "../../shared/api/auth/model";
import { $token, tokenReceived } from "../../entities/user/model";
import { showErrorMassage } from "../../shared/notification";


export const registerFx = createEffect<Body, Response>(signUp);

sample({
    clock: registerFx.doneData,
    fn: ({ token }) => token,
    target: tokenReceived,
  });
  
sample({
    clock: registerFx.failData,
    target: showErrorMassage
})