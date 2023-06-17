import httpStatus from "http-status";
import { SortOrder, Types } from "mongoose";
import { calculatePagination } from "../../common/pagination";
import { IPaginationOptions } from "../../common/pagination.interface";
import ApiError from "../../errors/ApiError";
import { IGenericResponse } from "../../errors/error.interface";
import { role } from "../user/user.constant";
import { User } from "../user/user.model";
import { cowSearchableFields } from "./cow.constant";
import { ICow, ICowsFilters } from "./cow.interface";
import { Cow } from "./cow.model";
export const saveCow = async (cow: ICow): Promise<ICow | null> => {
  const getUser = await User.findOne({ _id: cow.seller });

  if (!getUser) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found !");
  } else if (getUser.role !== role[1]) {
    throw new ApiError(httpStatus.NOT_FOUND, "User is not a seller !");
  }
  const result = await Cow.create(cow);
  return result;
};
export const getAllCows = async (
  filters: ICowsFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<ICow[]>> => {
  const { searchTerm, ...filtersData } = filters;

  const { page, limit, skip, sortBy, sortOrder } =
    calculatePagination(paginationOptions);

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }
  const andConditions: { [key: string]: any }[] = [];

  if (searchTerm) {
    andConditions.push({
      $or: cowSearchableFields.map((field) => ({
        [field]: {
          $regex: searchTerm,
          $options: "i",
        },
      })),
    });
  }
  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};
  console.log(JSON.stringify(whereConditions, null, 2));
  const result = await Cow.find(whereConditions)

    .sort(sortConditions)
    .skip(skip)
    .limit(limit);
  const total = await Cow.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};
export const getSingleCow = async (
  id: string | Types.ObjectId
): Promise<ICow | null> => {
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
