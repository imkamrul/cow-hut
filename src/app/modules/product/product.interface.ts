import { Model, Types } from "mongoose";
import { IUser } from "../auth/auth.interface";

export type IProduct = {
  id?: string;
  name: string;
  price: number;
  img_url: string;
  quantity: number;
  isNew: boolean;
  discount: number;
  seller: Types.ObjectId | IUser;
  total_sell?: number;
};

export type ProductModel = Model<IProduct, Record<string, unknown>>;

export type IProductsFilters = {
  sortBy?: string;
  sortOrder?: string;
  name?: string;
  price?: number;
  searchTerm?: string;
};
