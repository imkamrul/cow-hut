import bcrypt from "bcrypt";
import httpStatus from "http-status";
import { Schema, model } from "mongoose";
import config from "../../../config";
import ApiError from "../../errors/ApiError";
import { role, status } from "./auth.constant";
import { IUser, UserModel } from "./auth.interface";
const userSchema = new Schema<IUser>(
  {
    role: {
      type: String,
      required: true,
      enum: role,
    },
    name: {
      type: String,
      required: true,
    },
    img_url: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },

    phoneNumber: {
      type: String,
      required: true,
      unique: true,
    },
    billing_address: {
      type: String,
      required: false,
    },
    shipping_address: {
      type: Number,
      required: false,
    },
    status: {
      type: String,
      required: false,
      enum: status,
    },
    totalMoney: {
      type: Number,
      required: false,
    },
    token: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);
userSchema.pre("save", async function (next) {
  this.status = status[0];
  this.role = role[0];
  this.totalMoney = 0;
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bycrypt_salt_rounds)
  );
  next();
});
userSchema.statics.isPasswordMatched = async function (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, savedPassword);
};

userSchema.statics.findByEmailOrPhoneAndPassword = async function (
  emailOrPhone,
  password
) {
  const User = this;
  const user = await User.findOne({
    $or: [{ email: emailOrPhone }, { phoneNumber: emailOrPhone }],
  });

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User does not exist");
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordMatch) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      "Email/Phone Number/Password is incorrect"
    );
  }

  return user;
};
export const User = model<IUser, UserModel>("User", userSchema);
