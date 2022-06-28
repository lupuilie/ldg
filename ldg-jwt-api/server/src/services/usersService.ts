import createHttpError from "http-errors";
import bcrypt from "bcrypt";
import User from "../models/user";

import { DbCollections } from "./dbService";

type loginProps = {
  username: string;
  password: string;
};

function usersService(collections: DbCollections) {
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

  async function getAll() {
    const users = await collections.users
      ?.find<User>({}, { projection: { username: 1, role: 1 } })
      .toArray();
    return users;
  }

  async function login(loginProps: loginProps) {
    const user = await getByUsername(loginProps.username);
    const checkCredentials = await isCredentialsValid(
      user,
      loginProps.password
    );

    return { username: user.username, role: user.role };
  }

  return { login, getAll };
}

export default usersService;
