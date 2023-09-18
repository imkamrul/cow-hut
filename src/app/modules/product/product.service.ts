import httpStatus from "http-status";
import { JwtPayload } from "jsonwebtoken";
import { Document, Types } from "mongoose";
import { generateProductData } from "../../common/FakeDataGenerate";
import ApiError from "../../errors/ApiError";
import { role } from "../auth/auth.constant";
import { IProduct } from "./product.interface";
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
  console.log(
    "products :",
    products,
    "dataNumber :",
    dataNumber,
    "sellerId :",
    sellerId
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
