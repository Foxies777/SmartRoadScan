// import { api } from "@shared/api/api";
// import { Pit } from "../types/pit";

// export const getPits = async () => {
//   const response = await api.get("/api/pits").json<Pit[]>()
//   return response;
// };

// mocks/api.ts
import { mockPits } from "../mock/pits";

export const getPits = async () => {
  console.log("getPits вызван");
  await new Promise((resolve) => setTimeout(resolve, 1000));
  console.log("getPits завершён", mockPits);
  return mockPits;
};