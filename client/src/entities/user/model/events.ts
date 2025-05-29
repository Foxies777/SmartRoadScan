import { createEvent } from "effector";
import { User } from "../../../shared/api/auth/model";

export const setUser = createEvent<User | null>();
export const tokenExpired = createEvent();
export const tokenReceived = createEvent<string>();
