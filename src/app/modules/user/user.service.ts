import config from "../../../config";
import { IUser } from "./user.interface";
import { User } from "./user.model";

export const saveUser = async (user: IUser): Promise<IUser | null> => {
  console.log("user :", user);
  if (!user.password) {
    user.password = config.default_pass as string;
  }
  const result = await User.create(user);
  return result;
};
