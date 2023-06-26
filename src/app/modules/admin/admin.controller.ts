import { Request, RequestHandler, Response } from "express";
import httpStatus from "http-status";
import config from "../../../config";
import catchAsync from "../../common/catchAsync";
import sendResponse from "../../common/response";
import {
  IAdmin,
  ILoginUserResponse,
  IRefreshTokenResponse,
} from "./admin.interface";
import { handleRefreshToken, logInUser, saveAdmin } from "./admin.service";
export const createAdmin: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const adminData = req.body;
    const result = await saveAdmin(adminData);

    sendResponse<IAdmin>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Admin created successfully",
      data: result,
    });
  }
);
export const logInAdmin: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const logInData = req.body;
    const result = await logInUser(logInData);
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
export const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;

  const result = await handleRefreshToken(refreshToken);

  // set refresh token into cookie

  const cookieOptions = {
    secure: config.env === "production",
    httpOnly: true,
  };

  res.cookie("refreshToken", refreshToken, cookieOptions);

  sendResponse<IRefreshTokenResponse>(res, {
    statusCode: 200,
    success: true,
    message: "User login successfully !",
    data: result,
  });
});
