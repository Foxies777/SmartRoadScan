import { createEvent } from "effector";
import { Body } from "../../../shared/api/auth/model";

export const setUser = createEvent<Body | null>();
export const tokenExpired = createEvent();
export const tokenReceived = createEvent();
