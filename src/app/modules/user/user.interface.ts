import { Model } from "mongoose";
export type IUserRole = "buyer" | "seller";
export type IUser = {
  _id?: string;
  password: string;
  role: IUserRole;
  name: {
    firstName: string;
    lastName: string;
  };
  phoneNumber: string;
  address: string;
  budget: number;
  income: number;
};
export type UserModel = Model<IUser, Record<string, unknown>>;
