import { User } from "../entities/user";
import { getUserAuthenticationInformation, UserServer, userLogin, userLogout, userSignUp } from "../api/auth";

function convertUserServerToUser(user: UserServer): User {
  return {
    name: user.username,
    email: user.email,
    aboutMe: user.about_me,
    profilePic: user.profile_pic
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

  static async signup(
    name: string,
    email: string,
    password1: string,
    password2: string
    ): Promise<User> {
      const user = await userSignUp(
        name,
        email,
        password1,
        password2
      );

      return convertUserServerToUser(user);
  }
}