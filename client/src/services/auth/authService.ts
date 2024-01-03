import { req } from "../../util/request";

class authService {
  signIn = async (UserName: string, Password: string) => {
    return await req
      .post("auth", { UserName, Password })
      .then((result) => result.data)
      .catch((error) => error);
  };
}

const authservice: authService = new authService();
export default authservice;
