import { tokenReceived } from "@entities/user/model";
import { signIn } from "@shared/api/auth/auth";
import { showErrorMassage } from "@shared/notification";
import { createEffect, sample } from "effector";

export const signInFx = createEffect(signIn)

sample({
    clock: signInFx.doneData, 
    fn(response) {
        response.token
    },
    target: tokenReceived
})
sample({
    clock: signInFx.failData,
    target: showErrorMassage
})