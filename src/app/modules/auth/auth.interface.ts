import { Model, Types } from "mongoose";
export type IUserRole = "buyer" | "admin" | "visitor" | "seller";
export type IUserStatus = "active" | "inactive" | "block";
export type IUser = {
  id?: string;
  //   _id?: string;
  role: IUserRole;
  name: string;
  img_url?: string;
  email: string;
  password: string;
  phoneNumber: string;
  status: IUserStatus;
  billing_address?: string;
  shipping_address?: string;
  token?: string | null;
};
export type UserModel = {
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
  findByEmailOrPhoneAndPassword(
    emailOrPhone: string,
    password: string
  ): Promise<IUser | null>;
} & Model<IUser>;
export type ILoginUserResponse = {
  token: string;
};
export type ILogInUser = {
  emailPhone: string;
  password: string;
};
export interface PasswordChangeRequest {
  old_password: string;
  password: string;
  confirm_password: string;
}
export interface SearchOptionUser {
  _id: { $ne: string | Types.ObjectId };
  $or?: Array<{ email?: string; phoneNumber?: string }>;
}
export type IUserFilters = {
  sortBy?: string;
  sortOrder?: string;
  role?: string;
  name?: string;
  email?: string;
  phoneNumber?: string;
  status?: string;
  searchTerm?: string;
};
