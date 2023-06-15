import { Request, RequestHandler, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../common/catchAsync";
import sendResponse from "../../common/response";
import { IUser } from "./user.interface";
import {
  deleteUser,
  getAllUser,
  getSingleUser,
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
    const result = await updateUser(id);

    sendResponse<IUser>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "User updated successfully",
      data: result,
    });
  }
);
