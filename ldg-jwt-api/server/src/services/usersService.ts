import createHttpError from "http-errors";
import bcrypt from "bcrypt";
import User from "../models/user";

import { collections } from "./dbService";

type loginProps = {
  username: string;
  password: string;
};

function usersService() {
  async function getByUsername(username: string): Promise<User> {
    const user = await collections.users?.findOne<User>({ username });
    if (user === null) throw new createHttpError.NotFound("user not found");

    return user as User;
  }

  async function isCredentialsValid(user: User, password: string) {
    const passwordMatch = await bcrypt.compare(password, user.key);
    if (!passwordMatch) {
      const message = "username or password is incorrect";
      throw new createHttpError.Unauthorized(message);
    }
    return passwordMatch;
  }

  async function login(loginProps: loginProps) {
    const user = await getByUsername(loginProps.username);
    const checkCredentials = await isCredentialsValid(
      user,
      loginProps.password
    );

    return { username: user.username, role: user.role };
  }

  return { login };
}

export default usersService;
