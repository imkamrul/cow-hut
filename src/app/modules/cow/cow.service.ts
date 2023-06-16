import httpStatus from "http-status";
import ApiError from "../../errors/ApiError";
import { ICow } from "./cow.interface";
import { Cow } from "./cow.model";
export const saveCow = async (cow: ICow): Promise<ICow | null> => {
  const result = await Cow.create(cow);
  return result;
};
export const getAllCows = async (): Promise<ICow[] | null> => {
  const result = await Cow.find();
  return result;
};
export const getSingleCow = async (id: string): Promise<ICow | null> => {
  const result = await Cow.findOne({ _id: id }).populate("seller");
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Cow not found !");
  }
  return result;
};
export const deleteCow = async (id: string): Promise<ICow | null> => {
  const result = await Cow.findByIdAndDelete({ _id: id });
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Cow not found !");
  }
  return result;
};

export const updateCow = async (
  id: string,
  payload: Partial<ICow>
): Promise<ICow | null> => {
  const result = await Cow.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Cow not found !");
  }
  return result;
};
