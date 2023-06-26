import { Model } from "mongoose";
export type IAdminRole = "admin";
export type IAdmin = {
  id: string;
  password: string;
  role: IAdminRole;
  name: {
    firstName: string;
    lastName: string;
  };
  phoneNumber: string;
  address: string;
  needsPasswordChange: true | false;
};
export type ILogInUser = {
  phoneNumber: string;
  password: string;
};
export type AdminModel = {
  isAdminExist(
    id: string
  ): Promise<Pick<IAdmin, "id" | "password" | "role" | "needsPasswordChange">>;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
} & Model<IAdmin>;

export type ILoginUserResponse = {
  accessToken: string;
  refreshToken?: string;
};

export type IRefreshTokenResponse = {
  accessToken: string;
};

export type IVerifiedLoginUser = {
  userId: string;
  role: AdminModel;
};
