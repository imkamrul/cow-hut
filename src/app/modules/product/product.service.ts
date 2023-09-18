import httpStatus from "http-status";
import { JwtPayload } from "jsonwebtoken";
import { Document, SortOrder, Types } from "mongoose";
import { generateProductData } from "../../common/FakeDataGenerate";
import { calculatePagination } from "../../common/pagination";
import { IPaginationOptions } from "../../common/pagination.interface";
import ApiError from "../../errors/ApiError";
import { IGenericResponse } from "../../errors/error.interface";
import { role } from "../auth/auth.constant";
import { productSearchableFields } from "./product.constat";
import { IProduct, IProductsFilters } from "./product.interface";
import { Product } from "./product.model";

export const saveProduct = async (
  product: IProduct
): Promise<IProduct | null> => {
  const result = await Product.create(product);
  return result;
};
export const getSingleProduct = async (
  id: string | Types.ObjectId
): Promise<IProduct | null> => {
  const result = await Product.findOne({ _id: id }).populate(
    "seller",
    "name email phoneNumber"
  );
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Product not found !");
  }
  return result;
};

export const deleteProduct = async (
  id: string,
  user: JwtPayload
): Promise<IProduct | null> => {
  let result = null;
  if (user?.role === role[1]) {
    result = await Product.findByIdAndDelete({ _id: id });
  } else {
    const productFind = await Product.findOne({ _id: id, seller: user?.id });
    if (productFind) {
      result = await Product.findByIdAndDelete({ _id: id });
    } else {
      throw new ApiError(httpStatus.NOT_FOUND, "Product not found!");
    }
  }

  return result;
};

export const updateProduct = async (
  id: string,
  user: JwtPayload,
  payload: Partial<IProduct>
): Promise<IProduct | null> => {
  let result = null;
  if (user?.role === role[1]) {
    result = await Product.findOneAndUpdate({ _id: id }, payload, {
      new: true,
    });
  } else {
    const productFind = await Product.findOne({ _id: id, seller: user?.id });
    if (productFind) {
      result = await Product.findOneAndUpdate({ _id: id }, payload, {
        new: true,
      });
    } else {
      throw new ApiError(httpStatus.NOT_FOUND, "Product not found!");
    }
  }

  return result;
};

export const saveDummyProducts = async (
  dataNumber: string,
  sellerId: string
): Promise<IProduct[]> => {
  const products = Array.from({ length: Number(dataNumber) }, () =>
    generateProductData(sellerId)
  );

  try {
    const result = (await Product.create(products)) as (Document<
      unknown,
      Record<string, unknown>,
      IProduct
    > &
      IProduct)[];
    return result;
  } catch (error: any) {
    throw new Error(`Error saving dummy products: ${error.message}`);
  }
};
export const multipleProductDelete = async (
  deleteProductIds: string[]
): Promise<number> => {
  const result = await Product.deleteMany({ _id: { $in: deleteProductIds } });
  return result.deletedCount || 0;
};

export const findAllProduct = async (
  filters: IProductsFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IProduct[]>> => {
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
      $or: productSearchableFields.map((field) => ({
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

  const result = await Product.find(whereConditions)

    .sort(sortConditions)
    .skip(skip)
    .limit(limit);
  const total = await Product.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};
