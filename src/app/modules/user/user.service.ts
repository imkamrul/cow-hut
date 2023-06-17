import httpStatus from "http-status";
import { Types } from "mongoose";
import config from "../../../config";
import ApiError from "../../errors/ApiError";
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
