import httpStatus from "http-status";
import { Secret } from "jsonwebtoken";
import { Types } from "mongoose";
import config from "../../../config";
import { createToken, verifyToken } from "../../common/jwtHelpeer";
import ApiError from "../../errors/ApiError";
import {
  ILogInUser,
  ILoginUserResponse,
  IRefreshTokenResponse,
} from "../admin/admin.interface";
import { Cow } from "../cow/cow.model";
import { IUser } from "./user.interface";
import { User } from "./user.model";
export const saveUser = async (user: IUser): Promise<IUser | null> => {
  if (!user.password) {
    user.password = config.default_pass as string;
  }
  const result = await User.create(user);
  return result;
};
export const getAllUser = async (): Promise<IUser[] | null> => {
  const result = await User.find();
  return result;
};
export const getSingleUser = async (
  id: string | Types.ObjectId
): Promise<IUser | null> => {
  const result = await User.findOne({ _id: id });
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found !");
  }
  return result;
};
export const deleteUser = async (id: string): Promise<IUser | null> => {
  const result = await User.findByIdAndDelete({ _id: id });
  const test = await Cow.deleteMany({ seller: id });
  console.log("test :", test);
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found !");
  }
  return result;
};

export const updateUser = async (
  id: string | Types.ObjectId,
  payload: Partial<IUser>
): Promise<IUser | null> => {
  const result = await User.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found !");
  }
  return result;
};

export const UserLogIn = async (
  payload: ILogInUser
): Promise<ILoginUserResponse | null> => {
  const { phoneNumber, password } = payload;
  // check user exist or not
  const isUserExist = await User.findOne({ phoneNumber: phoneNumber });
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User does not exist");
  }

  if (
    isUserExist.password &&
    !(await User.isPasswordMatched(password, isUserExist.password))
  ) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      "Phone Number/Password is incorrect"
    );
  }
  const { id, role } = isUserExist;
  const accessToken = createToken(
    { id, role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  const refreshToken = createToken(
    { id, role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );
  return {
    accessToken,
    refreshToken,
  };
};

export const handleRefreshToken = async (
  token: string
): Promise<IRefreshTokenResponse | null> => {
  let verifiedToken = null;
  try {
    verifiedToken = verifyToken(token, config.jwt.refresh_secret as Secret);
  } catch (err) {
    throw new ApiError(httpStatus.FORBIDDEN, "Invalid Refresh Token");
  }

  const { id } = verifiedToken;
  console.log("id :", id);
  const isUserExist = await User.findById({ _id: id }, { id: 1, role: 1 });
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User does not exist");
  }

  const newAccessToken = createToken(
    {
      id: isUserExist.id,
      role: isUserExist.role,
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  return {
    accessToken: newAccessToken,
  };
};
