import { Model, Types } from "mongoose";
import { IUser } from "../user/user.interface";

export type ICowLocation =
  | "Dhaka"
  | "Chattogram"
  | "Barishal"
  | "Rajshahi"
  | "Sylhet"
  | "Comilla"
  | "Rangpur"
  | "Mymensingh";
export type ICowBreed =
  | "Brahman"
  | "Nellore"
  | "Sahiwal"
  | "Gir"
  | "Indigenous"
  | "Tharparkar"
  | "Kankrej";
export type ICowLabel = "for sale" | "sold out";
export type ICowCategory = "Dairy" | "Beef" | "Dual Purpose";

export type ICow = {
  name: string;
  age: number;
  price: number;
  location: ICowLocation;
  breed: ICowBreed;
  weight: number;
  label: ICowLabel;
  category: ICowCategory;
  seller: Types.ObjectId | IUser;
};

export type CowModel = Model<ICow, Record<string, unknown>>;

export type ICowsFilters = {
  sortBy?: string;
  sortOrder?: string;
  minPrice?: number;
  maxPrice?: number;
  location?: string;
  searchTerm?: string;
};
