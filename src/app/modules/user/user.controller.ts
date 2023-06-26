import { Request, RequestHandler, Response } from "express";
import httpStatus from "http-status";
import config from "../../../config";
import catchAsync from "../../common/catchAsync";
import sendResponse from "../../common/response";
import {
  ILoginUserResponse,
  IRefreshTokenResponse,
} from "../admin/admin.interface";
import { IUser } from "./user.interface";
import {
  UserLogIn,
  deleteUser,
  getAllUser,
  getSingleUser,
  handleRefreshToken,
  saveUser,
  updateUser,
} from "./user.service";

export const createUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const userData = req.body;
    const result = await saveUser(userData);

    sendResponse<IUser>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Users created successfully",
      data: result,
    });
  }
);
export const getUsers: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await getAllUser();

    sendResponse<IUser[]>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Users retrieved successfully",
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
    const { refreshToken, ...others } = result;

    const cookieOptions = {
      secure: config.env === "production",
      httpOnly: true,
    };

    res.cookie("refreshToken", refreshToken, cookieOptions);

    sendResponse<ILoginUserResponse>(res, {
      statusCode: 200,
      success: true,
      message: "User login successfully !",
      data: others,
    });
  }
);

export const getUserById: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await getSingleUser(id);

    sendResponse<IUser>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "User retrieved successfully",
      data: result,
    });
  }
);
export const deleteUserById: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await deleteUser(id);

    sendResponse<IUser>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "User deleted successfully",
      data: result,
    });
  }
);
export const updateUserById: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const updatedData = req.body;
    const result = await updateUser(id, updatedData);

    sendResponse<IUser>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "User updated successfully",
      data: result,
    });
  }
);
export const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;

  const result = await handleRefreshToken(refreshToken);

  const cookieOptions = {
    secure: config.env === "production",
    httpOnly: true,
  };

  res.cookie("refreshToken", refreshToken, cookieOptions);

  sendResponse<IRefreshTokenResponse>(res, {
    statusCode: 200,
    success: true,
    message: "New access token generated successfully !",
    data: result,
  });
});
