import config from "../../../config";
import { AdminModel, IAdmin } from "./admin.interface";

import bcrypt from "bcrypt";
import { Schema, model } from "mongoose";
import { adminRole } from "./admin.constant";
const AdminSchema = new Schema<IAdmin, AdminModel>(
  {
    role: {
      type: String,
      required: true,
      enum: adminRole,
    },
    password: {
      required: true,
      type: String,
      select: false,
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
      unique: true,
    },
    address: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

AdminSchema.statics.isAdminExist = async function (
  id: string
): Promise<Pick<IAdmin, "id" | "password" | "role"> | null> {
  console.log(id);
  // const searchingOption=  id.includes("@") ? {email:id} : {phoneNumber:id}
  return await Admin.findOne(
    { phoneNumber: id },
    { id: 1, password: 1, role: 1 }
  );
};

AdminSchema.statics.isPasswordMatched = async function (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, savedPassword);
};

AdminSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bycrypt_salt_rounds)
  );
  next();
});
export const Admin = model<IAdmin, AdminModel>("Admin", AdminSchema);
