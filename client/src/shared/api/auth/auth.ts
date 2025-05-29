import { jwtDecode } from "jwt-decode";
import { api, errorHandler } from "../api";
import { Body, Response, User } from "./model";

const BASE_AUTH_URL = "auth";

export const signIn = async (json: Pick<Body, "login" | "password">) => {
  try {
    const response = await api
      .post(`${BASE_AUTH_URL}/login`, { json })
      .json<Response>();

    return response;
  } catch (error) {
    console.error(error);
    return await errorHandler(error);
  }
};
export const signUp = async (json: Body) => {
  try {
    const response = await api
      .post(`${BASE_AUTH_URL}/registration`, { json })
      .json<Response>();
    return response;
  } catch (error) {
    console.error(error);
    return await errorHandler(error);
  }
};

export const getUser = async (token: string): Promise<User> => {
  console.log('Pabotaet!!!');
  
  try {
    const decodedToken: { id: string } = jwtDecode(token);
    const userId = decodedToken.id;

    const res = await api
      .get(`${BASE_AUTH_URL}/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .json<User>();

    console.log("getUser function: fetched user data", res);
    return res;
  } catch (error) {
    console.error("getUser function: error fetching user data", error);
    return await errorHandler(error);
  }
};
