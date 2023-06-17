import { Model, Types } from "mongoose";

export interface IOrder {
  cow: Types.ObjectId;
  buyer: Types.ObjectId;
}

export type OrderModel = Model<IOrder>;
