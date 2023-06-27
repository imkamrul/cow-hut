import { Model } from "mongoose";
export type IUserRole = "buyer" | "seller";
export type IUser = {
  id?: string;
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
export type UserModel = {
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
} & Model<IUser>;
