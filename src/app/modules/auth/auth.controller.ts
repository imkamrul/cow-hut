import { Request, RequestHandler, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../common/catchAsync";
import { paginationFields } from "../../common/pagination";
import pick from "../../common/pick";
import sendResponse from "../../common/response";
import ApiError from "../../errors/ApiError";
import { userFilterOptions } from "./auth.constant";
import { ILoginUserResponse, IUser } from "./auth.interface";
import {
  UserLogIn,
  deleteUser,
  findAllUser,
  getSingleUser,
  multipleUserDelete,
  saveUser,
  updateProfileInfo,
  updateUser,
  updateUserPassword,
} from "./auth.service";

export const createUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const userData = req.body;
    const result = await saveUser(userData);

    sendResponse<IUser>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "User registered successfully",
      data: result,
    });
  }
);
export const logInUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const logInData = req.body;
    const result = await UserLogIn(logInData);
    if (!result) {
      throw new Error("Login failed");
    }

    sendResponse<ILoginUserResponse>(res, {
      statusCode: 200,
      success: true,
      message: "User login successfully !",
      data: result,
    });
  }
);
export const logOutUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await updateUser(req?.user?.id, { token: null });
    sendResponse<ILoginUserResponse>(res, {
      statusCode: 200,
      success: true,
      message: "User logout successfully !",
      data: null,
    });
  }
);
export const passwordChangeUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const data = req.body;

    const result = await updateUserPassword(req?.user?.id, data);
    sendResponse<ILoginUserResponse>(res, {
      statusCode: 200,
      success: true,
      message: "User password update successfully !",
      data: null,
    });
  }
);
export const getProfileUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await getSingleUser(req?.user?.id);
    sendResponse<IUser>(res, {
      statusCode: 200,
      success: true,
      message: "User find successfully !",
      data: result,
    });
  }
);

export const updateProfileUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const updatedData = req.body;
    const id = req.params.id;
    const user = req.user;
    if (!user)
      throw new ApiError(httpStatus.UNAUTHORIZED, "You are not authorized");

    const result = await updateProfileInfo(id, user, updatedData);
    sendResponse<IUser>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "User updated successfully",
      data: result,
    });
  }
);

export const deleteUserById: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const user = req.user;
    if (!user)
      throw new ApiError(httpStatus.UNAUTHORIZED, "You are not authorized");
    const result = await deleteUser(id, user);

    sendResponse<IUser>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "User deleted successfully",
      data: result,
    });
  }
);
export const getAllUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, userFilterOptions);
    const paginationOptions = pick(req.query, paginationFields);
    const result = await findAllUser(filters, paginationOptions);
    sendResponse<IUser[]>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Users retrieved successfully",
      meta: result?.meta,
      data: result?.data,
    });
  }
);

export const bulkDeleteUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const ids = req.body.ids;
    const result = await multipleUserDelete(ids);

    sendResponse<IUser[]>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: `${result} User deleted successfully`,
      data: null,
    });
  }
);
