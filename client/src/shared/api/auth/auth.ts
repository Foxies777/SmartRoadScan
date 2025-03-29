import { api, errorHandler } from "../api";
import { Body, Response } from "./model";

const BASE_AUTH_URL = "auth";

export const signIn = async (json: Pick<Body, "login" | "password">) => {
  try {
    const response = await api
      .post(`${BASE_AUTH_URL}/login`, { json })
      .json<Response>();
    return response;
  } catch (error) {
    console.error(error);
    return await errorHandler(error)
  }
};
export const signUp = async(json: Body) => {
  try {
    const response = await api
      .post(`${BASE_AUTH_URL}/registration`, { json })
      .json<Response>();
    return response;
  } catch (error) {
    console.error(error);
    return await errorHandler(error)
  }
};
