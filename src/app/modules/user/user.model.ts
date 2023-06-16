import { Schema, model } from "mongoose";
import { role } from "./user.constant";
import { IUser, UserModel } from "./user.interface";

const userSchema = new Schema<IUser>(
  {
    role: {
      type: String,
      required: true,
      enum: role,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    budget: {
      type: Number,
      required: true,
    },
    income: {
      type: Number,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);
userSchema.pre("save", function (next) {
  this.income = 0;
  next();
});
export const User = model<IUser, UserModel>("User", userSchema);
