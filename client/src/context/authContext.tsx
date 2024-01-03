import { createContext, useEffect, useState } from "react";
// import { User } from "../models/userModel";
// import authservice from "../services/auth/authService";
import { jwtDecode } from "jwt-decode";
import { req } from "../util/request";
import { User } from "../models/userModel";

type Props = {
  children: React.ReactNode;
};
export const AuthContext = createContext({});

const AuthContextProvider: React.FC<Props> = ({ children }) => {
  const [Ok, setOk] = useState<boolean>(false);
  const [loader, setLoader] = useState<boolean>(false);
  const [Error, setError] = useState<string>("");
  const [currentUser, setCurrentUser] = useState<User>({});
  useEffect(() => {
    setCurrentUser(jwtDecode(localStorage.getItem("token")!));
  }, []);

  const signIn = async (UserName: string, Password: string) => {
    setLoader(true);
    return await req
      .post("auth", { UserName, Password })
      .then((result) => {
        localStorage.setItem("token", result.data);
        setOk(true);
        setError("");
        setLoader(false);
      })
      .catch((error) => {
        setOk(false);
        setError(error.message);
        setLoader(false);
      });
  };
  return (
    <AuthContext.Provider value={{ signIn, Ok, Error, loader, currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
