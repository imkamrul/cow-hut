import httpStatus from "http-status";
import { SortOrder } from "mongoose";
import { calculatePagination } from "../../common/pagination";
import { IPaginationOptions } from "../../common/pagination.interface";
import ApiError from "../../errors/ApiError";
import { IGenericResponse } from "../../errors/error.interface";
import { cowSearchableFields } from "./cow.constant";
import { ICow, ICowsFilters } from "./cow.interface";
import { Cow } from "./cow.model";
export const saveCow = async (cow: ICow): Promise<ICow | null> => {
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

  Object.entries(whereConditions).forEach(([key, value]) => {
    const formattedValue =
      typeof value === "object" ? JSON.stringify(value) : value;
    console.log(`Key: ${key}, Value: ${formattedValue}`);
  });

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
