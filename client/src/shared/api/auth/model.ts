export type Body = {
  surname: string;
  name: string;
  patronymic?: string;
  login: string;
  password: string;
};
export type Response = {
  token: string;
  user: { _id: string; login: string };
};
