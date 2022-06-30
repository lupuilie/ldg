import { ILoggedUser } from "../types";

const UserService = {
  getLoggedUser(): ILoggedUser | null {
    const lsUser = localStorage.getItem("user");
    if (!lsUser) return null;

    return JSON.parse(lsUser);
  },
  getToken(): string {
    const user = this.getLoggedUser();
    if (!user || !user.token) throw new Error("user not authentified");

    return user.token;
  },

  getAuthHeader() {
    return {
      headers: {
        Authorization: "Bearer " + this.getToken(),
      },
    };
  },
};

export default UserService;
