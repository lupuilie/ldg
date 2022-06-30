export type IUser = {
  username: string;
  firstName: string;
  lastName: string;
  favorite: string[];
  role: string;
};

export type ILoggedUser = {
  username: string;
  role: string;
  token: string;
};
