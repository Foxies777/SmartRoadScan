export type Body = {
  surname: string;
  name: string;
  patronymic?: string;
  login: string;
  password: string;
};
export type User = {
  id: string;
  login: string;
  surname: string;
  name: string;
  patronymic: string;
  phone: string;
  role: string;
};

export type Response = {
  token: string;
  user: { 
    id: string;
    role: string 
  };
};
