import { User } from "../entities/user";
import { getUserAuthenticationInformation, UserServer, userLogin, userLogout } from "../api/auth";

function convertUserServerToUser(user: UserServer): User {
  return {
    email: "das",
    name: "",
    ...user
  }
}


export class AuthenticationService {
  static async getUserInformation(): Promise<User> {
    const user = await getUserAuthenticationInformation();
    return convertUserServerToUser(user);
  }

  static async login(username: string, password: string): Promise<User> {
    const user = await userLogin(username, password);
    return convertUserServerToUser(user);
  }

  static async logout(): Promise<void> {
    return await userLogout()
  }
}