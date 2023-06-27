import httpStatus from "http-status";
import { JwtPayload } from "jsonwebtoken";
import mongoose from "mongoose";
import ApiError from "../../errors/ApiError";
import { cowLabel } from "../cow/cow.constant";
import { Cow } from "../cow/cow.model";
import { getSingleCow } from "../cow/cow.service";
import { role } from "../user/user.constant";
import { User } from "../user/user.model";
import { getSingleUser } from "../user/user.service";
import { IOrder } from "./order.interface";
import { Order } from "./order.model";
export const saveOrder = async (data: IOrder): Promise<any | null> => {
  const { cow, buyer } = data;

  const findCow = await getSingleCow(cow);
  if (findCow?.label === cowLabel[1]) {
    throw new ApiError(httpStatus.BAD_REQUEST, "This cow is already sold");
  }
  const findBuyer = await getSingleUser(buyer);
  let newOder: any;
  if (findCow && findBuyer && findBuyer.budget >= findCow.price) {
    const session = await mongoose.startSession();

    try {
      session.startTransaction();
      const options = { new: true, session: session };

      await User.findOneAndUpdate(
        { _id: buyer },
        { $inc: { budget: -findCow.price } },
        options
      );

      await Cow.findOneAndUpdate(
        { _id: cow },
        {
          label: cowLabel[1],
        },
        options
      );

      await User.findOneAndUpdate(
        { _id: findCow?.seller?._id },
        { $inc: { income: findCow.price } },
        options
      );

      newOder = await Order.create([data], { session });

      if (!newOder) {
        throw new ApiError(
          httpStatus.BAD_REQUEST,
          "Failed to create New Order"
        );
      }

      await session.commitTransaction();
      await session.endSession();
    } catch (error) {
      await session.abortTransaction();
      await session.endSession();
      throw error;
    }
  } else if (findBuyer && findBuyer.role !== "buyer") {
    throw new ApiError(httpStatus.NOT_FOUND, "This user is not a buyer");
  } else if (findCow && findBuyer && findBuyer.budget <= findCow.price) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      "This user has not enough balance"
    );
  }
  const result = await Order.findById(newOder[0]._id).populate([
    { path: "cow" },
    { path: "buyer" },
    {
      path: "cow",
      populate: {
        path: "seller",
        model: "User",
      },
    },
  ]);

  return result;
};

export const getAllOrder = async (
  userInfo: JwtPayload | null
): Promise<IOrder[] | null> => {
  let result;
  if (userInfo?.role === role[0]) {
    result = await Order.find({ buyer: userInfo.id }).populate([
      { path: "cow" },
      { path: "buyer" },
      {
        path: "cow",
        populate: {
          path: "seller",
          model: "User",
          select: "-password",
        },
      },
    ]);
  } else if (userInfo?.role === role[1]) {
    result = await Order.find().populate([
      { path: "cow" },
      { path: "buyer" },
      {
        path: "cow",
        populate: {
          path: "seller",
          model: "User",
          select: "-password",
          match: { _id: userInfo.id },
        },
      },
    ]);
  } else {
    result = await Order.find().populate([
      { path: "cow" },
      { path: "buyer" },
      {
        path: "cow",
        populate: {
          path: "seller",
          model: "User",
          select: "-password",
        },
      },
    ]);
  }

  return result;
};
export const getSingleOrderById = async (
  userInfo: JwtPayload | null,
  id: string
): Promise<IOrder | null> => {
  let filter: any = { _id: id };

  if (userInfo?.role === "buyer") {
    filter = { ...filter, buyer: userInfo.id };
  }

  console.log("filter:", filter);

  let result;
  if (userInfo?.role === role[0]) {
    result = await Order.findOne(filter).populate([
      { path: "cow" },
      { path: "buyer" },
      {
        path: "cow",
        populate: {
          path: "seller",
          model: "User",
          select: "-password",
        },
      },
    ]);
  } else {
    result = await Order.findOne(filter).populate([
      { path: "cow" },
      { path: "buyer" },
      {
        path: "cow",
        populate: {
          path: "seller",
          model: "User",
          select: "-password",
        },
      },
    ]);
  }

  console.log("result:", result);

  return result;
};
