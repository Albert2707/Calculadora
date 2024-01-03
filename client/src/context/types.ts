import { User } from "../models/userModel";

export type Types = {
  signIn(Username: string, Password: string): void;
  Ok: boolean;
  Error: string;
  loader: boolean;
  currentUser: User;
};
