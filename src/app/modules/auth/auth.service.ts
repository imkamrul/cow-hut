import bcrypt from "bcrypt";
import fileUpload from "express-fileupload";
import httpStatus from "http-status";
import { JwtPayload, Secret } from "jsonwebtoken";
import { SortOrder, Types } from "mongoose";
import config from "../../../config";
import { createToken } from "../../common/jwtHelpeer";
import { calculatePagination } from "../../common/pagination";
import { IPaginationOptions } from "../../common/pagination.interface";
import ApiError from "../../errors/ApiError";
import { IGenericResponse } from "../../errors/error.interface";
import { imageUploader } from "../../middleware/ImageUploader";
import { role, status, userSearchableFields } from "./auth.constant";
import {
  ILogInUser,
  ILoginUserResponse,
  IUser,
  IUserFilters,
  PasswordChangeRequest,
  SearchOptionUser,
} from "./auth.interface";
import { User } from "./auth.model";

export const saveUser = async (user: IUser): Promise<IUser | null> => {
  if (!user.password) {
    user.password = config.default_pass as string;
  }
  const createdUser = await User.create(user);

  // Fetch the user again without the 'password' field
  const result = await User.findById(createdUser._id).select("-password");
  return result;
};
export const UserLogIn = async (
  payload: ILogInUser
): Promise<ILoginUserResponse | null> => {
  const { emailPhone, password } = payload;

  const isUserExist = await User.findByEmailOrPhoneAndPassword(
    emailPhone,
    password
  );
  if (isUserExist?.status === status[2]) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      "Your account has been blocked, Talk to admin !"
    );
  }
  if (isUserExist && isUserExist?.id && isUserExist?.role) {
    const { id, role } = isUserExist;
    const token = createToken(
      { id, role },
      config.jwt.secret as Secret,
      config.jwt.expires_in as string
    );
    const updateUserToken = await updateUser(isUserExist.id, { token });
    return {
      token,
    };
  } else {
    return null;
  }
};
export const updateUser = async (
  id: string | Types.ObjectId,
  payload: Partial<IUser>
): Promise<IUser | null> => {
  const result = await User.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found !");
  }
  return result;
};

export const getSingleUser = async (
  id: string | Types.ObjectId
): Promise<IUser | null> => {
  const result = await User.findOne({ _id: id }).select("-password, -token");
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found !");
  }
  return result;
};
export const updateUserPassword = async (
  id: string | Types.ObjectId,
  payload: PasswordChangeRequest
): Promise<IUser | null> => {
  if (
    payload.password &&
    payload.old_password &&
    payload.password === payload.confirm_password &&
    id
  ) {
    const findUser = await User.findOne({ _id: id });
    const compareOldPassNewPass = await User.isPasswordMatched(
      payload.password,
      findUser?.password as string
    );
    if (compareOldPassNewPass) {
      throw new ApiError(
        httpStatus.NOT_FOUND,
        "Old password & new password must not be same!"
      );
    } else {
      const result = await User.isPasswordMatched(
        payload.old_password,
        findUser?.password as string
      );
      if (result) {
        let password = await bcrypt.hash(
          payload.password,
          Number(config.bycrypt_salt_rounds)
        );
        const updateUserPassword = await updateUser(id, {
          password,
        });
        return updateUserPassword;
      } else {
        throw new ApiError(httpStatus.NOT_FOUND, "Old password is not match !");
      }
    }
  } else {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      "Password & confirm password is not match !"
    );
  }
};

export const updateProfileInfo = async (
  id: string | Types.ObjectId,
  user: JwtPayload,
  payload: Partial<IUser>,
  image: fileUpload.UploadedFile
): Promise<IUser | null> => {
  let result = null;

  const searchOption: SearchOptionUser = {
    _id: { $ne: id },
  };

  if (payload?.phoneNumber || payload?.email) {
    searchOption.$or = [];

    if (payload?.phoneNumber) {
      searchOption.$or.push({ phoneNumber: payload.phoneNumber });
    }

    if (payload?.email) {
      searchOption.$or.push({ email: payload.email });
    }
  }
  const findUser = await User.findOne(searchOption);
  if (findUser) {
    throw new ApiError(
      httpStatus.CONFLICT,
      "Your email or phone number already exist !"
    );
  }

  if (image) {
    const img_url = await imageUploader(image, "user");
    payload.img_url = img_url;
  }

  if (user?.role === role[1]) {
    if (payload.password) {
      payload.password = await bcrypt.hash(
        payload.password,
        Number(config.bycrypt_salt_rounds)
      );
    }
    const updateProfile = await updateUser(id, payload);
    result = await User.findOne(
      { _id: updateProfile?.id },
      { password: 0, token: 0 }
    );
  } else {
    if (payload.password) {
      delete payload.password;
    }
    if (payload?.role) {
      delete payload.role;
    }
    if (payload?.status) {
      delete payload.status;
    }

    const updateProfile = await updateUser(id, payload);
    result = await User.findOne(
      { _id: updateProfile?.id },
      { password: 0, token: 0 }
    );
  }

  return result;
};

export const deleteUser = async (
  id: string,
  user: JwtPayload
): Promise<IUser | null> => {
  let result = null;
  if (user?.role === role[1] || id === user?.id) {
    result = await User.findByIdAndDelete({ _id: id });
  } else {
    throw new ApiError(httpStatus.FORBIDDEN, "Forbidden Access");
  }
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found !");
  }
  return result;
};

export const findAllUser = async (
  filters: IUserFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IUser[]>> => {
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
      $or: userSearchableFields.map((field) => ({
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

  const result = await User.find(whereConditions)

    .sort(sortConditions)
    .skip(skip)
    .limit(limit);
  const total = await User.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

export const multipleUserDelete = async (
  deleteProductIds: string[]
): Promise<number> => {
  const result = await User.deleteMany({ _id: { $in: deleteProductIds } });
  return result.deletedCount || 0;
};
